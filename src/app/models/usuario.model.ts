import { Cartao } from "./cartao.model";
import { Endereco } from "./fornecedor.model";
import { Perfil } from "./perfil.modal";
import { Telefone } from "./telefone.model";

export class Usuario {
  id!: number;
  nome!: string;
  sobrenome!: string;
  cpf!: string;
  rg!: string;
  login!: string;
  senha!: string;
  enderecos: Endereco[] = [];
  cartoes: Cartao[] = [];
  perfil!: Perfil;
  imageName!: string;
}

export { Telefone }
export { Endereco }