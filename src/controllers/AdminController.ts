import { NextFunction, Request, Response } from 'express';

import { AdminService } from '../services/AdminService';

class AdminController {

    async create(req: Request, res: Response) {
        const {
            username,
            password
        } = req.body;

        const adminService = new AdminService();

        try {
            const admin = await adminService.create({
                password,
                username
            });

            return res.status(201).json(admin);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }

    async getAdmins(req: Request, res: Response) {
        const adminService = new AdminService();

        try {
            const admins = await adminService.getAdmins();

            return res.status(200).json(admins);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }

    async getAdminByUsername(req: Request, res: Response) {
        const { username } = req.body;

        const adminService = new AdminService();

        try {
            const admin = await adminService.getAdminByUsername(username);

            return res.status(200).json(admin);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }


    async updatePassword(req: Request, res: Response) {
        const { username, password, newPassword } = req.body;

        const adminService = new AdminService();

        try {
            const admin = await adminService.updatePassword(
                username,
                password,
                newPassword
            );

            return res.status(200).json(admin);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }

    async login(req: Request, res: Response) {
        const { username, password } = req.body;

        const adminService = new AdminService();

        try {
            const { acessToken, admin } = await adminService.login(
                username,
                password
            );

            return res.status(200).json({ acessToken, admin });
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }

    async authenticateToken(req: Request, res: Response, next: NextFunction) {
        const { token } = req.body;

        const adminService = new AdminService();

        if (token == null) return res.status(401).json({
            message: "Token is null"
        });

        try {
            const { admin } = await adminService.authenticate(token);

            return res.status(200).json({ admin });
        } catch(err) {
            res.status(401).json({ message: err.message });
        }
    }
}

export { AdminController };