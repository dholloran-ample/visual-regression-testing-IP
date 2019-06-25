import { Component, Element, Prop, State } from '@stencil/core';
import Fragment from 'stencil-fragment';
import axios from 'axios';

@Component({
  tag: 'shared-footer',
  styleUrl: 'shared-footer.scss',
  shadow: true
})
export class SharedFooter {
  @Prop() src: string;
  @Prop() env: string = 'prod';

  @State() data: Array<any> = [];

  @Element() element: HTMLElement;

  componentWillLoad() {
    const url = this.src || `https://crds-data.netlify.com/shared-footer/${this.env}.json`;
    axios.get(url).then(response => (this.data = response.data));
  }

  componentDidLoad() {
    this.element.parentElement.classList.add('shared-footer');
    this.element.parentElement.classList.remove('shared-footer-skeleton');
  }

  private renderElement(el: any) {
    if (!el.href) return el.title;
    let attrs = {
      target: el.href.match(/:\/\//) ? '_blank' : '',
      href: el.href
    };
    if (el['automation-id']) attrs['data-automation-id'] = el['automation-id'];
    return <a {...attrs}>{el.img ? <img src={el.img} alt={el.title} title={el.title} /> : el.title}</a>;
  }

  private renderGroups(groups) {
    const groupMarkup = groups.map(group => {
      if (!group.children) return <li>{this.renderElement(group)}</li>;
      return (
        <Fragment>
          <p>{group.title}</p>
          <ul>
            {group.children.map(el => (
              <li>{this.renderElement(el)}</li>
            ))}
          </ul>
        </Fragment>
      );
    });
    const Tag = groups.filter(g => g.children).length > 0 ? 'Fragment' : 'ul';
    return <Tag>{groupMarkup}</Tag>;
  }

  private renderColumns() {
    return this.data.map(column => (
      <div class={column.class}>
        <h5>{this.renderElement(column)}</h5>
        {this.renderGroups(column.children)}
      </div>
    ));
  }

  public render() {
    if (this.data.length === 0) return null;
    return (
      <footer>
        <div class="container">{this.renderColumns()}</div>
      </footer>
    );
  }
}
