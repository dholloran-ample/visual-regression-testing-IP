import { storiesOf } from '@storybook/polymer';
import { withKnobs, text } from '@storybook/addon-knobs';

const stories = storiesOf('Personalization', module);
stories
  .addDecorator(withKnobs)
  .add('<greeting-component />', () => {
    const token = text('sessionId', '');
    return `<greeting-component auth-token=${token}></greeting-component>`;
  });
