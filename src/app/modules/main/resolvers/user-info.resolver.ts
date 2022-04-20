import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { TokenStorageService } from "src/app/shared/services/token-storage.service";
import { UserProfile } from "../modules/profile/models/user-info";
import { UserInfoService } from "../modules/profile/services/user-info.service";

@Injectable({ providedIn: 'root' })
export class UserInfoResolver implements Resolve<UserProfile> {
  constructor(
    private userInfoService: UserInfoService,
    private tokenStorageService: TokenStorageService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<UserProfile> | UserProfile {
    const urlUserName = route.params['username'];
    const myUserName = this.tokenStorageService.getUsername();

    if (urlUserName === myUserName && this.userInfoService.myInfo !== this.userInfoService.initialUserInfo)
      return this.userInfoService.myInfo;

    return this.userInfoService.getUserProfile(urlUserName);
  }
}
