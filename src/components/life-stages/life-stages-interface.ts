import { CrdsImage } from "../crds-site-happenings/site-happenings-interface";

export interface CrdsUser {
  name: string;
  lifeStage: string;
}

export interface CrdsLifeStage {
  title: string;
  description: string;
  image: CrdsImage;
  content: CrdsEntry[];
}

export interface CrdsEntry {
  sys: string
}
