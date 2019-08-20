import { Component, Prop, Listen, h } from '@stencil/core';

@Component({
  tag: 'profile-nav',
  styleUrl: 'profile-nav.scss',
  shadow: true
})
export class ProfileMenu {
  @Prop() config: any;
  @Prop() currentUser: any; //TODO should this have a type or have default val?
  @Prop() onSignOut: Function;
  @Prop() profileNavIsShowing: boolean = true;
  @Prop() data: JSON;

  //TODO is this ever used?
  envUrl(path) {
    return `${process.env.CRDS_BASE_URL}${path}`;
  }

  handleClick(e) { //TODO would this be better specifically "handle signout"?
    console.log(`DEBUG profile nave typeof onSignOut is ${typeof this.onSignOut}`)
    if (typeof this.onSignOut == 'function') {
      this.onSignOut();
      e.preventDefault();
    }
  }

  renderSections = payload => {
    let topLevel = { value: false }; //TODO should topLevel just be a boolean?

    const title = unescape(payload.title.replace('%user_name%', this.currentUser.name || ''));

    return (
      <div>
        <h2> {title} </h2>
        {payload.children.map(child => this.renderChild(child, topLevel))}
      </div>
    );
  };

  renderChild = (child, topLevel) => {
    topLevel.value = topLevel.value || typeof child == 'string'; //TODO does this need to be evaluated here or below?

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
            <nav-link href={el.href} automation-id={el['automation-id']} onSignOutClicked={this.handleClick.bind(this)}>
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
