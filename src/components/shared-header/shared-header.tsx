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

  @Prop({ mutable: true }) private isShowing: boolean;
  @Prop() src: string;
  @State() active: string;

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
      return (
        <nav-section id={Utils.parameterize(section.title)} onActivate={this.onClick.bind(this)}>
          <h2>{section.title}</h2>
          <p>{section.description}</p>
        </nav-section>
      );
    });
  }

  /**
   * Returns all subnav elements
   * @param payload
   */
  private renderSubnavs(payload) {
    const sections = payload.map(section => {
      return (
        <nav-section-subnav active={this.active} id={Utils.parameterize(section.title)}>
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
              <a href={link.href}>{link.title}</a>
            </li>
          );
        });
        return <ul>{listItems}</ul>;
      }
    });
  }

  /**
   * HTML
   */
  public render() {
    return (
      <Fragment>
        <nav-bar />
        <nav class={this.active === undefined ? '' : `section--${this.active}`}>
          <div class="gradient" />
          <div class="content">
            <div class="navigation">
              <ul>{this.renderSections(this.payload)}</ul>
            </div>
            {this.renderSubnavs(this.payload)}
            <nav-ctas />
          </div>
        </nav>
      </Fragment>
    );
  }
}
