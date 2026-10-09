import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ordens } from "./ordens.js";

@Entity("Notification")

export class NotificacaoEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({type: "varchar"})
    titulo!: string

    @Column({type: "varchar"})
    descricao!: string

    @Column({type: "date"})
    data!: Date

    @Column({type: "int", nullable: true})
    ordemId!: number

    @Column({type: "varchar"})
    status!: string

    @ManyToOne(()=> Ordens, ordem => ordem.notificacao, { onDelete: "CASCADE", eager: true})
    @JoinColumn({name: "ordemId"})
    ordens!: Ordens
}