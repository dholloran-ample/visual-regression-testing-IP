import { GroupUser, Group } from './crds-group-list.interface';
import { HTMLStencilElement } from '../../stencil.core';
export declare class CrdsGroupList {
    private apolloClient;
    private contentBlockHandler;
    authToken: string;
    user: GroupUser;
    expanded: boolean;
    host: HTMLStencilElement;
    private leader;
    authTokenHandler(newValue: string, oldValue: string): void;
    componentWillLoad(): void;
    getUserGroups(): Promise<void>;
    private convertTime;
    private logError;
    renderMeetingTime(group: Group): string;
    renderLeaderTag(group: Group): any;
    renderGroupList(): any[];
    renderUserGroupState(): any[] | HTMLDivElement;
    renderCallToAction(): HTMLDivElement;
    private renderGroupSkeleton;
    renderUserGreeting(): any;
    renderShowMoreLink(): any;
    render(): any;
}
