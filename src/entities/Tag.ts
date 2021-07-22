// Importações dos tipos de colunas e entidades do DB
import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

// Importação do uuid
import { v4 as uuid } from "uuid"

// Expose para "criar uma nova coluna" na exibição dos dados ao usar classToPlain
import { Expose } from "class-transformer";

// Parâmetro em Entity se referencia ao nome da tabela tags
@Entity("tags")
class Tag {
    // Identifica coluna primária
    @PrimaryColumn()
    readonly id: string;

    // Identifica coluna normal
    @Column()
    name: string;


    // Identifica coluna de data
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    // Expose define um novo atributo do dado, necessita de uma função que retorne o atributo
    @Expose({name: "name_custom"})
    nameCustom(): string {
        return `#${this.name}`;
    }

    // Só utiliza um novo uuid se for para criação
    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}

export { Tag }