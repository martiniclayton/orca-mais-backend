import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from "./clientes.js";

@Entity("Ordens")
export class Ordens {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({type: "varchar"})
    clienteId!: number

    @ManyToOne(()=> Cliente, { eager: true})
    @JoinColumn({name: "clienteId"})
    cliente!: Cliente

    @Column({type: "varchar"})
    placa!: string

    @Column({type: "date"})
    dataCriacao!: Date

    @Column({type: "varchar"})
    tipoServico!: string

    @Column({type: "varchar"})
    status!: string

    @Column({type: "varchar", nullable: true})
    descricao?: string

}