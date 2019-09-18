import { HTMLStencilElement } from '../../stencil.core';
import { CrdsUser, CrdsLifeStage } from './crds-recommended-content-interface';
export declare class CrdsRecommendedContent {
    private analytics;
    private apolloClient;
    private crdsDefaultImg;
    private recommendedContent;
    lifeStages: CrdsLifeStage[];
    user: CrdsUser;
    authToken: string;
    host: HTMLStencilElement;
    authTokenHandler(newValue: string, oldValue: string): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentWillRender(): any;
    private getLifeStageId;
    private getUser;
    private getLifeStages;
    /**
     * Get content with set life stages
     */
    private filterContent;
    private handleBackClick;
    private handleContentClicked;
    /**
     * Get content with set life stages
     */
    private setLifeStage;
    private handleLifeStageClicked;
    private renderCardSkeleton;
    private renderTextSkeleton;
    private renderLifeStages;
    private renderMediaLabel;
    private renderIcon;
    private renderRecommendedContent;
    private renderText;
    render(): any;
}
