import { Component, Prop, Listen, h } from '@stencil/core';

@Component({
  tag: 'give-nav',
  styleUrl: 'profile-nav.scss',
  shadow: true
})
export class GiveMenu {
  @Prop() giveNavIsShowing: boolean = true;
  @Prop() data: JSON;

  @Listen('click')
  handleClick(event) {
    console.log(`handling click in give-nav. Current Target was: ${JSON.stringify(event.currentTarget)}. Target was: ${JSON.stringify(event.target)}. Type was ${JSON.stringify(event.type)}`)
    event.stopPropagation();
  }

  private isObjectTruthyNonArray(maybeObject) {
    return maybeObject && typeof maybeObject === 'object' && !Array.isArray(maybeObject);
  }

  maybeRenderListEntry(data, isTopLevel) {
    //data.top_level value overrides isTopLevel
    const isReallyTopLevel = () => {
      return typeof data.top_level === 'boolean' ?
        data.top_level : isTopLevel;
    };

    return this.isObjectTruthyNonArray(data) && (
      <li class={isReallyTopLevel() ? 'top-level' : ''}>
        <a href={data.href} data-automation-id={data['automation-id']}>
          {data.title}
        </a>
      </li>
    );
  }

  maybeRenderList(data, isTopLevel) {
    if (!Array.isArray(data))
      return false;

    const listElements = data.map(child => this.maybeRenderListEntry(child, isTopLevel)).filter(entry => entry);
    return listElements.length > 0 && (
    <ul>
      {listElements}
    </ul>)
  }

  renderSections(giveNavData) {
    let makeNextListTopLevel = true;

    return (
      <div>
        <h2> {giveNavData.title} </h2>
        {giveNavData.children && giveNavData.children.map(child => {
          let isSubHeader = typeof child === 'string'
          let renderThis = isSubHeader ? <h4>{child}</h4> : this.maybeRenderList(child, makeNextListTopLevel);
          makeNextListTopLevel = !isSubHeader;

          return renderThis && (
            <div style={{ padding: '0' }}>
              {renderThis}
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    if(!this.giveNavIsShowing || !this.isObjectTruthyNonArray(this.data)) return null;
    return (
      <div class="give-nav" style={{ backgroundImage: `url(${(this.data as any).background_img})` }}>
        {this.renderSections(this.data)}
      </div>
    );
  }
}