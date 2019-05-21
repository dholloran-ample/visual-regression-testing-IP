import { Component, Prop } from '@stencil/core';
import Fragment from 'stencil-fragment';

@Component({
  tag: 'shared-footer',
  styleUrl: 'shared-footer.scss',
  shadow: true
})

export class SharedFooter {

  // TODO: Move this elsewhere
  private nav: any = [
    {
      "title": "One Church, Many Locations",
      "path": "/locations/",
      "children": [
        {
          "title": "Cincinnati Area",
          "children": [
            {
              "title": "East Side",
              "path": "/eastside/"
            },
            {
              "title": "Florence ",
              "path": "/florence/"
            },
            {
              "title": "Mason ",
              "path": "/mason/"
            },
            {
              "title": "Oakley",
              "path": "/oakley/"
            },
            {
              "title": "Oxford ",
              "path": "/oxford/"
            },
            {
              "title": "Uptown",
              "path": "/uptown/"
            },
            {
              "title": "West Side",
              "path": "/westside/"
            }
          ]
        },
        {
          "title": "Central Kentucky Area",
          "children": [
            {
              "title": "Lexington",
              "path": "/lexington/"
            },
            {
              "title": "Downtown Lexington",
              "path": "/downtownlex/"
            },
            {
              "title": "Georgetown",
              "path": "/georgetown/"
            },
            {
              "title": "Richmond",
              "path": "/richmond/"
            }
          ]
        },
        {
          "children": [
            {
              "title": "Anywhere",
              "path": "/live/"
            },
            {
              "title": "Cleveland",
              "path": "/cleveland/"
            },
            {
              "title": "Columbus",
              "path": "/columbus/"
            },
            {
              "title": "Dayton",
              "path": "/dayton/"
            },
          ]
        }
      ]
    },
    {
      "title": "I’M IN Campaign",
      "path": "http://imincampaign.net/",
      "children": [
        {
          "title": "I'M IN questions",
          "path": "mailto:campaign@crossroads.net"
        },
        {
          "title": "Campaign Status",
          "path": "/leaveyourmark"
        },
      ]
    },
    {
      "title": "Contact",
      "children": [
        {
          "title": "Prayer Requests",
          "path": "/prayer/"
        },
        {
          "title": "Share Your Story",
          "path": "/shareyourstory/"
        },
        {
          "title": "Contact Us",
          "path": "/contactus/"
        },
        {
          "title": "Privacy Policy",
          "path": "/privacypolicy/"
        }
      ]
    },
    {
      "title": "Resources",
      "children": [
        {
          "title": "In The News",
          "path": "/inthenews/"
        },
        {
          "title": "Church Resources",
          "path": "/churchresources/"
        }
      ]
    }
  ];

  private renderElement(el) {
    if (el.path) {
      let target = ''
      if (el.path.match(/:\/\//)) { target = '_blank' }
      return <a target={target} href={el.path}>{el.title}</a>
    } else {
      return el.title
    }
  }

  private renderGroups(groups) {
    let hasChildren = false
    const groupMarkup = groups.map(group => {
      if (group.children) {
        hasChildren = true
        return (
          <fragment>
            <p>{group.title}</p>
            <ul>
              {group.children.map(el => <li>{this.renderElement(el)}</li>)}
            </ul>
          </fragment>
        )
      } else {
        return <li>{this.renderElement(group)}</li>
      }
    });
    if (hasChildren) {
      return groupMarkup
    } else {
      return <ul>{groupMarkup}</ul>
    }
  }

  public render() {
    return (
      <footer>
        <div class="container">
        {this.nav.map((column) =>
          <div>
            <h5>{this.renderElement(column)}</h5>
            {this.renderGroups(column.children)}
          </div>
        )}

          <div class="social-icons">
            <a href="https://twitter.com/crdschurch/" target="_blank" class="text-center"><img src="//d1tmclqz61gqwd.cloudfront.net/images/twitter.svg" alt="twitter account" title="twitter account" /></a>
            <a href="https://www.facebook.com/crdschurch/?_rdr=p" target="_blank" class="text-center"> <img src="//d1tmclqz61gqwd.cloudfront.net/images/facebook.svg" alt="facebook account" title="facebook account" /></a>
            <a href="https://www.youtube.com/user/crdschurch" target="_blank" class="text-center"> <img src="//d1tmclqz61gqwd.cloudfront.net/images/youtube.svg" alt="youtube account" title="youtube account" /></a>
            <a href="https://www.instagram.com/crdschurch/" target="_blank" class="text-center"> <img src="//d1tmclqz61gqwd.cloudfront.net/images/instagram.svg" alt="instagram account" title="instagram account" /></a>
          </div>
        </div>
      </footer>
    );
  }
}
