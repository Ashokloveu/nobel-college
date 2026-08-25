import { Router } from 'express';
import { CmsController } from '../controllers/cms.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// Public & Admin CMS Endpoints
router.get('/news', CmsController.listNews);
router.get('/news/:slug', CmsController.getNewsBySlug);
router.post('/news', authenticate, CmsController.createNews);
router.put('/news/:id', authenticate, CmsController.updateNews);
router.delete('/news/:id', authenticate, CmsController.deleteNews);

router.get('/notices', CmsController.listNotices);
router.get('/notices/:slug', CmsController.getNoticeBySlug);
router.post('/notices', authenticate, CmsController.createNotice);
router.put('/notices/:id', authenticate, CmsController.updateNotice);
router.delete('/notices/:id', authenticate, CmsController.deleteNotice);

router.get('/events', CmsController.listEvents);
router.get('/events/:slug', CmsController.getEventBySlug);
router.post('/events', authenticate, CmsController.createEvent);
router.put('/events/:id', authenticate, CmsController.updateEvent);
router.delete('/events/:id', authenticate, CmsController.deleteEvent);

router.get('/gallery', CmsController.listGalleryAlbums);
router.get('/gallery/:slug', CmsController.getGalleryAlbumBySlug);
router.post('/gallery', CmsController.createGalleryAlbum);

router.get('/downloads', CmsController.listDownloads);
router.post('/downloads', CmsController.createDownload);
router.post('/downloads/:id/count', CmsController.incrementDownloadCount);

export default router;
