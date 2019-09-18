import { CrdsAuthenticationService, CrdsAuthenticationProviders } from '@crds_npm/crds-client-auth';
import { Utils } from './utils';
export class Auth {
    constructor(config = {}) {
        this.authenticated = false;
        this.subdomainMap = {
            prod: 'www'
        };
        this.config = config;
        this.analytics = window['analytics'] || {};
        const oktaConfig = {
            clientId: config.okta_client_id,
            issuer: config.okta_issuer,
            tokenManager: {
                storage: 'cookie'
            }
        };
        const mpConfig = {
            accessTokenCookie: config.mp_access_token_cookie,
            refreshTokenCookie: config.mp_refresh_token_cookie,
            issuer: Auth.getMPIssuerEndpoint(this.config.env)
        };
        const authConfig = {
            oktaConfig: oktaConfig,
            mpConfig: mpConfig,
            logging: config.logging || false,
            providerPreference: [CrdsAuthenticationProviders.Okta, CrdsAuthenticationProviders.Mp]
        };
        this.authService = new CrdsAuthenticationService(authConfig);
    }
    listen(callback) {
        this.authService.authenticated().subscribe(token => {
            if (!token)
                return (this.authenticated = false);
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
            }
            else {
                console.log('log out failed');
            }
        });
    }
    updateCurrentUser() {
        if (!this.authenticated)
            return (this.currentUser = null);
        const userId = this.getUserId();
        const userName = this.getUser();
        if (this.analytics)
            this.analytics.identify(userId, {
                name: userName
            });
        return (this.currentUser = {
            id: userId,
            name: userName,
            avatarUrl: this.getUserImageUrl()
        });
    }
    getUserId() {
        if (!this.authenticated)
            return null;
        if (this.isOkta)
            return this.token.id_token.claims.mpContactId;
        if (this.isMp)
            return Utils.getCookie('userId');
    }
    getUser() {
        if (!this.authenticated)
            return null;
        if (this.isOkta)
            return this.token.id_token.claims.name;
        if (this.isMp)
            return Utils.getCookie('username');
    }
    getUserImageUrl() {
        if (!this.authenticated)
            return null;
        const userId = this.getUserId();
        if (!userId)
            return null;
        const subdomain = Utils.getSubdomain(this.config.env);
        return `https://${subdomain}.crossroads.net/proxy/gateway/api/image/profile/${userId}`;
    }
    static getMPIssuerEndpoint(env) {
        const subdomain = env == 'int' || env == 'demo' ? env : '';
        return `https://gateway${subdomain}.crossroads.net/gateway/api/login`;
    }
}
