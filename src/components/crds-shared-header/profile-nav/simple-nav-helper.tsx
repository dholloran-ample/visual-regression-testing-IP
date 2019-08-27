import { h } from '@stencil/core';

export class SimpleNavHelper {
  private handleSignOut: Function

  constructor(signOutCB=undefined){
    this.handleSignOut = signOutCB;
  }

  renderSections(data, menuTitle) {
    let isTopLevelClass = true;

    return (
      <div>
        <h2> {menuTitle} </h2>
        {Array.isArray(data.children) && data.children.map(child => {
          let isSubHeader = typeof child === 'string'
          let element = isSubHeader ? this.renderSubHeader(child) : this.maybeRenderList(child, isTopLevelClass);
          isTopLevelClass = !isSubHeader; //Toggle if next rendered element should be top-level

          return element && (
            <div style={{ padding: '0' }}>
              {element}
            </div>
          );
        })}
      </div>
    );
  };

  renderSubHeader(data){
    return <h4>{data}</h4>
  }

  maybeRenderList(data, isTopLevel) {
    if (!Array.isArray(data))
      return;

    const listElements = data.map(child => this.maybeRenderListEntry(child, isTopLevel)).filter(entry => entry);
    return listElements.length > 0 && (
      <ul>
        {listElements}
      </ul>)
  }

  maybeRenderListEntry(data, isTopLevel) {
    return this.isObjectTruthyNonArray(data) && (
      <li class={this.topLevelClassValue(data, isTopLevel)}>
        <nav-link href={data.href} automationId={data['automation-id']} handleSignOut={this.handleSignOut}>
          {data.title}
        </nav-link>
      </li>
    );
  }

   //data.top_level value overrides isTopLevel
   private topLevelClassValue(data, calcTopLevel) {
    const isTopLevel =  typeof data.top_level === 'boolean' ?
    data.top_level : calcTopLevel;

    return isTopLevel ? 'top-level' : '';
  }

  //TODO this may be valuable as a Util function
  isObjectTruthyNonArray(maybeObject) {
    return maybeObject && typeof maybeObject === 'object' && !Array.isArray(maybeObject);
  }
}