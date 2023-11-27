import { inject } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Descricao } from "src/app/models/descricao.model";
import { DescricaoService } from "src/app/services/descricao.service";

export const descricaoResolver: ResolveFn<Descricao> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(DescricaoService).findById(route.paramMap.get('id')!);
  };
