import { Component, Prop } from '@stencil/core';
import Fragment from 'stencil-fragment';
import * as footerData from '../../data/footer.json';

@Component({
  tag: 'shared-footer',
  styleUrl: 'shared-footer.scss',
  shadow: true
})

export class SharedFooter {

  private nav: any = footerData.default;

  private renderElement(el) {
    if (el.path) {
      let target = ''
      if (el.path.match(/:\/\//)) { target = '_blank' }
      if (el.img) {
        return <a target={target} href={el.path}><img src={el.img} alt={el.title} title={el.title} /></a>
      } else {
        return <a target={target} href={el.path}>{el.title}</a>
      }
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
          <div class={column.class}>
            <h5>{this.renderElement(column)}</h5>
            {this.renderGroups(column.children)}
          </div>
        )}
        </div>
      </footer>
    );
  }
}
