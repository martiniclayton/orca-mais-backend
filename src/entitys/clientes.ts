import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EntityPrestador } from "./Prestador.js";

@Entity("Cliente")
@Index(['cpf', 'prestadorId'], {unique: true})
export class Cliente {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({type: "varchar"})
    nome!: string

    @Column({type: "varchar", select: false})
    cpf!: string

    @Column({type: "varchar", select: true})
    telefone!: string

    @Column({type: "varchar", select: false})
    codAcesso!: string

    @Column({type: "int"})
    prestadorId: number

    @ManyToOne(() => EntityPrestador)
    @JoinColumn({name: "prestadorId"})
    prestador!: EntityPrestador
}