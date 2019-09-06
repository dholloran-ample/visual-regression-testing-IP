import { Component, Prop, h, State } from '@stencil/core';
import { Utils } from '../../../shared/utils';

@Component({
  tag: 'main-nav',
  styleUrl: 'main-nav.scss',
  shadow: true
})
export class MainMenu {
  @Prop() isNavShowing: boolean = true;
  @Prop() data: any = [];
  @Prop() promoData: string;

  @State() activeSection: string;

  handleBackClick(event) {
    event.preventDefault();
    this.activeSection = null;
  }

  protected handleSectionClick(event, sectionName) {
    event.preventDefault();
    this.activeSection = sectionName;
  }

  maybeRenderSections() {
    const sectionList = this.data.map(section => {
      const sectionName = Utils.parameterize(section.title);
      return (
        <nav-section sectionName={sectionName} handleClick={this.handleSectionClick.bind(this)} isActive={this.activeSection === sectionName}>
          <h2>{section.title}</h2>
          <p>{section.description}</p>
        </nav-section>
      );
    });

    return sectionList.length > 0 && (<ul>{sectionList}</ul>);
  }

  renderSubNavOrCtas() {
    return this.activeSection ?
      (
        <div class="subnavigation">
          {this.maybeRenderActiveSubNav()}
        </div>
      ) : (
        <nav-ctas data={this.promoData} />
      )
  }

  maybeRenderActiveSubNav() {
    const activeSectionData = this.data.find((section) => {
      section.subNavName = Utils.parameterize(section.title);
      return section.subNavName === this.activeSection;
    });

    return activeSectionData &&
      (<nav-section-subnav subNavName={activeSectionData.subNavName}
        data={activeSectionData}
        handleBackClick={this.handleBackClick.bind(this)}
        isActive={true}>
      </nav-section-subnav>)
  }

  getNavClass() {
    let classes = [];
    if (this.isNavShowing) classes.push('is-showing');
    if (this.activeSection) classes.push(`section--${this.activeSection}`);
    return classes.join(' ');
  }

  render() {
    if (!this.isNavShowing || !Array.isArray(this.data)) return null;

    return (
      <nav class={this.getNavClass()} onClick={event => event.stopPropagation()}>
          <div class="content">
            <div class="navigation">
              {this.maybeRenderSections()}
            </div>
            {this.renderSubNavOrCtas()}
          </div>
        </nav>
    )
  }
}