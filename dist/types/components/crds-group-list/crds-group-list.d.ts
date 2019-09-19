import { GroupUser, Group } from './crds-group-list.interface';
import { HTMLStencilElement } from '../../stencil.core';
export declare class CrdsGroupList {
    private apolloClient;
    private validGroups;
    private contentBlockHandler;
    user: GroupUser;
    authToken: string;
    host: HTMLStencilElement;
    private leader;
    authTokenHandler(newValue: string, oldValue: string): void;
    componentWillLoad(): void;
    getUserGroups(): Promise<void>;
    private logError;
    renderLeaderTag(group: Group): any;
    renderGroupList(): any[];
    renderUserGroupState(): any;
    renderCallToAction(): HTMLDivElement;
    render(): any;
}
