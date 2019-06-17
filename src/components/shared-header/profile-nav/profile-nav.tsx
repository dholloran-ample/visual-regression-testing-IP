import { Component, Prop, Listen } from '@stencil/core';

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

  @Listen('click')
  handleClick(event) {
    event.stopPropagation();
  }

  renderSections = payload => {
    let topLevel = false;

    const title = payload.title.replace('%user_name%', this.currentUser.name.split(' ')[0]);

    return (
      <div>
        <h2> {title} </h2>
        {payload.children.map(child => {
          topLevel = topLevel || typeof child == 'string';

          return (
            <div style={{ padding: '0' }}>
              {typeof child == 'string' && <h4>{child}</h4>}
              {typeof child != 'string' && (
                <ul>
                  {child.map(el => {
                    if (typeof el != 'string')
                      return (
                        <li class={topLevel ? '' : 'top-level'}>
                          <a
                            href={el.path}
                            data-automation-id={el['automation-id']}
                            onClick={e => {
                              if (el.title == 'Sign out') this.onSignOut(e);
                            }}
                          >
                            {' '}
                            {el.title}
                          </a>
                        </li>
                      );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    );
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
