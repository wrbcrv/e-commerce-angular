import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Endereco } from "src/app/models/endereco.model";
import { UsuarioService } from "src/app/services/usuario.service";

export const enderecoResolver: ResolveFn<Endereco | null> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const usuarioId = route.paramMap.get('usuarioId');
  const enderecoId = route.paramMap.get('enderecoId');

  if (usuarioId && enderecoId) {
    return inject(UsuarioService).findEnderecoByUsuarioId(usuarioId, enderecoId);
  } else {
    console.error('Invalid parameters for endereco resolver');
    return null;
  }
};