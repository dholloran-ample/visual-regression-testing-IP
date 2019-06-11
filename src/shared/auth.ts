import {
  CrdsAuthenticationService,
  CrdsAuthConfig,
  CrdsOktaConfig,
  CrdsMpConfig,
  CrdsAuthenticationProviders
} from '@crds_npm/crds-client-auth';
import { Utils } from './utils';

export class Auth {
  authenticated: boolean = false;
  authService: CrdsAuthenticationService;
  config: any;
  currentUser: object;
  isMp: boolean;
  isOkta: boolean;
  token: any;

  subdomainMap = {
    prod: 'www'
  };

  constructor(config) {
    this.config = config;
    const oktaConfig: CrdsOktaConfig = {
      clientId: config.okta_client_id,
      issuer: config.okta_issuer,
      tokenManager: {
        storage: 'cookie'
      }
    };
    const mpConfig: CrdsMpConfig = {
      accessTokenCookie: config.mp_access_token_cookie,
      refreshTokenCookie: config.mp_refresh_token_cookie
    };
    const authConfig: CrdsAuthConfig = {
      oktaConfig: oktaConfig,
      mpConfig: mpConfig,
      logging: true,
      providerPreference: [CrdsAuthenticationProviders.Okta, CrdsAuthenticationProviders.Mp]
    };
    this.authService = new CrdsAuthenticationService(authConfig);
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
    const subdomain = this.subdomainMap[this.config.env] || this.config.env;
    return `https://${subdomain}.crossroads.net/proxy/gateway/api/image/profile/${userId}`;
  }
}
