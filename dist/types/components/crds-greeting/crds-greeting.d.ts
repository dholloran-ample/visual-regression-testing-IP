import { HTMLStencilElement } from '../../stencil.core';
export declare class CrdsGreeting {
    private apolloClient;
    private user;
    displayName: string;
    authToken: string;
    defaultName: string;
    host: HTMLStencilElement;
    authTokenHandler(newValue: string, oldValue: string): void;
    componentWillLoad(): void;
    componentWillRender(): Promise<void>;
    componentDidRender(): void;
    getUser(): Promise<void>;
    private getDisplayName;
    parseTimeBasedGreetings(hour: any): "Good evening" | "Good afternoon" | "Good morning";
    renderGreeting(): string;
    private logError;
    render(): any;
}
