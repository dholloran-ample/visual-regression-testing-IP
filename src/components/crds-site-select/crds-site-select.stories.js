import { storiesOf } from '@storybook/polymer';
import { withKnobs, text } from '@storybook/addon-knobs';

const stories = storiesOf('Personalization', module);
stories
  .addDecorator(withKnobs)
  .add('<crds-site-select />', () => {
    const cardSiteId = text('cardSiteId', '');
    const token = text('sessionId', '');
    return `<crds-site-select card-site-id=${cardSiteId} auth-token=${token} ></crds-site-select>`;
  });
