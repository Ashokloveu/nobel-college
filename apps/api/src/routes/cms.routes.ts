import { Router } from 'express';
import { CmsController } from '../controllers/cms.controller';

const router = Router();

// Public & Admin CMS Endpoints
router.get('/news', CmsController.listNews);
router.get('/news/:slug', CmsController.getNewsBySlug);
router.post('/news', CmsController.createNews);
router.put('/news/:id', CmsController.updateNews);
router.delete('/news/:id', CmsController.deleteNews);

router.get('/notices', CmsController.listNotices);
router.get('/notices/:slug', CmsController.getNoticeBySlug);
router.post('/notices', CmsController.createNotice);
router.put('/notices/:id', CmsController.updateNotice);
router.delete('/notices/:id', CmsController.deleteNotice);

router.get('/events', CmsController.listEvents);
router.get('/events/:slug', CmsController.getEventBySlug);
router.post('/events', CmsController.createEvent);

router.get('/gallery', CmsController.listGalleryAlbums);
router.get('/gallery/:slug', CmsController.getGalleryAlbumBySlug);
router.post('/gallery', CmsController.createGalleryAlbum);

router.get('/downloads', CmsController.listDownloads);
router.post('/downloads', CmsController.createDownload);
router.post('/downloads/:id/count', CmsController.incrementDownloadCount);

export default router;
