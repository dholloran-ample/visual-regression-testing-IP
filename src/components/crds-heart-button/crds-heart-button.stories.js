import { storiesOf } from '@storybook/polymer';
import { withKnobs, text } from '@storybook/addon-knobs';

const stories = storiesOf('Interactions', module);
stories
  .addDecorator(withKnobs) //
  .add('<heart-button />', () => {
    const contentfulId = text('contentfulId', '4D9pCED9eM0GOQCOKyY0mS');
    return `<heart-button contentful-id="${contentfulId}"></heart-button>`;
  });
