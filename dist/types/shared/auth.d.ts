import { CrdsAuthenticationService } from '@crds_npm/crds-client-auth';
export declare class Auth {
    authenticated: boolean;
    authService: CrdsAuthenticationService;
    config: any;
    currentUser: object;
    isMp: boolean;
    isOkta: boolean;
    token: any;
    analytics: any;
    subdomainMap: {
        prod: string;
    };
    constructor(config?: any);
    listen(callback: any): void;
    signOut(callback: any): void;
    private updateCurrentUser;
    private getUserId;
    private getUser;
    private getUserImageUrl;
    static getMPIssuerEndpoint(env: any): string;
}
