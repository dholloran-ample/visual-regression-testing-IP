import { Utils } from './utils';

export class Config {
  /**
   * Returns space_id
   */
  space_id() {
    return Utils.getMeta('cfl:space_id') || process.env.CONTENTFUL_SPACE_ID;
  }

  /**
   * Returns environment
   */
  env() {
    return Utils.getMeta('cfl:env') || process.env.CONTENTFUL_ENV || 'master';
  }

  /**
   * Returns delivery token
   */
  token() {
    return Utils.getMeta('cfl:token') || process.env.CONTENTFUL_ACCESS_TOKEN;
  }

  /**
   * Returns service endpoint
   */
  endpoint() {
    return `https://cdn.contentful.com/spaces/${this.space_id()}/environments/${this.env()}`;
  }
}
