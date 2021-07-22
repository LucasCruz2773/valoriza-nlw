// Usado com typeorm
import 'reflect-metadata';

// Importações padrões do Express
import express, { Request, Response, NextFunction } from 'express';

// Importações para erros padrões do Express
import "express-async-errors";

// Importação das rotas
import { router } from './routes';

// Importação do DB
import "./database"

// Instanciação do express
const app = express();

// Middleware para usar JSON
app.use(express.json());

// Middleware para utilizar das rotas
app.use(router);

// Middleware para o retorno dos erros
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    // Se erro retornado for do tipo Error, retorna status 400 e mensagem
    if(err instanceof Error){
        return response.status(400).json({
            error: err.message
        });
    }

    // Senão retorna erro 500
    return response.status(500).json({
        status: "error",
        message: "Internal Server Error",
    })
})

app.listen(3000, () => console.log("Server is running"));