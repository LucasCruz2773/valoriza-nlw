import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";


class ListUserSendComplimentsService {
    async execute(user_id) {
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);

        // Retorna compliments que user_sender = user_id e estabelece relações pelo nome das colunas definidas na entidade
        const compliments = await complimentsRepositories.find({
            where: {
                user_sender: user_id
            },
            relations: ["userSender", "userReceiver", "tag"]
        })

        return compliments;
    }
}

export { ListUserSendComplimentsService }