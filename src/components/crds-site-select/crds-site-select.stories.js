import { storiesOf } from '@storybook/polymer';
import { withKnobs, text } from '@storybook/addon-knobs';

const stories = storiesOf('Personalization', module);
stories
  .addDecorator(withKnobs)
  .addParameters({ percy: { skip: true } })
  .addParameters({ percy: { skip: true } })
  .add('crds-site-select', () => {
    const cardSiteId = text('cardSiteId', '');
    return `<crds-site-select card-site-id=${cardSiteId}></crds-site-select>`;
  });
