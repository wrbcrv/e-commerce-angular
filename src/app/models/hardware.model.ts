import { Marca } from "./marca.model";

export class Hardware {
    id         !: number;
    marca      !: Marca;
    nome       !: string;
    preco      !: number;
    estoque    !: number;
    modelo     !: string;
    lancamento !: Date;
}