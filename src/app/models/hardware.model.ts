import { Categoria } from "./categoria.model";
import { Fabricante } from "./fabricante.model";
import { Marca } from "./marca.model";
import { Status } from "./status.model";

export class Hardware {
    id!: number;
    marca!: Marca;
    nome!: string;
    preco!: number;
    estoque!: number;
    modelo!: string;
    fabricante!: Fabricante;
    lancamento!: Date;
    categoria!: Categoria;
    status!: Status;
    imageName!: string;
}