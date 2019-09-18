import { GreetingUser } from './crds-greeting-interface';
import { HTMLStencilElement } from '../../stencil.core';
export declare class CrdsGreeting {
    private apolloClient;
    user: GreetingUser;
    authToken: string;
    defaultName: string;
    host: HTMLStencilElement;
    authTokenHandler(newValue: string, oldValue: string): void;
    componentWillLoad(): void;
    componentDidRender(): void;
    getUser(): Promise<void>;
    parseTimeBasedGreetings(hour: any): "Good evening" | "Good afternoon" | "Good morning";
    renderGreeting(): string;
    private logError;
    render(): any;
}
