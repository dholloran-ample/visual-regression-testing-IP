import { storiesOf } from '@storybook/polymer';
import { withKnobs, text } from '@storybook/addon-knobs';

const stories = storiesOf('Interactions', module);
stories
  .addDecorator(withKnobs) //
  .add('<crds-heart-button />', () => {
    const contentfulId = text('contentfulId', '4D9pCED9eM0GOQCOKyY0mS');
    return `<crds-heart-button contentful-id="${contentfulId}"></crds-heart-button>`;
  });
