var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from "./clientes.js";
let Ordens = class Ordens {
    id;
    clienteId;
    cliente;
    placa;
    dataCriacao;
    tipoServico;
    status;
    descricao;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Ordens.prototype, "id", void 0);
__decorate([
    Column({ type: "varchar" }),
    __metadata("design:type", Number)
], Ordens.prototype, "clienteId", void 0);
__decorate([
    ManyToOne(() => Cliente, { eager: true }),
    JoinColumn({ name: "clienteId" }),
    __metadata("design:type", Cliente)
], Ordens.prototype, "cliente", void 0);
__decorate([
    Column({ type: "varchar" }),
    __metadata("design:type", String)
], Ordens.prototype, "placa", void 0);
__decorate([
    Column({ type: "date" }),
    __metadata("design:type", Date)
], Ordens.prototype, "dataCriacao", void 0);
__decorate([
    Column({ type: "varchar" }),
    __metadata("design:type", String)
], Ordens.prototype, "tipoServico", void 0);
__decorate([
    Column({ type: "varchar" }),
    __metadata("design:type", String)
], Ordens.prototype, "status", void 0);
__decorate([
    Column({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Ordens.prototype, "descricao", void 0);
Ordens = __decorate([
    Entity("Ordens")
], Ordens);
export { Ordens };
//# sourceMappingURL=ordens.js.map