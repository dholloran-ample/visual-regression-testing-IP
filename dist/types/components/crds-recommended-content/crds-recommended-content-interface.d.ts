export interface CrdsUser {
    name: string;
    lifeStage: {
        id: string;
        title: string;
    };
}
export interface CrdsLifeStage {
    id: string;
    title: string;
    imageUrl: string;
    contentTotal: string;
    description: string;
    content: any;
}
