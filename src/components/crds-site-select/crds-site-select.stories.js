import { storiesOf } from '@storybook/polymer';
import { withKnobs, text } from '@storybook/addon-knobs';

const stories = storiesOf('Personalization', module);
stories
  .addDecorator(withKnobs)
  .add('<crds-site-select />', () => {
    const siteId = text('siteId', '');
    const token = text('sessionId', '');
    return `<crds-site-select site-id=${siteId} auth-token=${token} ></crds-site-select>`;
  });
