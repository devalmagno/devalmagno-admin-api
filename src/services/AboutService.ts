import { getCustomRepository, Repository } from "typeorm";

import { About } from "../entities/About";
import { AboutRepository } from "../repositories/AboutRepository";

interface IAbout {
    id?: string;
    title: string;
    description: string;
    position: number;
}

class AboutService {

    private aboutRepository: Repository<About>;

    constructor() {
        this.aboutRepository = getCustomRepository(AboutRepository);
    }

    async create({ description, title, position }: IAbout) {
        const about = this.aboutRepository.create({
            description,
            title,
            position
        });

        await this.aboutRepository.save(about);

        return about;
    }

    async getAbout() {
        const about = await this.aboutRepository.find();

        if (!about) throw new Error("There is no about in The Database");

        return about;
    }

    async getAboutById(id: string) {
        const about = await this.aboutRepository.findOne(id);

        if (!about) throw new Error("About don't exists");

        return about;
    }

    async update({ id, description, position, title }: IAbout) { 
        const about = await this.aboutRepository.findOne(id);

        if (!about) throw new Error("About don't exists");

        this.aboutRepository.merge(about, {
            title: title ? title : about.title,
            description: description ? description : about.description,
            position: position ? position : about.position
        });

        const updatedAbout = await this.aboutRepository.save(about);

        return updatedAbout;
    }

    async remove(id: string) {
        const about = await this.aboutRepository.findOne(id);

        if (!about) throw new Error("About don't exists");

        await this.aboutRepository.remove(about);

        return about;
    }
}

export { AboutService };