import { application, Router } from 'express';
import { AdminController } from './controllers/AdminController';

const router = Router();

// Controllers
const adminController = new AdminController();

// Admin Router
router.post('/admin', adminController.create);
router.get('/admin', adminController.getAdmins);
router.get('/admin/:username', adminController.getAdminByUsername);
router.put('/admin/password', adminController.updatePassword);
router.post('/admin/login', adminController.login);

export { router };