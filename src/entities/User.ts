// Exclude do class-transformer para não exibir um campo ao fazer uma busca
import { Exclude } from "class-transformer";

// Importações dos tipos de colunas e entidades do DB
import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

// Importação do uuid
import { v4 as uuid } from "uuid"

// Parâmetro em Entity se referencia ao nome da tabela users
@Entity("users")
class User {
    // Identifica coluna primária
    @PrimaryColumn()
    readonly id: string;

    // Identifica coluna normal
    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    admin: boolean;

    // Exclude para identificar coluna que não será exibida ao usar classToPlain
    @Exclude()
    @Column()
    password: string;

    // Identifica coluna de Data
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    // Só utiliza um novo uuid se for para criação
    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}

export { User }
