import { storiesOf } from '@storybook/polymer';
import { withKnobs, text } from '@storybook/addon-knobs';

const stories = storiesOf('Personalization', module);
stories
  .addDecorator(withKnobs)
  .add('<life-stages />', () => {
    const token = text('sessionId', '');
    return `<life-stages auth-token=${token}></life-stages>`;
  });
