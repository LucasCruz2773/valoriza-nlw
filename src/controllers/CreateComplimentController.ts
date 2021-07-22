import { Request, Response } from 'express';
import { CreateComplimentService } from '../services/CreateComplimentService';


class CreateComplimentController {
    async handle(request: Request, response: Response) {
        // Pega informações do body
        const { tag_id, user_receiver, message } = request.body;

        // Pega a informação desestruturada, ou seja, request.user_id
        const { user_id } = request;

        const createComplimentService = new CreateComplimentService();

        const compliment = await createComplimentService.execute({
            tag_id,
            user_sender: user_id,
            user_receiver,
            message
        })

        return response.json(compliment)
    }
}

export { CreateComplimentController }