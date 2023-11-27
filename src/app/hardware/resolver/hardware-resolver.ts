import { inject } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Hardware } from "src/app/models/hardware.model";
import { HardwareService } from "src/app/services/hardware.service";

export const hardwareResolver: ResolveFn<Hardware> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(HardwareService).findById(route.paramMap.get('id')!);
  };
