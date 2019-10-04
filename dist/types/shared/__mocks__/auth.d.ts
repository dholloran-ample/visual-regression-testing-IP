export declare class Auth {
    authenticated: boolean;
    config: any;
    token: any;
    currentUser: object;
    constructor(config?: any);
    listen(callback: any): boolean;
    signOut(callback: any): void;
    private updateCurrentUser;
}
