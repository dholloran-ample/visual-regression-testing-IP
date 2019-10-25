import { storiesOf } from '@storybook/polymer';
import { withKnobs, text } from '@storybook/addon-knobs';

const stories = storiesOf('Personalization', module);
stories
  .addDecorator(withKnobs)
  .add('<crds-site-select />', () => {
    const token = text('sessionId', '');
    const siteId = text('siteId', '');
    return `<crds-site-select auth-token=${token} site-id=${siteId}></crds-site-select>`;
  });
