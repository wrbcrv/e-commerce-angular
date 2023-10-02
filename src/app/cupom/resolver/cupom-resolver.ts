import { inject } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Cupom } from "src/app/models/cupom.model";
import { CupomService } from "src/app/services/cupom.service";

export const cupomResolver: ResolveFn<Cupom> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(CupomService).findById(route.paramMap.get('id')!);
    };