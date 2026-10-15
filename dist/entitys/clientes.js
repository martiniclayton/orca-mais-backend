var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EntityPrestador } from "./Prestador.js";
let Cliente = class Cliente {
    id;
    nome;
    cpf;
    telefone;
    codAcesso;
    prestadorId;
    prestador;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Cliente.prototype, "id", void 0);
__decorate([
    Column({ type: "varchar" }),
    __metadata("design:type", String)
], Cliente.prototype, "nome", void 0);
__decorate([
    Column({ type: "varchar", select: false }),
    __metadata("design:type", String)
], Cliente.prototype, "cpf", void 0);
__decorate([
    Column({ type: "varchar", select: true }),
    __metadata("design:type", String)
], Cliente.prototype, "telefone", void 0);
__decorate([
    Column({ type: "varchar", select: false }),
    __metadata("design:type", String)
], Cliente.prototype, "codAcesso", void 0);
__decorate([
    Column({ type: "int" }),
    __metadata("design:type", Number)
], Cliente.prototype, "prestadorId", void 0);
__decorate([
    ManyToOne(() => EntityPrestador),
    JoinColumn({ name: "prestadorId" }),
    __metadata("design:type", EntityPrestador)
], Cliente.prototype, "prestador", void 0);
Cliente = __decorate([
    Entity("Cliente"),
    Index(['cpf', 'prestadorId'], { unique: true })
], Cliente);
export { Cliente };
//# sourceMappingURL=clientes.js.map