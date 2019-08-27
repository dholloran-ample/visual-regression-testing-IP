import { Component, Element, Prop, State, Listen, h } from '@stencil/core';
import axios from 'axios';
import { Utils } from '../../shared/utils';
import Fragment from '../../shared/fragment';

import { testPayload } from './test_sh_data';//TODO test data


@Component({
  tag: 'crds-shared-header',
  styleUrl: 'crds-shared-header.scss',
  shadow: true
})
export class SharedHeader {
  @Prop() src: string;
  @Prop() env: string = 'prod';

  @State() active: string;
  @State() mainNavIsShowing: boolean = false;
  @State() profileNavIsShowing: boolean = false;
  @State() giveNavIsShowing: boolean = false;
  @State() data: any = []; //TODO should this be object?

  @Element() element: HTMLElement;

  /**
   * Fires before render...
   */

  public componentWillLoad() {
    this.data = testPayload;
//TODO below is real
    // const url = this.src || `https://crds-data.netlify.com/shared-header/${this.env}.json`;
    // return axios.get(url).then(response => (this.data = response.data)).catch(err => console.error(err));
  }

  componentDidLoad() {
    this.element.parentElement.classList.add('shared-header');
    this.element.parentElement.classList.remove('shared-header-skeleton');
  }

  /**
   * Section onClick event handler
   * @param e Event
   * @param id string
   */
  protected onClick(e, id) {
    e.preventDefault();
    this.active = id;
  }

  /**
   * Renders all sections from payload
   */
  private renderSections(payload) {
    if (!payload) return null;
    return payload.map(section => {
      const id = Utils.parameterize(section.title);
      return (
        <nav-section slug={id} onActivate={this.onClick.bind(this)} isActive={this.active == id}>
          <h2>{section.title}</h2>
          <p>{section.description}</p>
        </nav-section>
      );
    });
  }

  handleBackClick(event) {
    event.preventDefault();
    this.active = null;
  }
  /**
   * Returns all subnav elements
   * @param payload
   */
  // TODO: refactor renderSubnavs to work with
  // nav-section-subnav, profile nav, and give nav
  // ------------------------------------------------------

  private renderSubnavs(payload) {
    if (!payload) return null;
    const sections = payload.map(section => {
      return (
        <nav-section-subnav
          onBack={this.handleBackClick.bind(this)}
          active={this.active}
          slug={Utils.parameterize(section.title)}
        >
          {this.renderChildren(section)}
        </nav-section-subnav>
      );
    });
    return <div class="subnavigation">{sections}</div>;
  }

  /**
   * Returns header or unordered list
   * @param section
   */

  private renderChildren(section) {
    const sectionChildren = section.children.map(child => {
      if (typeof child == 'string') {
        return <h4>{child}</h4>;
      } else {
        const listItems = child.map(link => {
          return (
            <li class={link.top_level ? 'top-level' : null}>
              <a href={link.href || '#'} data-automation-id={link['automation-id']}>
                {link.title}
              </a>
            </li>
          );
        });

        return <ul>{listItems}</ul>;
      }
    });

    return (
      <Fragment>
        <h2>{section.title}</h2>
        {sectionChildren}
      </Fragment>
    );
  }

  toggleMenu(event, navType) {
    event.preventDefault();
    event.stopPropagation();

    if (navType == 'main-nav') {
      this.giveNavIsShowing = false;
      this.mainNavIsShowing = !this.mainNavIsShowing;
      this.profileNavIsShowing = false;
      if (this.mainNavIsShowing) {
        document.body.setAttribute('style', 'overflow: hidden; position: absolute; width: 100vw;');
      } else {
        document.body.setAttribute('style', 'overflow: scroll;');
      }
    } else if (navType == 'profile-nav') {
      this.giveNavIsShowing = false;
      this.mainNavIsShowing = false;
      this.profileNavIsShowing = !this.profileNavIsShowing;
      return this.profileNavIsShowing
        ? document.body.setAttribute('style', 'overflow: hidden; position: absolute; width: 100vw;')
        : document.body.setAttribute('style', 'overflow: scroll;');
    } else if (navType == 'give-nav') {
      this.giveNavIsShowing = !this.giveNavIsShowing;
      this.mainNavIsShowing = false;
      this.profileNavIsShowing = false;
      return this.giveNavIsShowing
        ? document.body.setAttribute('style', 'overflow: hidden; position: absolute; width: 100vw;')
        : document.body.setAttribute('style', 'overflow: scroll; ');
    }
  }

  closeMenus(event) {
    event.preventDefault();
    this.giveNavIsShowing = false;
    this.mainNavIsShowing = false;
    this.profileNavIsShowing = false;
    return document.body.setAttribute('style', 'overflow: scroll;');
  }

  navClasses() {
    let classes = [];
    if (this.mainNavIsShowing) classes.push('is-showing');
    if (this.active) classes.push(`section--${this.active}`);
    if (this.profileNavIsShowing || this.giveNavIsShowing) classes = [];
    return classes.join(' ');
  }

  navCloseClasses() {
    let classes = ['close'];
    if (this.mainNavIsShowing || this.profileNavIsShowing || this.giveNavIsShowing) classes.push('is-showing');
    return classes.join(' ');
  }

  @Listen('click', { target: 'window' })
  handleScroll(event) {
    if (this.mainNavIsShowing || this.giveNavIsShowing || this.profileNavIsShowing) {
      return document.body.setAttribute('style', 'overflow: scroll;'), this.closeMenus(event);
    }
  }

  /**
   * HTML
   */
  public render() {
    let close =
      '<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="times" class="svg-inline--fa fa-times fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path></svg>';
    return (
      <Fragment>
        <global-nav
          mainNavIsShowing={this.mainNavIsShowing}
          profileNavIsShowing={this.profileNavIsShowing}
          giveNavIsShowing={this.giveNavIsShowing}
          navClickHandler={this.toggleMenu.bind(this)}
          giveData={this.data.give}
          profileData={this.data.profile}
          config={this.data.config}
          env={this.env}
        />
        <nav class={this.navClasses()} onClick={event => event.stopPropagation()}>
          <div class="content">
            <div class="navigation">
              <ul>{this.renderSections(this.data.nav)}</ul>
            </div>
            {this.renderSubnavs(this.data.nav)}
            <nav-ctas active={this.active} data={this.data.promos} />
          </div>
        </nav>
        <div class={this.navCloseClasses()}>
          <div class="close-icon" innerHTML={close} onClick={this.closeMenus.bind(this)} />
        </div>
      </Fragment>
    );
  }
}
