import { storiesOf } from '@storybook/polymer';
import { withKnobs } from '@storybook/addon-knobs';

const stories = storiesOf('Personalization', module);
stories
  .addDecorator(withKnobs)
  .add('crds-tithe-challenge', () => {
    return `<crds-tithe-challenge/>`;
  });
