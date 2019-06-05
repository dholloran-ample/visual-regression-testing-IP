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
  currentUser: object;

  constructor() {
    this.authService = new CrdsAuthenticationService(this.authConfig);
  }

  listen(callback) {
    this.authService.authenticated().subscribe(token => {
      if (!token) return (this.authenticated = false);
      this.authenticated = true;
      this.token = token;
      this.isMp = token.provider == CrdsAuthenticationProviders.Mp;
      this.isOkta = token.provider == CrdsAuthenticationProviders.Okta;
      this.updateCurrentUser();
      callback(this);
    });
  }

  signOut(callback) {
    this.authService.signOut().subscribe(success => {
      if (success) {
        this.authenticated = false;
        this.updateCurrentUser();
        callback(this);
      } else {
        console.log('log out failed');
      }
    });
  }

  private updateCurrentUser() {
    if (!this.authenticated) return (this.currentUser = null);
    return (this.currentUser = {
      id: this.getUserId(),
      name: this.getUserName(),
      avatarUrl: this.getUserImageUrl()
    });
  }

  private getUserId() {
    if (!this.authenticated) return null;
    if (this.isOkta) return this.token.id_token.claims.mpContactId;
    if (this.isMp) return Utils.getCookie('userId');
  }

  private getUserName() {
    if (!this.authenticated) return null;
    if (this.isOkta) return this.token.id_token.claims.name;
    if (this.isMp) return Utils.getCookie('username');
  }

  private getUserImageUrl() {
    if (!this.authenticated) return null;
    const userId = this.getUserId();
    if (!userId) return null;
    return `${process.env.CRDS_BASE_URL}/proxy/gateway/api/image/profile/${userId}`;
  }
}
