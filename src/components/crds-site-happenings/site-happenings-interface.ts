export interface CrdsUser {
  name: string;
  site: string;
}

export interface CrdsHappening {
  targetAudience: string[];
  linkUrl: string;
  title: string;
  image: CrdsImage;
  description: string;
}

export interface CrdsImage {
  url: string;
}

export interface MpCongregation {
  id: string;
  name: string;
}
