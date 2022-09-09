import { Router } from 'express';

import { AboutController } from './controllers/AboutController';
import { AdminController } from './controllers/AdminController';

const router = Router();

// Controllers
const adminController = new AdminController();
const aboutController = new AboutController();

// Admin Router
router.post('/admin', adminController.create);
router.get('/admin', adminController.getAdmins);
router.get('/admin/:username', adminController.getAdminByUsername);
router.put('/admin/password', adminController.updatePassword);
router.post('/admin/login', adminController.login);

// About Router
router.post('/about', aboutController.create);
router.get('/about', aboutController.getAboutList);
router.get('/about/:id', aboutController.getAboutById);
router.put('/about', aboutController.update);
router.delete('/about/:id', aboutController.remove);

export { router };