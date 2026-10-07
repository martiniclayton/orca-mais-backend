import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Prestador")
export class EntityPrestador {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "varchar"})
    nome!: string

    @Column({type: "varchar", unique: true})
    email!: string

    @Column({type: "varchar", unique: true})
    cpf!: string

    @Column({type: "varchar", unique: true})
    telefone!: string

    @Column({type: "varchar"})
    estabelecimento!: string

    @Column({type: "varchar", nullable: true})
    senha!: string
}