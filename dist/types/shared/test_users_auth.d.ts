export declare const user_with_site: {
    email: string;
    password: string;
    site_id: number;
};
export declare const user_with_nickname: {
    email: string;
    password: string;
};
export declare const user_without_nickname: {
    email: string;
    password: string;
};
export declare function getSessionID(username: any, password: any): Promise<any>;
