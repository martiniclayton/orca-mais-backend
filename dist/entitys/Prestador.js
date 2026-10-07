var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
let EntityPrestador = class EntityPrestador {
    id;
    nome;
    email;
    cpf;
    telefone;
    estabelecimento;
    senha;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], EntityPrestador.prototype, "id", void 0);
__decorate([
    Column({ type: "varchar" }),
    __metadata("design:type", String)
], EntityPrestador.prototype, "nome", void 0);
__decorate([
    Column({ type: "varchar", unique: true }),
    __metadata("design:type", String)
], EntityPrestador.prototype, "email", void 0);
__decorate([
    Column({ type: "varchar", unique: true }),
    __metadata("design:type", String)
], EntityPrestador.prototype, "cpf", void 0);
__decorate([
    Column({ type: "varchar", unique: true }),
    __metadata("design:type", String)
], EntityPrestador.prototype, "telefone", void 0);
__decorate([
    Column({ type: "varchar" }),
    __metadata("design:type", String)
], EntityPrestador.prototype, "estabelecimento", void 0);
__decorate([
    Column({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], EntityPrestador.prototype, "senha", void 0);
EntityPrestador = __decorate([
    Entity("Prestador")
], EntityPrestador);
export { EntityPrestador };
//# sourceMappingURL=Prestador.js.map