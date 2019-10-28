import { storiesOf } from '@storybook/polymer';
import { withKnobs, text } from '@storybook/addon-knobs';

const stories = storiesOf('Personalization', module);
stories
  .addDecorator(withKnobs)
  .add('<crds-tithe-challenge />', () => {
    const token = text('sessionId', '');
    return `<crds-tithe-challenge auth-token=${token}></crds-tithe-challenge>`;
  });
