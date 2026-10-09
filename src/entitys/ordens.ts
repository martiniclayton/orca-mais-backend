import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from "./clientes.js";
import { NotificacaoEntity } from "./notification.js";

@Entity("Ordens")
export class Ordens {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({type: "varchar"})
    clienteId!: number

    @ManyToOne(()=> Cliente, { eager: true})
    @JoinColumn({name: "clienteId"})
    cliente!: Cliente

    @OneToMany(()=> NotificacaoEntity, notificacao => notificacao.ordens)
    notificacao!: NotificacaoEntity[];

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