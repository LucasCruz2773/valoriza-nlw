import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IComplimentRequest {
    tag_id: string,
    user_sender: string,
    user_receiver: string,
    message: string
}

class CreateComplimentService {

    async execute({tag_id, user_sender, user_receiver, message}: IComplimentRequest){
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
        const usersRepositories = getCustomRepository(UsersRepositories);

        // Se usuário que envia é igual ao que recebe, retorna erro
        if(user_sender == user_receiver){
            throw new Error("Incorrect User Receiver");
        }

        // findOne() pega como padrão o id se não mencionar qual vai ser a condição
        const userReceiverExists = await usersRepositories.findOne(user_receiver);

        // Caso não ache o usuário que receberia, retorne erro
        if(!userReceiverExists) {
            throw new Error("User Receiver does not exists!");
        }

        const compliment = complimentsRepositories.create({
            tag_id,
            user_sender,
            user_receiver,
            message
        });

        await complimentsRepositories.save(compliment);

        return compliment;
    }
}

export { CreateComplimentService }