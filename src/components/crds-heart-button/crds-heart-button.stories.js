import { storiesOf } from '@storybook/polymer';
import { withKnobs, text } from '@storybook/addon-knobs';

const stories = storiesOf('Interactions', module);
stories
  .addDecorator(withKnobs) //
  .addParameters({ percy: { skip: true } })
  .add('<crds-heart-button />', () => {
    const contentfulId = text('contentfulId', '4D9pCED9eM0GOQCOKyY0mS');
    return `<crds-heart-button contentful-id="${contentfulId}"></crds-heart-button>`;
  });
