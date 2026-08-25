import { Request, Response, NextFunction } from 'express';
import { Department } from '../models/department.model';
import { Program } from '../models/program.model';
import { Faculty } from '../models/faculty.model';
import { departmentSchema, programSchema, facultySchema } from '@nobel/validation';
import { NotFoundError, ConflictError } from '../utils/errors';

export class AcademicController {
  // --- Departments ---
  static async listDepartments(_req: Request, res: Response, next: NextFunction) {
    try {
      const departments = await Department.find({ status: 'ACTIVE' }).sort({ name: 1 });
      res.json({ success: true, data: departments });
    } catch (err) {
      next(err);
    }
  }

  static async getDepartmentBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const dept = await Department.findOne({ slug: req.params.slug });
      if (!dept) throw new NotFoundError('Department not found');
      
      const programs = await Program.find({ departmentId: dept._id, status: 'PUBLISHED' });
      const faculty = await Faculty.find({ departmentId: dept._id, status: 'ACTIVE' }).sort({ order: 1 });

      res.json({
        success: true,
        data: { department: dept, programs, faculty },
      });
    } catch (err) {
      next(err);
    }
  }

  static async createDepartment(req: Request, res: Response, next: NextFunction) {
    try {
      const data = departmentSchema.parse(req.body);
      const existing = await Department.findOne({ slug: data.slug });
      if (existing) throw new ConflictError('Department slug already exists');

      const department = await Department.create(data);
      res.status(201).json({ success: true, message: 'Department created', data: department });
    } catch (err) {
      next(err);
    }
  }

  static async updateDepartment(req: Request, res: Response, next: NextFunction) {
    try {
      const data = departmentSchema.partial().parse(req.body);
      const department = await Department.findByIdAndUpdate(req.params.id, data, { new: true });
      if (!department) throw new NotFoundError('Department not found');
      res.json({ success: true, message: 'Department updated', data: department });
    } catch (err) {
      next(err);
    }
  }

  static async deleteDepartment(req: Request, res: Response, next: NextFunction) {
    try {
      const dept = await Department.findByIdAndDelete(req.params.id);
      if (!dept) throw new NotFoundError('Department not found');
      res.json({ success: true, message: 'Department deleted' });
    } catch (err) {
      next(err);
    }
  }

  // --- Programs ---
  static async listPrograms(req: Request, res: Response, next: NextFunction) {
    try {
      const filter: any = {};
      if (req.query.level) filter.level = req.query.level;
      if (req.query.departmentId) filter.departmentId = req.query.departmentId;
      if (req.query.featured === 'true') filter.featured = true;

      const programs = await Program.find(filter)
        .populate('departmentId', 'name slug code')
        .sort({ createdAt: -1 });

      res.json({ success: true, data: programs });
    } catch (err) {
      next(err);
    }
  }

  static async getProgramBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const program = await Program.findOne({ slug: req.params.slug }).populate('departmentId');
      if (!program) throw new NotFoundError('Program not found');
      res.json({ success: true, data: program });
    } catch (err) {
      next(err);
    }
  }

  static async createProgram(req: Request, res: Response, next: NextFunction) {
    try {
      const data = programSchema.parse(req.body);
      const existing = await Program.findOne({ slug: data.slug });
      if (existing) throw new ConflictError('Program slug already exists');

      const program = await Program.create(data);
      res.status(201).json({ success: true, message: 'Program created', data: program });
    } catch (err) {
      next(err);
    }
  }

  static async updateProgram(req: Request, res: Response, next: NextFunction) {
    try {
      const data = programSchema.partial().parse(req.body);
      const program = await Program.findByIdAndUpdate(req.params.id, data, { new: true });
      if (!program) throw new NotFoundError('Program not found');
      res.json({ success: true, message: 'Program updated', data: program });
    } catch (err) {
      next(err);
    }
  }

  static async deleteProgram(req: Request, res: Response, next: NextFunction) {
    try {
      const prog = await Program.findByIdAndDelete(req.params.id);
      if (!prog) throw new NotFoundError('Program not found');
      res.json({ success: true, message: 'Program deleted' });
    } catch (err) {
      next(err);
    }
  }

  // --- Faculty ---
  static async listFaculty(req: Request, res: Response, next: NextFunction) {
    try {
      const filter: any = {};
      if (req.query.departmentId) filter.departmentId = req.query.departmentId;

      const faculty = await Faculty.find(filter)
        .populate('departmentId', 'name slug code')
        .sort({ order: 1, name: 1 });

      res.json({ success: true, data: faculty });
    } catch (err) {
      next(err);
    }
  }

  static async getFacultyBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const member = await Faculty.findOne({ slug: req.params.slug }).populate('departmentId');
      if (!member) throw new NotFoundError('Faculty member not found');
      res.json({ success: true, data: member });
    } catch (err) {
      next(err);
    }
  }

  static async createFaculty(req: Request, res: Response, next: NextFunction) {
    try {
      const data = facultySchema.parse(req.body);
      const existing = await Faculty.findOne({ slug: data.slug });
      if (existing) throw new ConflictError('Faculty slug already exists');

      const member = await Faculty.create(data);
      res.status(201).json({ success: true, message: 'Faculty created', data: member });
    } catch (err) {
      next(err);
    }
  }

  static async updateFaculty(req: Request, res: Response, next: NextFunction) {
    try {
      const data = facultySchema.partial().parse(req.body);
      const member = await Faculty.findByIdAndUpdate(req.params.id, data, { new: true });
      if (!member) throw new NotFoundError('Faculty member not found');
      res.json({ success: true, message: 'Faculty updated', data: member });
    } catch (err) {
      next(err);
    }
  }

  static async deleteFaculty(req: Request, res: Response, next: NextFunction) {
    try {
      const member = await Faculty.findByIdAndDelete(req.params.id);
      if (!member) throw new NotFoundError('Faculty member not found');
      res.json({ success: true, message: 'Faculty deleted' });
    } catch (err) {
      next(err);
    }
  }
}
