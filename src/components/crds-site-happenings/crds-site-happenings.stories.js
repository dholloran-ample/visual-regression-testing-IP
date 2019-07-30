import { storiesOf } from '@storybook/polymer';
import { withKnobs, text } from '@storybook/addon-knobs';

const stories = storiesOf('Personalization', module);
stories
  .addDecorator(withKnobs)
  .add('<crds-site-happenings />', () => {
    const token = text('sessionId', '');
    return `<crds-site-happenings auth-token=${token}></crds-site-happenings>`;
  });
