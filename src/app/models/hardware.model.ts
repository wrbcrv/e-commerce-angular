import { Categoria } from "./categoria.model";
import { Fabricante } from "./fabricante.model";
import { Integridade } from "./integridade.model";
import { Marca } from "./marca.model";

export class Hardware {
    id!: number;
    marca!: Marca;
    nome!: string;
    preco!: number;
    estoque!: number;
    modelo!: string;
    fabricante!: Fabricante;
    lancamento!: Date;
    integridade!: Integridade;
    categoria!: Categoria;
}