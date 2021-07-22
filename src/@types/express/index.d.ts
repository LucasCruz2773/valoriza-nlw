// Insere o atributo user_id no tipo Request
declare namespace Express {
    export interface Request {
        user_id: string;
    }
}