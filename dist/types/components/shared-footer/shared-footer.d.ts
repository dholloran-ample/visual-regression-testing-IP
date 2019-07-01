export declare class SharedFooter {
    src: string;
    env: string;
    data: Array<any>;
    element: HTMLElement;
    componentWillLoad(): void;
    componentDidLoad(): void;
    private renderElement;
    private renderGroups;
    private renderColumns;
    render(): any;
}
