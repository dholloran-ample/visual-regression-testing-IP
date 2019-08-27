import { Component, Prop, h, State } from '@stencil/core';
import { Utils } from '../../../shared/utils';
import Fragment from '../../../shared/fragment'; //TODO what are these needed for?
// import { SimpleNavHelper } from './simple-nav-helper';

@Component({
  tag: 'main-nav'
  //should default to stylesheet of shared-header?
})
export class MainMenu {
  //TODO need to add these to component interface class
  @Prop() mainNavIsShowing: boolean = true;
  @Prop() data: JSON;
  @Prop() promoData: JSON;

  @State() active: string;

  navClasses() {
    let classes = [];
    if (this.mainNavIsShowing) classes.push('is-showing');
    if (this.active) classes.push(`section--${this.active}`);
    return classes.join(' ');
  }

  handleBackClick(event) {
    event.preventDefault();
    this.active = null;
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

  //TODO only pass in parts of nav we need
  render() {
    //TODO want object validation but not simple nav unless needed
    //if (!this.mainNavIsShowing || !this.simpleNav.isObjectTruthyNonArray(this.data)) return null;
    if (!this.mainNavIsShowing) return null;

    return (
    <nav class={this.navClasses()} onClick={event => event.stopPropagation()}>
          <div class="content">
            <div class="navigation">
              <ul>{this.renderSections(this.data)}</ul>
            </div>
            {this.renderSubnavs(this.data)}
            <nav-ctas active={this.active} data={JSON.stringify(this.promoData)} />
          </div>
        </nav>
        )
  }
}