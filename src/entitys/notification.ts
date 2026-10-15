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

    @Column({type: "timestamptz"})
    data!: Date

    @Column({type: "int", nullable: true})
    ordemId!: number

    @Column({type: "varchar"})
    status!: string

    @ManyToOne(()=> Ordens, (ordem: any) => ordem.notificacao, { onDelete: "CASCADE"})
    @JoinColumn({name: "ordemId"})
    ordens!: any
}