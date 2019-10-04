export declare class SharedHeader {
    src: string;
    env: string;
    active: string;
    data: any;
    element: HTMLElement;
    componentWillLoad(): Promise<void>;
    componentDidLoad(): void;
    render(): any;
}
