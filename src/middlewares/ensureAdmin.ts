import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UsersRepositories';


export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {

    // Pega a informação desestruturada, ou seja, request.user_id
    const { user_id } = request;

    const usersRepositories = getCustomRepository(UsersRepositories);

    // Recebe o campo admin do usuário encontrado
    const { admin } = await usersRepositories.findOne(user_id);
    
    // Se for admin, continua, senão retorna erro
    if(admin) {
        return next();
    }

    return response.status(401).json({
        error: "Unauthorized",
    });
}