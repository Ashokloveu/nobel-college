import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import winston from 'winston';
import { connectDB } from '../config/db';
import { User } from '../models/user.model';
import { Role } from '../models/role.model';
import { Department } from '../models/department.model';
import { Program } from '../models/program.model';
import { Faculty } from '../models/faculty.model';
import { Settings } from '../models/settings.model';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

async function seedDatabase() {
  try {
    await connectDB();
    logger.info('Connected to Database. Starting Seeding...');

    // 1. Seed Roles
    logger.info('Seeding System Roles...');
    const superAdminRole = await Role.findOneAndUpdate(
      { name: 'SUPER_ADMIN' },
      {
        name: 'SUPER_ADMIN',
        description: 'Full institutional platform access with global administrative permissions.',
        isSystem: true,
        permissions: ['*'],
      },
      { upsert: true, new: true }
    );

    const admissionOfficerRole = await Role.findOneAndUpdate(
      { name: 'ADMISSION_OFFICER' },
      {
        name: 'ADMISSION_OFFICER',
        description: 'Manage admission inquiries, candidate communications, and pipeline status.',
        isSystem: true,
        permissions: ['admissions.read', 'admissions.write', 'admissions.assign'],
      },
      { upsert: true, new: true }
    );

    // 2. Seed Super Admin User
    logger.info('Seeding Super Admin User...');
    const adminPasswordHash = await bcrypt.hash('Admin@Nobel2026!', 12);
    await User.findOneAndUpdate(
      { email: 'admin@nobelcollege.edu.np' },
      {
        name: 'College Administrator',
        email: 'admin@nobelcollege.edu.np',
        passwordHash: adminPasswordHash,
        roles: [superAdminRole._id],
        status: 'ACTIVE',
        twoFactorEnabled: false,
      },
      { upsert: true, new: true }
    );

    // 3. Seed Departments
    logger.info('Seeding Departments...');
    const deptScience = await Department.findOneAndUpdate(
      { code: 'DST' },
      {
        name: 'Department of Science & Technology',
        code: 'DST',
        slug: 'department-of-science-and-technology',
        description: 'Overseeing +2 Science, Computer Applications (BCA), and IT research labs.',
        headOfDepartment: 'Prof. Dr. Ram Shrestha',
        email: 'science@nobelcollege.edu.np',
        phone: '+977-44-500100',
        order: 1,
        status: 'ACTIVE',
      },
      { upsert: true, new: true }
    );

    const deptMgmt = await Department.findOneAndUpdate(
      { code: 'DMS' },
      {
        name: 'Department of Management Studies',
        code: 'DMS',
        slug: 'department-of-management-studies',
        description: 'Directing +2 Management, Bachelor of Business Studies (BBS), and entrepreneurship workshops.',
        headOfDepartment: 'Dr. Anita Sharma',
        email: 'mgmt@nobelcollege.edu.np',
        phone: '+977-44-500101',
        order: 2,
        status: 'ACTIVE',
      },
      { upsert: true, new: true }
    );

    // 4. Seed Programs
    logger.info('Seeding Academic Programs...');
    await Program.findOneAndUpdate(
      { slug: 'bachelor-in-computer-application-bca' },
      {
        title: 'Bachelor in Computer Application (BCA)',
        slug: 'bachelor-in-computer-application-bca',
        level: 'BACHELOR',
        departmentId: deptScience._id,
        duration: '4 Years (8 Semesters)',
        description: 'Comprehensive 4-year computer application degree affiliated with university standards, covering software engineering, web technologies, and database management.',
        curriculum: 'Semester 1: Computer Fundamentals, C Programming, Digital Logic; Semester 2: OOP in C++, Discrete Structure, Data Structure & Algorithms...',
        careerOpportunities: 'Software Engineer, Web Developer, System Analyst, Database Administrator, IT Manager',
        feeStructure: 'NPR 350,000 Total',
        featured: true,
        status: 'PUBLISHED',
      },
      { upsert: true }
    );

    await Program.findOneAndUpdate(
      { slug: 'bachelor-of-business-studies-bbs' },
      {
        title: 'Bachelor of Business Studies (BBS)',
        slug: 'bachelor-of-business-studies-bbs',
        level: 'BACHELOR',
        departmentId: deptMgmt._id,
        duration: '4 Years',
        description: 'Practical business management degree emphasizing accounting, marketing, organizational management, and financial planning.',
        curriculum: 'Year 1: Business English, Microeconomics; Year 2: Macroeconomics, Cost Accounting...',
        careerOpportunities: 'Banker, Marketing Executive, Accountant, Administrative Manager',
        feeStructure: 'NPR 180,000 Total',
        featured: true,
        status: 'PUBLISHED',
      },
      { upsert: true }
    );

    await Program.findOneAndUpdate(
      { slug: 'plus-two-science' },
      {
        title: '+2 Science Program',
        slug: 'plus-two-science',
        level: 'DIPLOMA',
        departmentId: deptScience._id,
        duration: '2 Years',
        description: 'Higher Secondary Science stream preparing students for engineering, medicine, IT, and biotechnology careers.',
        curriculum: 'Grade 11 & 12: Physics, Chemistry, Mathematics/Biology, English, Computer Science',
        careerOpportunities: 'Foundation for MBBS, BE, BSc CSIT, BCA, Engineering studies',
        feeStructure: 'NPR 120,000 Total',
        featured: true,
        status: 'PUBLISHED',
      },
      { upsert: true }
    );

    await Program.findOneAndUpdate(
      { slug: 'plus-two-management' },
      {
        title: '+2 Management Program',
        slug: 'plus-two-management',
        level: 'DIPLOMA',
        departmentId: deptMgmt._id,
        duration: '2 Years',
        description: 'Higher Secondary Management stream laying the groundwork for business studies, hotel management, and law.',
        curriculum: 'Grade 11 & 12: Accountancy, Economics, Business Studies, Computer Science/Hotel Mgmt',
        careerOpportunities: 'Foundation for BBA, BBS, BHM, BTTM, CA studies',
        feeStructure: 'NPR 95,000 Total',
        featured: true,
        status: 'PUBLISHED',
      },
      { upsert: true }
    );

    // 5. Seed Faculty
    logger.info('Seeding Sample Faculty...');
    await Faculty.findOneAndUpdate(
      { slug: 'prof-dr-ram-shrestha' },
      {
        name: 'Prof. Dr. Ram Shrestha',
        slug: 'prof-dr-ram-shrestha',
        designation: 'Principal / Campus Chief',
        departmentId: deptScience._id,
        email: 'principal@nobelcollege.edu.np',
        phone: '+977-9851000001',
        qualification: 'Ph.D. in Computer Science & Applied Physics',
        biography: 'Over 20 years of academic leadership and educational management experience in Madhesh Province.',
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        order: 1,
        status: 'ACTIVE',
      },
      { upsert: true }
    );

    // 6. Seed Site Settings
    logger.info('Seeding Default Site Settings...');
    const defaultSettings = [
      { key: 'institutionName', value: 'NOBEL MULTIPLE COLLEGE', group: 'general' },
      { key: 'tagline', value: 'Excellence in Education & Character Building', group: 'general' },
      { key: 'address', value: 'Bardibas, Mahottari, Madhesh Province, Nepal', group: 'contact' },
      { key: 'phone', value: '+977-44-500100 / +977-9800000000', group: 'contact' },
      { key: 'email', value: 'info@nobelcollege.edu.np', group: 'contact' },
      { key: 'website', value: 'https://nobelcollege.edu.np', group: 'contact' },
      { key: 'principalName', value: 'Prof. Dr. Ram Shrestha', group: 'leadership' },
      { key: 'principalMessage', value: 'Welcome to Nobel Multiple College. We are committed to fostering academic brilliance, modern technological literacy, and ethical leadership for the youth of Bardibas and Madhesh Province.', group: 'leadership' },
      { key: 'footerText', value: '© 2026 Nobel Multiple College, Bardibas. All rights reserved. Developed by Ashok Singh.', group: 'general' },
      { key: 'defaultSeoTitle', value: 'Nobel Multiple College | Bardibas, Mahottari, Nepal', group: 'seo' },
      { key: 'defaultSeoDescription', value: 'Nobel Multiple College is a premier higher secondary and undergraduate educational institution in Bardibas, Mahottari, Madhesh Province, Nepal.', group: 'seo' },
    ];

    for (const setting of defaultSettings) {
      await Settings.findOneAndUpdate({ key: setting.key }, setting, { upsert: true });
    }

    logger.info('Database Seeding Completed Successfully.');
    process.exit(0);
  } catch (error) {
    logger.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
