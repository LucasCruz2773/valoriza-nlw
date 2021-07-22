import { getCustomRepository } from "typeorm"

// compare para comparar dados criptografados
import { compare } from 'bcryptjs';

// sign para definir um JWT
import { sign } from 'jsonwebtoken';

import { UsersRepositories } from "../repositories/UsersRepositories"


interface IAuthenticateRequest {
    email: string,
    password: string,
}

class AuthenticateUserService {
    async execute({email, password}: IAuthenticateRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories);
        
        // Acha o usuário do e-mail recebido
        const user = await usersRepositories.findOne({
            email
        });

        // Se não achar, devolve erro
        if(!user){
            throw new Error("Email/Password incorrect")
        }

        // Compara password recebido e do usuário pesquisado
        const passwordMatch = await compare(password, user.password);

        // Caso a comparação dê errado, retorne erro
        if(!passwordMatch){
            throw new Error("Email/Password incorrect")
        }

        // Cria token JWT com e-mail do usuário e o subject sendo o seu id
        const token = sign(
        {
            email: user.email
        }, 
        "ed8f2630275c30181de417afbff348f9", 
        {
            subject: user.id,
            expiresIn: "1d"
        });
        return token;
    }
}

export { AuthenticateUserService }