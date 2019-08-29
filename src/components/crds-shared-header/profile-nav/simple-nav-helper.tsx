import { h } from '@stencil/core';

export class SimpleNavHelper {
  private handleSignOut: Function

  constructor(signOutCB?: Function) {
    this.handleSignOut = signOutCB;
  }

  renderNav(data, menuTitle) {
    return (
      <div>
        {this.formatMenuTitle(menuTitle)}
        {this.maybeRenderNavEntries(data.children)}
      </div>
    );
  };

  formatMenuTitle(title) {
    return <h2>{title}</h2>;
  }

  formatMenuEntry(element) {
    return (<div style={{ padding: '0' }}>
        {element}
      </div>
    );
  }

  formatSubHeader(header) {
    return <h4>{header}</h4>
  }

  formatList(listElements) {
    return (<ul>
      {listElements}
    </ul>)
  }

  formatListEntry(data, classValue) {
    return (<li class={classValue}>
      <nav-link href={data.href} automationId={data['automation-id']} handleSignOut={this.handleSignOut}>
        {data.title}
      </nav-link>
    </li>)
  }

  maybeRenderNavEntries(data){
    if (!Array.isArray(data)) return;

      let isTopLevelClass = true;

      const menuElements = data.map(child => {
        let isSubHeader = typeof child === 'string'
        let element = isSubHeader ? this.formatSubHeader(child) : this.maybeRenderList(child, isTopLevelClass);
        isTopLevelClass = !isSubHeader; //Toggle if next rendered element should be top-level
        return this.formatMenuEntry(element);
      })

      return menuElements.length > 0 && menuElements;
  }

  maybeRenderList(data, isTopLevel) {
    if (!Array.isArray(data)) return;

    const listElements = data.map(child => this.maybeRenderListEntry(child, isTopLevel)).filter(entry => entry);
    return listElements.length > 0 && this.formatList(listElements);
  }

  maybeRenderListEntry(data, isTopLevel) {
    return this.isObjectTruthyNonArray(data) &&
      this.formatListEntry(data, this.topLevelClassValue(data, isTopLevel));
  }

  private topLevelClassValue(data, isTopLevel) {
    const topLevel = typeof data.top_level === 'boolean' ?
      data.top_level : isTopLevel;

    return topLevel ? 'top-level' : '';
  }

  //TODO this may be valuable as a Util function
  isObjectTruthyNonArray(maybeObject) {
    return maybeObject && typeof maybeObject === 'object' && !Array.isArray(maybeObject);
  }
}