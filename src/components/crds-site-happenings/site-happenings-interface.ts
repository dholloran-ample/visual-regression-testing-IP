export interface CrdsUser {
  name: string;
  site: string;
}

export interface CrdsHappening {
  targetAudience: string[];
  imageUrl: string;
  title: string;
  description: string;
  qualifiedUrl: string;
}


export interface Site {
  id: string;
  name: string;
}

export interface ContentBlock { 
  slug: string
  content: string
}
