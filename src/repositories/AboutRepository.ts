import { EntityRepository, Repository } from "typeorm";

import { About } from "../entities/About";

@EntityRepository(About)
class AboutRepository extends Repository<About> {

}

export { AboutRepository };