import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    // Pega o token do cabeçalho da requisição
    const authtoken = request.headers.authorization;

    // Se não existir, retorna erro
    if(!authtoken){
        return response.status(401).end();
    }

    // Formata o token para pegar sem o Bearer 
    const [, token] = authtoken.split(" ");
    
    // Verifica se o token é válido e recebe o sub do token, sendo o user_id
    // Salva o user_id no request e continua
    // Se não for válido, retorna erro
    try{
        const { sub } = verify(token, "ed8f2630275c30181de417afbff348f9") as IPayload;

        request.user_id = sub;
        
        return next();
    } catch(err){
        return response.status(401).end();
    }
    


    return next();
}