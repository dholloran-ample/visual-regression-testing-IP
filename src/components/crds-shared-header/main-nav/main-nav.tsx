import { Component, Prop, h, State } from '@stencil/core';
import { Utils } from '../../../shared/utils';
import { SimpleNavHelper } from '../profile-nav/simple-nav-helper';

@Component({
  tag: 'main-nav',
  styleUrl: 'main-nav.scss',
  shadow: true
})
export class MainMenu {
  @Prop() isNavShowing: boolean = true;
  @Prop() data: JSON; //TODO pass in only nav data?
  @Prop() promoData: string;

  @State() activeSection: string;
  private simpleNav: SimpleNavHelper;

  constructor() {
    this.simpleNav = new SimpleNavHelper();
    this.simpleNav.formatMenuEntry = (element) => {return element}; //Don't add extra formatting to entries
  }

  navClasses() {
    let classes = [];
    if (this.isNavShowing) classes.push('is-showing');
    if (this.activeSection) classes.push(`section--${this.activeSection}`);
    return classes.join(' ');
  }

  handleBackClick(event) {
    event.preventDefault();
    this.activeSection = null;
  }

   /**
   * Section handleSectionClick event handler
   * @param event Event
   * @param sectionName string
   */
  protected handleSectionClick(event, sectionName) {
    event.preventDefault();
    this.activeSection = sectionName;
  }

   /**
   * Renders all sections from payload
   */
  private maybeRenderSections(data) {
    if(!Array.isArray(data)) return;

    return data.map(section => {
      const sectionName = Utils.parameterize(section.title);
      return (
        <nav-section sectionName={sectionName} handleClick={this.handleSectionClick.bind(this)} isActive={this.activeSection === sectionName}>
          <h2>{section.title}</h2>
          <p>{section.description}</p>
        </nav-section>
      );
    });
  }

  maybeRenderActiveSubNav(data) {
    if (!Array.isArray(data)) return;

    const activeSectionData = data.find((section) => {
      section.subNavName = Utils.parameterize(section.title);
      return section.subNavName === this.activeSection;
    });

    return activeSectionData &&
      (<nav-section-subnav subNavName={activeSectionData.subNavName} handleBackClick={this.handleBackClick.bind(this)} isActive={true}>
        {this.simpleNav.formatMenuTitle(activeSectionData.title)}
        {this.simpleNav.maybeRenderNavEntries(activeSectionData.children)}
      </nav-section-subnav>)
  }

  renderSubNavOrCtas(data) {
    return this.activeSection ?
      (
        <div class="subnavigation">
          {this.maybeRenderActiveSubNav(data)}
        </div>
      ) : (
        <nav-ctas data={this.promoData} />
      )
  }

  render() {
    if (!this.isNavShowing || !Array.isArray(this.data)) return null;

    return (
      <nav class={this.navClasses()} onClick={event => event.stopPropagation()}>
          <div class="content">
            <div class="navigation">
              <ul>{this.maybeRenderSections(this.data)}</ul>
            </div>
            {this.renderSubNavOrCtas(this.data)}
          </div>
        </nav>
    )
  }
}