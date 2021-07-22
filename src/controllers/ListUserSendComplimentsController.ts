import { Request, Response } from "express";
import { ListUserSendComplimentsService } from "../services/ListUserSendComplimentsService";


class ListUserSendComplimentsController {
    async handle(request: Request, response: Response) {
        // Pega a informação desestruturada, ou seja, request.user_id
        const { user_id } = request;

        const listUserSendComplimentsService = new ListUserSendComplimentsService();
        const compliments = await listUserSendComplimentsService.execute(user_id);

        return response.json(compliments)
    }
}

export { ListUserSendComplimentsController }