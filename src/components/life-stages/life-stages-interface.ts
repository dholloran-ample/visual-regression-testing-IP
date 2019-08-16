import { CrdsImage } from "../crds-site-happenings/site-happenings-interface";
import { Identifier } from "@babel/types";

export interface CrdsUser {
  name: string;
  lifeStage: string;
}

export interface CrdsLifeStage {
  id: string;
  title: string;
  imageUrl: string;
  contentTotal: string;
}
