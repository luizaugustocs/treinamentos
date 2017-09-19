import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from "./authentication.service";
import {MessageService} from "primeng/components/common/messageservice";

@Injectable()
export class CerberusGuard implements CanActivate {


  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private messageService: MessageService) {

  }


  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.authenticationService.route = state.url;
    return this.authenticationService.user.first().toPromise().then((user) => {
      if (!user) {
        this.messageService.add({severity: 'error', summary: 'Não autorizado',
          detail: 'Você será redirecionado para o login pois não está logado.'})
        this.router.navigate(['/login']);
      }
      return !!user;
    })
  }
}
