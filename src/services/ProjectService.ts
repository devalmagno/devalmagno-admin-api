import { getCustomRepository, Repository } from "typeorm";

import { Project } from "../entities/Project";
import { ProjectRepository } from "../repositories/ProjectRepository";

interface IProject {
    id?: string;
    title: string;
    description: string;
    img_address?: string;
    url: string;
}

class ProjectService {

    private projectRepository: Repository<Project>;

    constructor() {
        this.projectRepository = getCustomRepository(ProjectRepository);
    }

    async create({
        description,
        img_address,
        title,
        url,
    }: IProject) {
        const project = this.projectRepository.create({
            description,
            title,
            img_address,
            url
        });

        await this.projectRepository.save(project);

        return project;
    }

    async getProjects() {
        const project = await this.projectRepository.find();

        if (!project) throw new Error("There is no project in The Database");

        return project;
    }

    async getProjectById(id: string) {
        const project = await this.projectRepository.findOne(id);

        if (!project) throw new Error("project don't exists");

        return project;
    }

    async update({ id, description, url, title }: IProject) { 
        const project = await this.projectRepository.findOne(id);

        if (!project) throw new Error("Project don't exists");

        this.projectRepository.merge(project, {
            title: title ? title : project.title,
            description: description ? description : project.description,
            url: url ? url : project.url
        });

        const updatedproject = await this.projectRepository.save(project);

        return updatedproject;
    }

    async remove(id: string) {
        const project = await this.projectRepository.findOne(id);

        if (!project) throw new Error("Project don't exists");

        await this.projectRepository.remove(project);

        return project;
    }
}

export { ProjectService };