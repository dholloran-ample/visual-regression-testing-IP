export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The `Upload` scalar type represents a file upload. */
  Upload: any,
};


export type Author = {
  __typename?: 'Author',
  fullName?: Maybe<Scalars['String']>,
  qualifiedUrl?: Maybe<Scalars['String']>,
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Group = {
  __typename?: 'Group',
  id: Scalars['ID'],
  name: Scalars['String'],
  role: Scalars['String'],
  type: Scalars['Int'],
};

export type LifeStage = {
  __typename?: 'LifeStage',
  id: Scalars['String'],
  title?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  imageUrl: Scalars['String'],
  contentTotal: Scalars['String'],
};

export type LifeStageContent = {
  __typename?: 'LifeStageContent',
  id: Scalars['String'],
  title?: Maybe<Scalars['String']>,
  contentType: Scalars['String'],
  duration?: Maybe<Scalars['String']>,
  authors?: Maybe<Array<Author>>,
  category?: Maybe<Scalars['String']>,
  slug?: Maybe<Scalars['String']>,
  imageUrl?: Maybe<Scalars['String']>,
  qualifiedUrl?: Maybe<Scalars['String']>,
};

export type LifeStageInput = {
  id: Scalars['String'],
  title?: Maybe<Scalars['String']>,
};

export type Mutation = {
  __typename?: 'Mutation',
  _?: Maybe<Scalars['Boolean']>,
  /** set the site of user */
  setSite?: Maybe<User>,
  /** set the site of user */
  setLifeStage?: Maybe<User>,
};


export type MutationSetSiteArgs = {
  siteId: Scalars['ID']
};


export type MutationSetLifeStageArgs = {
  lifeStage?: Maybe<LifeStageInput>
};

export type Query = {
  __typename?: 'Query',
  _?: Maybe<Scalars['Boolean']>,
  user?: Maybe<User>,
  sites?: Maybe<Array<Site>>,
  lifeStages?: Maybe<Array<LifeStage>>,
  lifeStageContent?: Maybe<Array<LifeStageContent>>,
};


export type QuerySitesArgs = {
  filter?: Maybe<Scalars['String']>
};


export type QueryLifeStageContentArgs = {
  id?: Maybe<Scalars['String']>
};

export type Site = {
  __typename?: 'Site',
  id: Scalars['ID'],
  name: Scalars['String'],
};

export type Subscription = {
  __typename?: 'Subscription',
  _?: Maybe<Scalars['Boolean']>,
};


export type User = {
  __typename?: 'User',
  id: Scalars['ID'],
  site?: Maybe<Site>,
  groups?: Maybe<Array<Group>>,
  lifeStage?: Maybe<LifeStage>,
};
