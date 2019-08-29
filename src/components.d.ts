/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface CrdsHeartButton {
    /**
    * Unique identifier for likeable resource
    */
    'contentfulId': string;
    /**
    * Total number of hearts
    */
    'count': number;
    /**
    * Boolean indicating whether likeable resource has been liked
    */
    'isLiked': boolean;
    /**
    * Cache key for localStorage
    */
    'storageKey': string;
  }
  interface CrdsModal {
    'isActive': boolean;
    'label': string;
    'onModalClose': Function;
  }
  interface CrdsSharedFooter {
    'env': string;
    'src': string;
  }
  interface CrdsSharedHeader {
    'env': string;
    'src': string;
  }
  interface CrdsSiteHappenings {
    'authToken': string;
  }
  interface CrdsSnailTrail {
    'env': string;
    'name': string;
    'src': string;
  }
  interface CrdsSnailTrailLink {
    'automationId': string;
    'href': string;
    'isActive': boolean;
  }
  interface CrdsSubscribe {
    'label': string;
    'src': string;
  }
  interface GiveNav {
    'data': JSON;
    'giveNavIsShowing': boolean;
  }
  interface GlobalNav {
    'config': Object;
    'env': string;
    'giveData': JSON;
    'giveNavIsShowing': boolean;
    'href': string;
    'mainNavIsShowing': boolean;
    'navClickHandler': Function;
    'profileData': JSON;
    'profileNavIsShowing': boolean;
  }
  interface GreetingComponent {
    'authToken': string;
  }
  interface LifeStages {
    'authToken': string;
  }
  interface NavCtas {
    'active': string;
    'data': string;
    'href': string;
  }
  interface NavLink {
    'automationId': string;
    'href': string;
  }
  interface NavSection {
    'activeSection': any;
    'isActive': boolean;
    'onActivate': any;
    'slug': string;
  }
  interface NavSectionSubnav {
    'active': string;
    'onBack': Function;
    'slug': string;
  }
  interface ProfileNav {
    'config': any;
    'currentUser': any;
    'data': JSON;
    'onSignOut': Function;
    'profileNavIsShowing': boolean;
  }
}

declare global {


  interface HTMLCrdsHeartButtonElement extends Components.CrdsHeartButton, HTMLStencilElement {}
  var HTMLCrdsHeartButtonElement: {
    prototype: HTMLCrdsHeartButtonElement;
    new (): HTMLCrdsHeartButtonElement;
  };

  interface HTMLCrdsModalElement extends Components.CrdsModal, HTMLStencilElement {}
  var HTMLCrdsModalElement: {
    prototype: HTMLCrdsModalElement;
    new (): HTMLCrdsModalElement;
  };

  interface HTMLCrdsSharedFooterElement extends Components.CrdsSharedFooter, HTMLStencilElement {}
  var HTMLCrdsSharedFooterElement: {
    prototype: HTMLCrdsSharedFooterElement;
    new (): HTMLCrdsSharedFooterElement;
  };

  interface HTMLCrdsSharedHeaderElement extends Components.CrdsSharedHeader, HTMLStencilElement {}
  var HTMLCrdsSharedHeaderElement: {
    prototype: HTMLCrdsSharedHeaderElement;
    new (): HTMLCrdsSharedHeaderElement;
  };

  interface HTMLCrdsSiteHappeningsElement extends Components.CrdsSiteHappenings, HTMLStencilElement {}
  var HTMLCrdsSiteHappeningsElement: {
    prototype: HTMLCrdsSiteHappeningsElement;
    new (): HTMLCrdsSiteHappeningsElement;
  };

  interface HTMLCrdsSnailTrailElement extends Components.CrdsSnailTrail, HTMLStencilElement {}
  var HTMLCrdsSnailTrailElement: {
    prototype: HTMLCrdsSnailTrailElement;
    new (): HTMLCrdsSnailTrailElement;
  };

  interface HTMLCrdsSnailTrailLinkElement extends Components.CrdsSnailTrailLink, HTMLStencilElement {}
  var HTMLCrdsSnailTrailLinkElement: {
    prototype: HTMLCrdsSnailTrailLinkElement;
    new (): HTMLCrdsSnailTrailLinkElement;
  };

  interface HTMLCrdsSubscribeElement extends Components.CrdsSubscribe, HTMLStencilElement {}
  var HTMLCrdsSubscribeElement: {
    prototype: HTMLCrdsSubscribeElement;
    new (): HTMLCrdsSubscribeElement;
  };

  interface HTMLGiveNavElement extends Components.GiveNav, HTMLStencilElement {}
  var HTMLGiveNavElement: {
    prototype: HTMLGiveNavElement;
    new (): HTMLGiveNavElement;
  };

  interface HTMLGlobalNavElement extends Components.GlobalNav, HTMLStencilElement {}
  var HTMLGlobalNavElement: {
    prototype: HTMLGlobalNavElement;
    new (): HTMLGlobalNavElement;
  };

  interface HTMLGreetingComponentElement extends Components.GreetingComponent, HTMLStencilElement {}
  var HTMLGreetingComponentElement: {
    prototype: HTMLGreetingComponentElement;
    new (): HTMLGreetingComponentElement;
  };

  interface HTMLLifeStagesElement extends Components.LifeStages, HTMLStencilElement {}
  var HTMLLifeStagesElement: {
    prototype: HTMLLifeStagesElement;
    new (): HTMLLifeStagesElement;
  };

  interface HTMLNavCtasElement extends Components.NavCtas, HTMLStencilElement {}
  var HTMLNavCtasElement: {
    prototype: HTMLNavCtasElement;
    new (): HTMLNavCtasElement;
  };

  interface HTMLNavLinkElement extends Components.NavLink, HTMLStencilElement {}
  var HTMLNavLinkElement: {
    prototype: HTMLNavLinkElement;
    new (): HTMLNavLinkElement;
  };

  interface HTMLNavSectionElement extends Components.NavSection, HTMLStencilElement {}
  var HTMLNavSectionElement: {
    prototype: HTMLNavSectionElement;
    new (): HTMLNavSectionElement;
  };

  interface HTMLNavSectionSubnavElement extends Components.NavSectionSubnav, HTMLStencilElement {}
  var HTMLNavSectionSubnavElement: {
    prototype: HTMLNavSectionSubnavElement;
    new (): HTMLNavSectionSubnavElement;
  };

  interface HTMLProfileNavElement extends Components.ProfileNav, HTMLStencilElement {}
  var HTMLProfileNavElement: {
    prototype: HTMLProfileNavElement;
    new (): HTMLProfileNavElement;
  };
  interface HTMLElementTagNameMap {
    'crds-heart-button': HTMLCrdsHeartButtonElement;
    'crds-modal': HTMLCrdsModalElement;
    'crds-shared-footer': HTMLCrdsSharedFooterElement;
    'crds-shared-header': HTMLCrdsSharedHeaderElement;
    'crds-site-happenings': HTMLCrdsSiteHappeningsElement;
    'crds-snail-trail': HTMLCrdsSnailTrailElement;
    'crds-snail-trail-link': HTMLCrdsSnailTrailLinkElement;
    'crds-subscribe': HTMLCrdsSubscribeElement;
    'give-nav': HTMLGiveNavElement;
    'global-nav': HTMLGlobalNavElement;
    'greeting-component': HTMLGreetingComponentElement;
    'life-stages': HTMLLifeStagesElement;
    'nav-ctas': HTMLNavCtasElement;
    'nav-link': HTMLNavLinkElement;
    'nav-section': HTMLNavSectionElement;
    'nav-section-subnav': HTMLNavSectionSubnavElement;
    'profile-nav': HTMLProfileNavElement;
  }
}

declare namespace LocalJSX {
  interface CrdsHeartButton extends JSXBase.HTMLAttributes<HTMLCrdsHeartButtonElement> {
    /**
    * Unique identifier for likeable resource
    */
    'contentfulId'?: string;
    /**
    * Total number of hearts
    */
    'count'?: number;
    /**
    * Boolean indicating whether likeable resource has been liked
    */
    'isLiked'?: boolean;
    /**
    * Cache key for localStorage
    */
    'storageKey'?: string;
  }
  interface CrdsModal extends JSXBase.HTMLAttributes<HTMLCrdsModalElement> {
    'isActive'?: boolean;
    'label'?: string;
    'onModalClose'?: Function;
  }
  interface CrdsSharedFooter extends JSXBase.HTMLAttributes<HTMLCrdsSharedFooterElement> {
    'env'?: string;
    'src'?: string;
  }
  interface CrdsSharedHeader extends JSXBase.HTMLAttributes<HTMLCrdsSharedHeaderElement> {
    'env'?: string;
    'src'?: string;
  }
  interface CrdsSiteHappenings extends JSXBase.HTMLAttributes<HTMLCrdsSiteHappeningsElement> {
    'authToken'?: string;
  }
  interface CrdsSnailTrail extends JSXBase.HTMLAttributes<HTMLCrdsSnailTrailElement> {
    'env'?: string;
    'name'?: string;
    'src'?: string;
  }
  interface CrdsSnailTrailLink extends JSXBase.HTMLAttributes<HTMLCrdsSnailTrailLinkElement> {
    'automationId'?: string;
    'href'?: string;
    'isActive'?: boolean;
  }
  interface CrdsSubscribe extends JSXBase.HTMLAttributes<HTMLCrdsSubscribeElement> {
    'label'?: string;
    'src'?: string;
  }
  interface GiveNav extends JSXBase.HTMLAttributes<HTMLGiveNavElement> {
    'data'?: JSON;
    'giveNavIsShowing'?: boolean;
  }
  interface GlobalNav extends JSXBase.HTMLAttributes<HTMLGlobalNavElement> {
    'config'?: Object;
    'env'?: string;
    'giveData'?: JSON;
    'giveNavIsShowing'?: boolean;
    'href'?: string;
    'mainNavIsShowing'?: boolean;
    'navClickHandler'?: Function;
    'profileData'?: JSON;
    'profileNavIsShowing'?: boolean;
  }
  interface GreetingComponent extends JSXBase.HTMLAttributes<HTMLGreetingComponentElement> {
    'authToken'?: string;
  }
  interface LifeStages extends JSXBase.HTMLAttributes<HTMLLifeStagesElement> {
    'authToken'?: string;
  }
  interface NavCtas extends JSXBase.HTMLAttributes<HTMLNavCtasElement> {
    'active'?: string;
    'data'?: string;
    'href'?: string;
  }
  interface NavLink extends JSXBase.HTMLAttributes<HTMLNavLinkElement> {
    'automationId'?: string;
    'href'?: string;
    'onSignOutClicked'?: (event: CustomEvent<any>) => void;
  }
  interface NavSection extends JSXBase.HTMLAttributes<HTMLNavSectionElement> {
    'activeSection'?: any;
    'isActive'?: boolean;
    'onActivate'?: any;
    'slug'?: string;
  }
  interface NavSectionSubnav extends JSXBase.HTMLAttributes<HTMLNavSectionSubnavElement> {
    'active'?: string;
    'onBack'?: Function;
    'slug'?: string;
  }
  interface ProfileNav extends JSXBase.HTMLAttributes<HTMLProfileNavElement> {
    'config'?: any;
    'currentUser'?: any;
    'data'?: JSON;
    'onSignOut'?: Function;
    'profileNavIsShowing'?: boolean;
  }

  interface IntrinsicElements {
    'crds-heart-button': CrdsHeartButton;
    'crds-modal': CrdsModal;
    'crds-shared-footer': CrdsSharedFooter;
    'crds-shared-header': CrdsSharedHeader;
    'crds-site-happenings': CrdsSiteHappenings;
    'crds-snail-trail': CrdsSnailTrail;
    'crds-snail-trail-link': CrdsSnailTrailLink;
    'crds-subscribe': CrdsSubscribe;
    'give-nav': GiveNav;
    'global-nav': GlobalNav;
    'greeting-component': GreetingComponent;
    'life-stages': LifeStages;
    'nav-ctas': NavCtas;
    'nav-link': NavLink;
    'nav-section': NavSection;
    'nav-section-subnav': NavSectionSubnav;
    'profile-nav': ProfileNav;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}


