import { storiesOf } from '@storybook/polymer';
import { withKnobs, text } from '@storybook/addon-knobs';
import names from './crds-icon-names.js';

const stories = storiesOf('Icons', module);

stories
  .addDecorator(withKnobs)
  .add('Static Icon', () => {

      const name = text('name','media-article');
      const color = text('color','gold');
      const size = text('size','12');

    return `
        <crds-icon name="${name}" size="${size}" color="${color}">

        </crds-icon>
    `;
  })
  .add('All Icons', () => {
    const icons = names.map(el => {
      const name = text('name', el);
      const color = text('color','gold');
      const size = text('size','12');

      return `
      <crds-icon name="${name}" size="${size}" color="${color}">

      </crds-icon>
      `
    })
    return `
    <div style="display: flex; max-width: 100%">
        ${icons.join("")}
    </div>
    `;
  })