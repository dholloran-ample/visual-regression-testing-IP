import {
  CrdsAuthenticationService,
  CrdsAuthConfig,
  CrdsOktaConfig,
  CrdsMpConfig,
  CrdsAuthenticationProviders
} from '@crds_npm/crds-client-auth';
import { Utils } from './utils';

export class Auth {
  oktaConfig: CrdsOktaConfig = {
    clientId: process.env.OKTA_CLIENT_ID,
    issuer: process.env.OKTA_ISSUER,
    tokenManager: {
      storage: 'cookie'
    }
  };

  mpConfig: CrdsMpConfig = {
    accessTokenCookie: process.env.MP_ACCESS_TOKEN_COOKIE,
    refreshTokenCookie: process.env.MP_REFRESH_TOKEN_COOKIE
  };

  authConfig: CrdsAuthConfig = {
    oktaConfig: this.oktaConfig,
    mpConfig: this.mpConfig,
    logging: true,
    providerPreference: [CrdsAuthenticationProviders.Okta, CrdsAuthenticationProviders.Mp]
  };

  authenticated: boolean = false;
  authService: CrdsAuthenticationService;
  isMp: boolean;
  isOkta: boolean;
  token: any;

  constructor() {
    this.authService = new CrdsAuthenticationService(this.authConfig);

    this.authService.authenticated().subscribe(token => {
      console.log(token);
      if (token) {
        this.authenticated = true;
        this.token = token;
        this.isMp = token.provider == CrdsAuthenticationProviders.Mp;
        this.isOkta = token.provider == CrdsAuthenticationProviders.Okta;

        console.log('userId', this.getUserId());
        console.log('userName', this.getUserName());
        console.log('userImageUrl', this.getUserImageUrl());
      } else {
        this.authenticated = false;
      }
    });
  }

  getUserId() {
    if (!this.authenticated) return null;
    if (this.isOkta) return this.token.id_token.claims.mpContactId;
    if (this.isMp) return Utils.getCookie('userId');
  }

  getUserName() {
    if (!this.authenticated) return null;
    if (this.isOkta) return this.token.id_token.claims.name;
    if (this.isMp) return Utils.getCookie('username');
  }

  getUserImageUrl() {
    if (!this.authenticated) return null;
    const userId = this.getUserId();
    if (!userId) return null;
    return `${process.env.CRDS_USER_IMAGE_BASE_URL}${userId}`;
  }

  signOut() {
    this.authService.signOut().subscribe(success => {
      if (success) {
        console.log('log out worked');
      } else {
        console.log('log out failed');
      }
    });
  }
}
