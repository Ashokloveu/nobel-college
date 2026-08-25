import { Router } from 'express';
import { CmsController } from '../controllers/cms.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { requirePermission } from '../middlewares/rbac.middleware';
import { logAudit } from '../middlewares/auditLog.middleware';

const router = Router();

// Public Endpoints
router.get('/news', CmsController.listNews);
router.get('/news/:slug', CmsController.getNewsBySlug);
router.get('/notices', CmsController.listNotices);
router.get('/notices/:slug', CmsController.getNoticeBySlug);
router.get('/events', CmsController.listEvents);
router.get('/events/:slug', CmsController.getEventBySlug);
router.get('/gallery', CmsController.listGalleryAlbums);
router.get('/gallery/:slug', CmsController.getGalleryAlbumBySlug);
router.get('/downloads', CmsController.listDownloads);
router.post('/downloads/:id/count', CmsController.incrementDownloadCount);

// Admin CMS Protected Endpoints
router.post('/news', authenticate, requirePermission('news.create'), logAudit('CREATE_NEWS', 'CMS'), CmsController.createNews);
router.put('/news/:id', authenticate, requirePermission('news.update'), logAudit('UPDATE_NEWS', 'CMS'), CmsController.updateNews);
router.delete('/news/:id', authenticate, requirePermission('news.delete'), logAudit('DELETE_NEWS', 'CMS'), CmsController.deleteNews);

router.post('/notices', authenticate, requirePermission('notices.create'), logAudit('CREATE_NOTICE', 'CMS'), CmsController.createNotice);
router.put('/notices/:id', authenticate, requirePermission('notices.update'), logAudit('UPDATE_NOTICE', 'CMS'), CmsController.updateNotice);
router.delete('/notices/:id', authenticate, requirePermission('notices.delete'), logAudit('DELETE_NOTICE', 'CMS'), CmsController.deleteNotice);

router.post('/events', authenticate, requirePermission('events.create'), logAudit('CREATE_EVENT', 'CMS'), CmsController.createEvent);

router.post('/gallery', authenticate, requirePermission('gallery.create'), logAudit('CREATE_ALBUM', 'CMS'), CmsController.createGalleryAlbum);

router.post('/downloads', authenticate, requirePermission('downloads.create'), logAudit('CREATE_DOWNLOAD', 'CMS'), CmsController.createDownload);

export default router;
