import { getCustomRepository } from "typeorm"
import { TagsRepositories } from "../repositories/TagsRepositories"
import { classToPlain } from 'class-transformer'

class ListTagsService {
    async execute(){
        const tagsRepositories = getCustomRepository(TagsRepositories);
        
        const tags = tagsRepositories.find();

        // classToPlain() para usar definições do class-transformer na entidade
        return classToPlain(tags);
    }
}

export { ListTagsService }