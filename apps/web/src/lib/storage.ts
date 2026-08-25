export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://nobel-college.onrender.com';

export function getApiUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${cleanPath}`;
}

export async function apiFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const headers = new Headers(init.headers);
  if (!headers.has('Content-Type') && init.body) headers.set('Content-Type', 'application/json');
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken');
    if (token) headers.set('Authorization', `Bearer ${token}`);
  }
  return fetch(getApiUrl(path), { ...init, headers, credentials: 'include' });
}

export async function readApiJson<T>(response: Response): Promise<T> {
  const json = await response.json().catch(() => ({}));
  if (!response.ok || json.success === false) {
    throw new Error(json.error?.message || json.message || `Request failed (${response.status})`);
  }
  return json as T;
}

export function getStoredItems<T>(key: string, defaultItems: T[] = []): T[] {
  if (typeof window === 'undefined') return defaultItems;
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return defaultItems;
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return defaultItems;
    
    // Merge custom saved items with default items if default items exist
    const savedIds = new Set(parsed.map((item: any) => item.id || item.title || item.name));
    const uniqueDefaults = defaultItems.filter(
      (defItem: any) => !savedIds.has(defItem.id || defItem.title || defItem.name)
    );
    return [...parsed, ...uniqueDefaults];
  } catch (err) {
    console.error(`Error reading ${key} from storage:`, err);
    return defaultItems;
  }
}

export function saveStoredItems<T>(key: string, items: T[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('nobel_storage_change', { detail: { key, items } }));
    window.dispatchEvent(new Event('storage'));
  } catch (err) {
    console.error(`Error saving ${key} to storage:`, err);
  }
}

export function addItem<T>(key: string, newItem: T, defaultItems: T[] = []): T[] {
  const existing = getStoredItems<T>(key, defaultItems);
  const updated = [newItem, ...existing];
  saveStoredItems(key, updated);
  return updated;
}

export function updateItem<T extends { id: string }>(
  key: string,
  id: string,
  updatedFields: Partial<T>,
  defaultItems: T[] = []
): T[] {
  const existing = getStoredItems<T>(key, defaultItems);
  const updated = existing.map((item) => (item.id === id ? { ...item, ...updatedFields } : item));
  saveStoredItems(key, updated);
  return updated;
}

export function deleteItem<T extends { id: string }>(
  key: string,
  id: string,
  defaultItems: T[] = []
): T[] {
  const existing = getStoredItems<T>(key, defaultItems);
  const updated = existing.filter((item) => item.id !== id);
  saveStoredItems(key, updated);
  return updated;
}
