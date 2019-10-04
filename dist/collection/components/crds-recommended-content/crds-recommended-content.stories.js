import { storiesOf } from '@storybook/polymer';
import { withKnobs, text } from '@storybook/addon-knobs';

const stories = storiesOf('Personalization', module);
stories
  .addDecorator(withKnobs)
  .add('<crds-recommended-content />', () => {
    const token = text('sessionId', '');
    return `<crds-recommended-content auth-token=${token}></crds-recommended-content>`;
  });
