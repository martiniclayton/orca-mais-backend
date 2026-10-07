import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Cliente")
export class Cliente {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({type: "varchar"})
    nome!: string

    @Column({type: "varchar", unique: true})
    cpf!: string

    @Column({type: "varchar"})
    telefone!: string

    @Column({type: "varchar"})
    codAcesso!: string
}