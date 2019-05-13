import { Component, Prop, State } from '@stencil/core';
import Fragment from 'stencil-fragment';
import dig from 'object-dig';
import axios from 'axios';
import { Logger } from '../../shared/logger';
import { Config } from '../../shared/config';
import { Utils } from '../../shared/utils';

@Component({
  tag: 'shared-header',
  styleUrl: 'shared-header.scss',
  shadow: true
})
export class SharedHeader {
  /**
   * Print log messages?
   */
  private debug: boolean = false;
  private console: Logger;
  private config: Config;
  private payload: any = [];

  @Prop() src: string;

  @State() active: string;
  @State() isShowing: boolean = false;

  /**
   * Fires before render...
   */
  public componentWillLoad() {
    this.console = new Logger(this.debug);
    this.config = new Config();
    this.getPayload();
  }

  /**
   * Returns total number of likes from Contentful
   */
  private getPayload() {
    this.console.log('getRecords()');
    this.payload = dig(window, 'CRDS', 'navigation') || [];
    if (this.payload.length > 0 && this.src) {
      axios.get(this.src).then(success => {
        this.payload = dig(success, 'data');
      });
    }
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
    return payload.map(section => {
      const id = Utils.parameterize(section.title);
      return (
        <nav-section id={id} onActivate={this.onClick.bind(this)} isActive={this.active == id}>
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
  private renderSubnavs(payload) {
    const sections = payload.map(section => {
      return (
        <nav-section-subnav
          onBack={this.handleBackClick.bind(this)}
          active={this.active}
          id={Utils.parameterize(section.title)}
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
    return section.children.map(child => {
      if (typeof child == 'string') {
        return <h4>{child}</h4>;
      } else {
        const listItems = child.map(link => {
          return (
            <li>
              <a href={link.href || '#'}>{link.title}</a>
            </li>
          );
        });
        return <ul>{listItems}</ul>;
      }
    });
  }

  toggleMenu(event) {
    event.preventDefault();
    this.isShowing = !this.isShowing;
    return true;
  }

  navClasses() {
    let classes = [];
    if (this.isShowing) classes.push('is-showing');
    if (this.active) classes.push(`section--${this.active}`);
    return classes.join(' ');
  }

  navCloseClasses() {
    let classes = ['close'];
    if (this.isShowing && !this.active) classes.push('is-showing');
    return classes.join(' ');
  }

  /**
   * HTML
   */
  public render() {
    let close =
      '<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="times" class="svg-inline--fa fa-times fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path></svg>';

    return (
      <Fragment>
        <nav-bar navIsShowing={this.isShowing} clickHandler={this.toggleMenu.bind(this)} />
        <nav class={this.navClasses()}>
          <div class="gradient" />
          <div class="content">
            <div class="navigation">
              <ul>{this.renderSections(this.payload)}</ul>
            </div>
            {this.renderSubnavs(this.payload)}
            <nav-ctas active={this.active} />
          </div>
        </nav>
        <div class={this.navCloseClasses()} innerHTML={close} />
      </Fragment>
    );
  }
}
