import { CrdsImage } from "../crds-site-happenings/site-happenings-interface";

export interface CrdsUser {
  name: string;
  lifeStage: string;
}

export interface CrdsLifeStage {
  title: string;
  slug: string;
  description: string;
  image: CrdsImage;
  total: number;
}

export interface CrdsEntry {
  sys: string
}
