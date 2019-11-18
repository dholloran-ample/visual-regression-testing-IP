/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import {
  Response,
} from './components/crds-tithe-challenge/crds-tithe-challenge.interface';

export namespace Components {
  interface CrdsButton {
    'color': string;
    'href': string;
    'onClick': (event: MouseEvent) => void;
    'text': string;
    'type': string;
  }
  interface CrdsDefaultCard {
    'body': string;
    'buttonSrc': string;
    'category': string;
    'contentType': string;
    'heading': string;
    'iconLabel': string;
    'imageSrc': string;
    'meta': string;
    'thumbnailSrc': string;
    'url': string;
  }
  interface CrdsGreeting {
    'defaultName': string;
  }
  interface CrdsGroupList {}
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
  interface CrdsIcon {
    'color': string;
    'name': string;
    'size': string;
  }
  interface CrdsImage {
    'size': string;
    'src': string;
  }
  interface CrdsImageTitleCutout {
    'cardTitle': string;
    'imageHref': string;
    'imageUrl': string;
    'titleHref': string;
  }
  interface CrdsLabel {
    'text': string;
    'tint': string;
  }
  interface CrdsMediaCard {
    'body': string;
    'category': string;
    'contentLayout': string;
    'contentType': string;
    'heading': string;
    'iconLabel': string;
    'imageSrc': string;
    'meta': string;
    'thumbnailSrc': string;
    'url': string;
  }
  interface CrdsModal {
    'isActive': boolean;
    'label': string;
    'onModalClose': Function;
  }
  interface CrdsRecommendedContent {}
  interface CrdsSharedFooter {
    'env': string;
    'src': string;
  }
  interface CrdsSharedHeader {
    'env': string;
    'src': string;
  }
  interface CrdsSiteHappenings {}
  interface CrdsSiteSelect {
    'cardSiteId': number;
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
  interface CrdsTitheChallenge {
    'selectedFeeling': Response;
  }
  interface CrdsVideo {
    'active': boolean;
    'shadow': boolean;
    'theme': string;
    'transcript': string;
    'youtubeId': string;
  }
  interface GiveNav {
    'data': any;
    'isNavShowing': boolean;
  }
  interface GlobalNav {
    'data': any;
    'env': string;
  }
  interface MainNav {
    'data': any;
    'isNavShowing': boolean;
    'promoData': string;
  }
  interface MySite {}
  interface NavCtas {
    'data': string;
  }
  interface NavSection {
    'handleClick': Function;
    'isActive': boolean;
    'sectionName': string;
  }
  interface NavSectionSubnav {
    'data': any;
    'handleBackClick': Function;
    'isActive': boolean;
    'subNavName': string;
  }
  interface ProfileNav {
    'currentUser': any;
    'data': any;
    'handleSignOut': Function;
    'isNavShowing': boolean;
  }
}

declare global {


  interface HTMLCrdsButtonElement extends Components.CrdsButton, HTMLStencilElement {}
  var HTMLCrdsButtonElement: {
    prototype: HTMLCrdsButtonElement;
    new (): HTMLCrdsButtonElement;
  };

  interface HTMLCrdsDefaultCardElement extends Components.CrdsDefaultCard, HTMLStencilElement {}
  var HTMLCrdsDefaultCardElement: {
    prototype: HTMLCrdsDefaultCardElement;
    new (): HTMLCrdsDefaultCardElement;
  };

  interface HTMLCrdsGreetingElement extends Components.CrdsGreeting, HTMLStencilElement {}
  var HTMLCrdsGreetingElement: {
    prototype: HTMLCrdsGreetingElement;
    new (): HTMLCrdsGreetingElement;
  };

  interface HTMLCrdsGroupListElement extends Components.CrdsGroupList, HTMLStencilElement {}
  var HTMLCrdsGroupListElement: {
    prototype: HTMLCrdsGroupListElement;
    new (): HTMLCrdsGroupListElement;
  };

  interface HTMLCrdsHeartButtonElement extends Components.CrdsHeartButton, HTMLStencilElement {}
  var HTMLCrdsHeartButtonElement: {
    prototype: HTMLCrdsHeartButtonElement;
    new (): HTMLCrdsHeartButtonElement;
  };

  interface HTMLCrdsIconElement extends Components.CrdsIcon, HTMLStencilElement {}
  var HTMLCrdsIconElement: {
    prototype: HTMLCrdsIconElement;
    new (): HTMLCrdsIconElement;
  };

  interface HTMLCrdsImageElement extends Components.CrdsImage, HTMLStencilElement {}
  var HTMLCrdsImageElement: {
    prototype: HTMLCrdsImageElement;
    new (): HTMLCrdsImageElement;
  };

  interface HTMLCrdsImageTitleCutoutElement extends Components.CrdsImageTitleCutout, HTMLStencilElement {}
  var HTMLCrdsImageTitleCutoutElement: {
    prototype: HTMLCrdsImageTitleCutoutElement;
    new (): HTMLCrdsImageTitleCutoutElement;
  };

  interface HTMLCrdsLabelElement extends Components.CrdsLabel, HTMLStencilElement {}
  var HTMLCrdsLabelElement: {
    prototype: HTMLCrdsLabelElement;
    new (): HTMLCrdsLabelElement;
  };

  interface HTMLCrdsMediaCardElement extends Components.CrdsMediaCard, HTMLStencilElement {}
  var HTMLCrdsMediaCardElement: {
    prototype: HTMLCrdsMediaCardElement;
    new (): HTMLCrdsMediaCardElement;
  };

  interface HTMLCrdsModalElement extends Components.CrdsModal, HTMLStencilElement {}
  var HTMLCrdsModalElement: {
    prototype: HTMLCrdsModalElement;
    new (): HTMLCrdsModalElement;
  };

  interface HTMLCrdsRecommendedContentElement extends Components.CrdsRecommendedContent, HTMLStencilElement {}
  var HTMLCrdsRecommendedContentElement: {
    prototype: HTMLCrdsRecommendedContentElement;
    new (): HTMLCrdsRecommendedContentElement;
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

  interface HTMLCrdsSiteSelectElement extends Components.CrdsSiteSelect, HTMLStencilElement {}
  var HTMLCrdsSiteSelectElement: {
    prototype: HTMLCrdsSiteSelectElement;
    new (): HTMLCrdsSiteSelectElement;
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

  interface HTMLCrdsTitheChallengeElement extends Components.CrdsTitheChallenge, HTMLStencilElement {}
  var HTMLCrdsTitheChallengeElement: {
    prototype: HTMLCrdsTitheChallengeElement;
    new (): HTMLCrdsTitheChallengeElement;
  };

  interface HTMLCrdsVideoElement extends Components.CrdsVideo, HTMLStencilElement {}
  var HTMLCrdsVideoElement: {
    prototype: HTMLCrdsVideoElement;
    new (): HTMLCrdsVideoElement;
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

  interface HTMLMainNavElement extends Components.MainNav, HTMLStencilElement {}
  var HTMLMainNavElement: {
    prototype: HTMLMainNavElement;
    new (): HTMLMainNavElement;
  };

  interface HTMLMySiteElement extends Components.MySite, HTMLStencilElement {}
  var HTMLMySiteElement: {
    prototype: HTMLMySiteElement;
    new (): HTMLMySiteElement;
  };

  interface HTMLNavCtasElement extends Components.NavCtas, HTMLStencilElement {}
  var HTMLNavCtasElement: {
    prototype: HTMLNavCtasElement;
    new (): HTMLNavCtasElement;
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
    'crds-button': HTMLCrdsButtonElement;
    'crds-default-card': HTMLCrdsDefaultCardElement;
    'crds-greeting': HTMLCrdsGreetingElement;
    'crds-group-list': HTMLCrdsGroupListElement;
    'crds-heart-button': HTMLCrdsHeartButtonElement;
    'crds-icon': HTMLCrdsIconElement;
    'crds-image': HTMLCrdsImageElement;
    'crds-image-title-cutout': HTMLCrdsImageTitleCutoutElement;
    'crds-label': HTMLCrdsLabelElement;
    'crds-media-card': HTMLCrdsMediaCardElement;
    'crds-modal': HTMLCrdsModalElement;
    'crds-recommended-content': HTMLCrdsRecommendedContentElement;
    'crds-shared-footer': HTMLCrdsSharedFooterElement;
    'crds-shared-header': HTMLCrdsSharedHeaderElement;
    'crds-site-happenings': HTMLCrdsSiteHappeningsElement;
    'crds-site-select': HTMLCrdsSiteSelectElement;
    'crds-snail-trail': HTMLCrdsSnailTrailElement;
    'crds-snail-trail-link': HTMLCrdsSnailTrailLinkElement;
    'crds-subscribe': HTMLCrdsSubscribeElement;
    'crds-tithe-challenge': HTMLCrdsTitheChallengeElement;
    'crds-video': HTMLCrdsVideoElement;
    'give-nav': HTMLGiveNavElement;
    'global-nav': HTMLGlobalNavElement;
    'main-nav': HTMLMainNavElement;
    'my-site': HTMLMySiteElement;
    'nav-ctas': HTMLNavCtasElement;
    'nav-section': HTMLNavSectionElement;
    'nav-section-subnav': HTMLNavSectionSubnavElement;
    'profile-nav': HTMLProfileNavElement;
  }
}

declare namespace LocalJSX {
  interface CrdsButton extends JSXBase.HTMLAttributes<HTMLCrdsButtonElement> {
    'color'?: string;
    'href'?: string;
    'onClick'?: (event: MouseEvent) => void;
    'text'?: string;
    'type'?: string;
  }
  interface CrdsDefaultCard extends JSXBase.HTMLAttributes<HTMLCrdsDefaultCardElement> {
    'body'?: string;
    'buttonSrc'?: string;
    'category'?: string;
    'contentType'?: string;
    'heading'?: string;
    'iconLabel'?: string;
    'imageSrc'?: string;
    'meta'?: string;
    'thumbnailSrc'?: string;
    'url'?: string;
  }
  interface CrdsGreeting extends JSXBase.HTMLAttributes<HTMLCrdsGreetingElement> {
    'defaultName'?: string;
  }
  interface CrdsGroupList extends JSXBase.HTMLAttributes<HTMLCrdsGroupListElement> {}
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
  interface CrdsIcon extends JSXBase.HTMLAttributes<HTMLCrdsIconElement> {
    'color'?: string;
    'name'?: string;
    'size'?: string;
  }
  interface CrdsImage extends JSXBase.HTMLAttributes<HTMLCrdsImageElement> {
    'size'?: string;
    'src'?: string;
  }
  interface CrdsImageTitleCutout extends JSXBase.HTMLAttributes<HTMLCrdsImageTitleCutoutElement> {
    'cardTitle'?: string;
    'imageHref'?: string;
    'imageUrl'?: string;
    'titleHref'?: string;
  }
  interface CrdsLabel extends JSXBase.HTMLAttributes<HTMLCrdsLabelElement> {
    'text'?: string;
    'tint'?: string;
  }
  interface CrdsMediaCard extends JSXBase.HTMLAttributes<HTMLCrdsMediaCardElement> {
    'body'?: string;
    'category'?: string;
    'contentLayout'?: string;
    'contentType'?: string;
    'heading'?: string;
    'iconLabel'?: string;
    'imageSrc'?: string;
    'meta'?: string;
    'thumbnailSrc'?: string;
    'url'?: string;
  }
  interface CrdsModal extends JSXBase.HTMLAttributes<HTMLCrdsModalElement> {
    'isActive'?: boolean;
    'label'?: string;
    'onModalClose'?: Function;
  }
  interface CrdsRecommendedContent extends JSXBase.HTMLAttributes<HTMLCrdsRecommendedContentElement> {}
  interface CrdsSharedFooter extends JSXBase.HTMLAttributes<HTMLCrdsSharedFooterElement> {
    'env'?: string;
    'src'?: string;
  }
  interface CrdsSharedHeader extends JSXBase.HTMLAttributes<HTMLCrdsSharedHeaderElement> {
    'env'?: string;
    'src'?: string;
  }
  interface CrdsSiteHappenings extends JSXBase.HTMLAttributes<HTMLCrdsSiteHappeningsElement> {}
  interface CrdsSiteSelect extends JSXBase.HTMLAttributes<HTMLCrdsSiteSelectElement> {
    'cardSiteId'?: number;
    'onSiteSet'?: (event: CustomEvent<any>) => void;
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
  interface CrdsTitheChallenge extends JSXBase.HTMLAttributes<HTMLCrdsTitheChallengeElement> {
    'selectedFeeling'?: Response;
  }
  interface CrdsVideo extends JSXBase.HTMLAttributes<HTMLCrdsVideoElement> {
    'active'?: boolean;
    'shadow'?: boolean;
    'theme'?: string;
    'transcript'?: string;
    'youtubeId'?: string;
  }
  interface GiveNav extends JSXBase.HTMLAttributes<HTMLGiveNavElement> {
    'data'?: any;
    'isNavShowing'?: boolean;
  }
  interface GlobalNav extends JSXBase.HTMLAttributes<HTMLGlobalNavElement> {
    'data'?: any;
    'env'?: string;
  }
  interface MainNav extends JSXBase.HTMLAttributes<HTMLMainNavElement> {
    'data'?: any;
    'isNavShowing'?: boolean;
    'promoData'?: string;
  }
  interface MySite extends JSXBase.HTMLAttributes<HTMLMySiteElement> {}
  interface NavCtas extends JSXBase.HTMLAttributes<HTMLNavCtasElement> {
    'data'?: string;
  }
  interface NavSection extends JSXBase.HTMLAttributes<HTMLNavSectionElement> {
    'handleClick'?: Function;
    'isActive'?: boolean;
    'sectionName'?: string;
  }
  interface NavSectionSubnav extends JSXBase.HTMLAttributes<HTMLNavSectionSubnavElement> {
    'data'?: any;
    'handleBackClick'?: Function;
    'isActive'?: boolean;
    'subNavName'?: string;
  }
  interface ProfileNav extends JSXBase.HTMLAttributes<HTMLProfileNavElement> {
    'currentUser'?: any;
    'data'?: any;
    'handleSignOut'?: Function;
    'isNavShowing'?: boolean;
  }

  interface IntrinsicElements {
    'crds-button': CrdsButton;
    'crds-default-card': CrdsDefaultCard;
    'crds-greeting': CrdsGreeting;
    'crds-group-list': CrdsGroupList;
    'crds-heart-button': CrdsHeartButton;
    'crds-icon': CrdsIcon;
    'crds-image': CrdsImage;
    'crds-image-title-cutout': CrdsImageTitleCutout;
    'crds-label': CrdsLabel;
    'crds-media-card': CrdsMediaCard;
    'crds-modal': CrdsModal;
    'crds-recommended-content': CrdsRecommendedContent;
    'crds-shared-footer': CrdsSharedFooter;
    'crds-shared-header': CrdsSharedHeader;
    'crds-site-happenings': CrdsSiteHappenings;
    'crds-site-select': CrdsSiteSelect;
    'crds-snail-trail': CrdsSnailTrail;
    'crds-snail-trail-link': CrdsSnailTrailLink;
    'crds-subscribe': CrdsSubscribe;
    'crds-tithe-challenge': CrdsTitheChallenge;
    'crds-video': CrdsVideo;
    'give-nav': GiveNav;
    'global-nav': GlobalNav;
    'main-nav': MainNav;
    'my-site': MySite;
    'nav-ctas': NavCtas;
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


