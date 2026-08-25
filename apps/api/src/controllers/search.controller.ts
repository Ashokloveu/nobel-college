import { Request, Response, NextFunction } from 'express';
import { Program } from '../models/program.model';
import { Department } from '../models/department.model';
import { Faculty } from '../models/faculty.model';
import { News } from '../models/news.model';
import { Notice } from '../models/notice.model';
import { Event } from '../models/event.model';
import { Download } from '../models/download.model';

export class SearchController {
  static async search(req: Request, res: Response, next: NextFunction) {
    try {
      const queryStr = (req.query.q as string || '').trim();
      if (!queryStr || queryStr.length < 2) {
        return res.json({
          success: true,
          data: { query: queryStr, totalResults: 0, results: [] },
        });
      }

      const searchRegex = new RegExp(queryStr, 'i');

      const [programs, departments, faculty, news, notices, events, downloads] = await Promise.all([
        Program.find({ status: 'PUBLISHED', $or: [{ title: searchRegex }, { description: searchRegex }] }).select('title slug level description').limit(5),
        Department.find({ status: 'ACTIVE', $or: [{ name: searchRegex }, { description: searchRegex }] }).select('name slug code description').limit(5),
        Faculty.find({ status: 'ACTIVE', $or: [{ name: searchRegex }, { designation: searchRegex }, { qualification: searchRegex }] }).select('name slug designation qualification photoUrl').limit(5),
        News.find({ status: 'PUBLISHED', $or: [{ title: searchRegex }, { summary: searchRegex }, { content: searchRegex }] }).select('title slug summary publishedAt coverImageUrl').limit(5),
        Notice.find({ status: 'PUBLISHED', $or: [{ title: searchRegex }, { content: searchRegex }] }).select('title slug publishedAt isImportant').limit(5),
        Event.find({ status: 'PUBLISHED', $or: [{ title: searchRegex }, { description: searchRegex }] }).select('title slug startDate location').limit(5),
        Download.find({ status: 'PUBLISHED', $or: [{ title: searchRegex }, { category: searchRegex }] }).select('title slug category fileUrl fileType fileSize').limit(5),
      ]);

      const results = [
        ...programs.map((p) => ({ type: 'program', title: p.title, url: `/programs/${p.slug}`, description: p.description, meta: p.level })),
        ...departments.map((d) => ({ type: 'department', title: d.name, url: `/departments/${d.slug}`, description: d.description, meta: d.code })),
        ...faculty.map((f) => ({ type: 'faculty', title: f.name, url: `/faculty/${f.slug}`, description: f.designation, meta: f.qualification })),
        ...news.map((n) => ({ type: 'news', title: n.title, url: `/news/${n.slug}`, description: n.summary, meta: n.publishedAt })),
        ...notices.map((no) => ({ type: 'notice', title: no.title, url: `/notices/${no.slug}`, description: 'Official College Notice', meta: no.publishedAt })),
        ...events.map((e) => ({ type: 'event', title: e.title, url: `/events/${e.slug}`, description: e.location, meta: e.startDate })),
        ...downloads.map((dl) => ({ type: 'download', title: dl.title, url: dl.fileUrl, description: dl.category, meta: dl.fileSize })),
      ];

      res.json({
        success: true,
        data: {
          query: queryStr,
          totalResults: results.length,
          results,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}
