import { Component, Prop, State } from '@stencil/core';
import dig from 'object-dig';
import axios from 'axios';
import Logger from '../../shared/logger';
import Config from '../../shared/config';
import Fragment from 'stencil-fragment';

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
  private links: any = [];

  @Prop({ mutable: true }) private isShowing: boolean;
  @Prop() src: string;
  @State() active: string;

  /**
   * Fires before render...
   */
  public componentWillLoad() {
    this.console = new Logger(this.debug);
    this.config = new Config();
    // this.getRecords();
  }

  /**
   * Returns total number of likes from Contentful
   */
  // public getRecords() {
  //   this.console.log('getRecords()');
  //   this.links = dig(window, 'CRDS', 'navigation') || [];

  //   if (this.links.length > 0 && this.src) {
  //     axios.get(this.src).then(success => {
  //       this.links = dig(success, 'data');
  //     });
  //   }
  // }

  // public renderSections(nav-sections) {
  //   const items = [];
  //   for (const i in nav-sections) {
  //     items.push(
  //       <div>
  //         <crds-header>{nav-sections[i].title}</crds-header>
  //         {this.renderLinks(nav-sections[i].children)}
  //       </div>
  //     );
  //   }
  //   return items;
  // }

  // public renderLinks(children) {
  //   return children.map(child => <crds-link href={dig(child, 'path')}>{dig(child, 'title')}</crds-link>);
  // }

  public navSectionSubnav(id) {
    this.active = id;
  }

  public onClick(e) {
    this.active = e.target.parentElement.parentElement.id;
  }

  /**
   * HTML
   */
  public render() {
    return (
      <Fragment>
        <nav-bar />
        <nav class={'subnavigation-is-showing ' + (this.active === undefined ? '' : this.active)}>
          <div>
            {/* <div>{this.renderSections(this.links)}</div> */}
            <div class="navigation">
              <ul>
                <nav-section id="media" parent={this} onClick={this.onClick}>
                  <h2>Watch, Listen Read</h2>
                  <p>Videos, music, articles and podcasts</p>
                </nav-section>

                <nav-section id="community" parent={this} onClick={this.onClick}>
                  <h2>Find Community</h2>
                  <p>Groups, camps, serve locally and globally, kids</p>
                </nav-section>

                <nav-section id="contact" parent={this} onClick={this.onClick}>
                  <h2>Come Visit</h2>
                  <p>Locations (in person and online)</p>
                </nav-section>

                <nav-section id="support" parent={this} onClick={this.onClick}>
                  <h2>Get Support</h2>
                  <p>Counselors, prayer, life events, contact</p>
                </nav-section>
              </ul>
            </div>

            <div class="subnavigation">
              <nav-section-subnav active={this.active} id="media">
                {/* <a href="" class="back">
                  back
                </a>
                <h2>Watch, Listen Read</h2> */}

                <a href="" class="all">
                  All Media
                </a>

                <h4>Types</h4>
                <ul>
                  <li>
                    <a href="">articles</a>
                  </li>
                  <li>
                    <a href="">Music</a>
                  </li>
                  <li>
                    <a href="">podcasts</a>
                  </li>
                  <li>
                    <a href="">series</a>
                  </li>
                  <li>
                    <a href="">videos</a>
                  </li>
                </ul>

                <h4>Topics</h4>
                <ul>
                  <li>
                    <a href="">Culture</a>
                  </li>
                  <li>
                    <a href="">Self</a>
                  </li>
                  <li>
                    <a href="">work</a>
                  </li>
                  <li>
                    <a href="">money</a>
                  </li>
                  <li>
                    <a href="">relationships</a>
                  </li>
                </ul>

                <h4>Collections</h4>
                <ul>
                  <li>
                    <a href="">community stories</a>
                  </li>
                </ul>
              </nav-section-subnav>
              <nav-section-subnav active={this.active} id="community">
                2
              </nav-section-subnav>
              <nav-section-subnav active={this.active} id="contact">
                3
              </nav-section-subnav>
              <nav-section-subnav active={this.active} id="support">
                4
              </nav-section-subnav>
            </div>

            <nav-ctas />
          </div>
        </nav>
      </Fragment>
    );
  }
}
