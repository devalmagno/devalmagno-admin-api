import { NextFunction, Request, Response } from 'express';

import { AboutService } from '../services/AboutService';

class AboutController {

    async create(req: Request, res: Response) {
        const {
            title,
            description,
            position
        } = req.body;

        const aboutService = new AboutService();

        try {
            const about = await aboutService.create({
                description,
                position,
                title
            });

            return res.status(201).json(about);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }

    async getAboutList(req: Request, res: Response) {
        const aboutService = new AboutService();

        try {
            const aboutList = await aboutService.getAboutList();

            return res.status(200).json(aboutList);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }

    async getAboutById(req: Request, res: Response) {
        const { id } = req.params;

        const aboutService = new AboutService();

        try {
            const about = await aboutService.getAboutById(id);

            return res.status(200).json(about);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }


    async update(req: Request, res: Response) {
        const {
            id,
            title,
            description,
            position
        } = req.body;

        const aboutService = new AboutService();

        try {
            const about = await aboutService.update({
                id, 
                description,
                position,
                title
            });

            return res.status(200).json(about);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }

    async remove(req: Request, res: Response) {
        const {
            id
        } = req.body;

        const aboutService = new AboutService();

        try {
            const about = await aboutService.remove(id);

            return res.status(200).json(about);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }

}

export { AboutController };