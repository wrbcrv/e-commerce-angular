import { Endereco } from "./endereco.model";
import { Hardware } from "./hardware.model";

export class Fornecedor {
    id!: number;
    nome!: string;
    enderecos: Endereco[] = []
    hardwares: Hardware[] = []
}

export { Endereco };
