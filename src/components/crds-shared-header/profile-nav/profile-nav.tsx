import { Component, Prop, Listen, h } from '@stencil/core';

@Component({
  tag: 'profile-nav',
  styleUrl: 'profile-nav.scss',
  shadow: true
})
export class ProfileMenu {
  @Prop() config: any;
  @Prop() currentUser: any;
  @Prop() onSignOut: Function;
  @Prop() profileNavIsShowing: boolean = true;
  @Prop() data: JSON;

  envUrl(path) {
    return `${process.env.CRDS_BASE_URL}${path}`;
  }

  handleClick(e) {
    if (typeof this.onSignOut == 'function') {
      this.onSignOut();
      e.preventDefault();
    }
  }

  renderSections = payload => {
    let topLevel = { value: false };

    const title = unescape(payload.title.replace('%user_name%', this.currentUser.name || ''));

    return (
      <div>
        <h2> {title} </h2>
        {payload.children.map(child => this.renderChild(child, topLevel))}
      </div>
    );
  };

  renderChild = (child, topLevel) => {
    topLevel.value = topLevel.value || typeof child == 'string';

    return (
      <div style={{ padding: '0' }}>
        {typeof child == 'string' && <h4>{child}</h4>}
        {typeof child != 'string' && <ul>{this.renderChildHTML(child, topLevel)}</ul>}
      </div>
    );
  };

  renderChildHTML = (child, topLevel) => {
    return child.map(el => {
      if (typeof el != 'string')
        return (
          <li class={topLevel.value ? '' : 'top-level'}>
            <nav-link href={el.href} automation-id={el['automation-id']} onSignOutClicked={e => this.handleClick(e)}>
              {el.title}
            </nav-link>
          </li>
        );
    });
  };

  render() {
    if (!this.profileNavIsShowing) return null;

    return (
      <div class="profile-nav">
        <div
          class="profile-nav-img"
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%),url('${
              this.currentUser.avatarUrl
            }')`
          }}
        />
        <div>{this.renderSections(this.data)}</div>
      </div>
    );
  }
}
