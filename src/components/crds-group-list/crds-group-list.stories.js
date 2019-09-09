import { storiesOf } from '@storybook/polymer';
import { withKnobs, text } from '@storybook/addon-knobs';

const stories = storiesOf('Personalization', module);
stories
  .addDecorator(withKnobs)
  .add('<crds-group-list />', () => {
    const token = text('sessionId', '');
    return `<crds-group-list auth-token=${token}></crds-group-list>`;
  });
