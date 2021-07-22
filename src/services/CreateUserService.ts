import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

// Algoritmo usado para criptografar
import { hash } from 'bcryptjs';

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

class CreateUserService {
    async execute({ name, email, admin = false, password }: IUserRequest) {
        const usersRepository = getCustomRepository(UsersRepositories);

        // Se não receber email, retorna erro
        if(!email){
            throw new Error("Email incorrect");
        }

        const userAlreadyExists = await usersRepository.findOne({
            email
        });

        // Se usuário já existir, retorna erro
        if(userAlreadyExists){
            throw new Error("User already exists");
        }

        // Criptografa a senha do usuário
        const passwordHash = await hash(password, 8)

        const user = usersRepository.create({
            name,
            email,
            admin,
            password: passwordHash
        });

        await usersRepository.save(user);

        return user;
    }
}

export { CreateUserService }