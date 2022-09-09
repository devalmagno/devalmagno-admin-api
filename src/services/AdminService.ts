import { getCustomRepository, Repository } from "typeorm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { Admin } from "../entities/Admin";
import { AdminRepository } from "../repositories/AdminRepository";

interface IAdmin {
    username: string;
    password: string;
}

class AdminService {

    private adminRepository: Repository<Admin>;

    constructor() {
        this.adminRepository = getCustomRepository(AdminRepository);
    }

    async create({ username, password }: IAdmin) {
        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = this.adminRepository.create({
            username,
            password: hashedPassword
        });

        await this.adminRepository.save(admin);

        admin.password = '';
        return admin;
    }

    async getAdmins() {
        const admins = await this.adminRepository.find();

        if (!admins) throw new Error("There is no Admin in The Database");

        return admins;
    }

    async getAdminByUsername(username: string) {
        const admin = await this.adminRepository.findOne(username);

        if (!admin) throw new Error("Admin Profile don't exists");

        return admin;
    }

    async getAdminPassword(username: string) {
        const admin = await this.adminRepository.findOne({
            where: { username },
            select: ["password"]
        });

        if (!admin) throw new Error("Admin don't exists!");

        return admin;
    }

    async updatePassword(username: string, password: string, newPassword: string) {
        const adminPassword = await this.getAdminPassword(username);
        const validate = await bcrypt.compare(password, adminPassword.password);
        if (!validate) throw new Error("Passwords do not matched");

        const admin = await this.adminRepository.findOne({ username });
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        this.adminRepository.merge(admin, { password: hashedPassword });

        const updatedAdmin = await this.adminRepository.save(admin);
        updatedAdmin.password = "";

        return updatedAdmin;
    }

    async login(username: string, password: string) {
        const adminPassword = await this.getAdminPassword(username);
        const validate = await bcrypt.compare(password, adminPassword.password);
        if (!validate) throw new Error("Passwords do not matched");

        const admin = await this.adminRepository.findOne({ username });

        const acessToken = jwt.sign({admin}, "" + process.env.ACESS_TOKEN_SECRET, { expiresIn: '90m' });

        return { acessToken, admin }
    }

    async authenticate(token: string) {
        const admin: any = jwt.verify(token, "" + process.env.ACESS_TOKEN_SECRET, (err, admin) => {
            if (err) throw new Error(err.message);

            return admin;
        });

        return admin;
    }

    async authorization(token: string) {
        jwt.verify(token, "" + process.env.ACESS_TOKEN_SCRET, (err) => {
            if (err) throw new Error(err.message);

            return true;
        })
    }
}

export { AdminService };