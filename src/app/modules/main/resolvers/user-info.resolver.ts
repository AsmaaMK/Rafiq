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
  ): Observable<UserInfo> | Promise<UserInfo> | UserInfo {
    const urlUserName = route.params['username'];
    const myUserName = this.tokenStorageService.getUsername();

    console.warn('RESOLVER CALLED: ');
    console.warn('is my profile??', urlUserName === myUserName);
    

    // if (urlUserName === myUserName && this.userInfoService.myProfileInfo) {
    //   return this.userInfoService.myProfileInfo;
    // } 

    return this.userInfoService.getUserInfo(urlUserName);
  }
}
