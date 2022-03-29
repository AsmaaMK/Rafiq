import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { TokenStorageService } from "src/app/shared/services/token-storage.service";
import { UserInfo } from "../modules/profile/models/user-info";
import { UserInfoService } from "../modules/profile/services/user-info.service";

@Injectable({ providedIn: 'root' })
export class UserInfoResolver implements Resolve<UserInfo> {
  constructor(
    private userInfoService: UserInfoService,
    private tokenStorageService: TokenStorageService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<UserInfo> {
    const urlUserName = route.params['username'];
    return this.userInfoService.getUserInfo(urlUserName);
    // return this.userInfoService.getUserInfo(urlUserName);
  }
}
