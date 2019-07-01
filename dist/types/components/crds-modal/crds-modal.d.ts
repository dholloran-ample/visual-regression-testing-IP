import '../../stencil.core';
export declare class CrdsModal {
    isActive: boolean;
    onClose: Function;
    title: string;
    element: HTMLElement;
    componentDidUpdate(): void;
    handleInnerClick: (event: any) => void;
    closeModal: () => void;
    render(): JSX.Element;
}
