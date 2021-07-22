// Importações dos tipos de colunas e entidades do DB
import { Entity, PrimaryColumn, Column, CreateDateColumn, JoinColumn, ManyToOne } from "typeorm";

// Importação do uuid
import { v4 as uuid } from "uuid";

// Importações das Entidades Tag e User
import { Tag } from "./Tag";
import { User } from "./User";

// Parâmetro em Entity se referencia ao nome da tabela compliments
@Entity("compliments")
class Compliment {
    // Identifica coluna primária
    @PrimaryColumn()
    readonly id: string;

    // Identifica coluna normal
    @Column()
    user_sender: string;

    @Column()
    user_receiver: string;

    // Faz um Join em User com nome de user_sender, relação muitos pra um
    @JoinColumn({name: "user_sender"})
    @ManyToOne(() => User)
    userSender: User;

    // Faz um Join em User com nome de user_receiver, relação muitos pra um
    @JoinColumn({name: "user_receiver"})
    @ManyToOne(() => User)
    userReceiver: User;

    @Column()
    tag_id: string;

    // Faz um Join em Tag com nome de tag_id, relação muitos pra um
    @JoinColumn({name: "tag_id"})
    @ManyToOne(() => Tag)
    tag: Tag

    @Column()
    message: string;

    // Identifica coluna de data
    @CreateDateColumn()
    created_at: Date;

    // Só utiliza um novo uuid se for para criação
    constructor() {
        if(!this.id){
            this.id = uuid();
        }
    }
 }

export { Compliment }