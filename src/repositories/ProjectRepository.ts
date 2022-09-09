import { EntityRepository, Repository } from "typeorm";

import { Project } from "../entities/Project";

@EntityRepository(Project)
class ProjectRepository extends Repository<Project> {

}

export { ProjectRepository };