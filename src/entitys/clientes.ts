import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Cliente")
export class Cliente {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({type: "varchar"})
    nome!: string

    @Column({type: "varchar", unique: true, select: false})
    cpf!: string

    @Column({type: "varchar", select: true})
    telefone!: string

    @Column({type: "varchar", select: false})
    codAcesso!: string
}