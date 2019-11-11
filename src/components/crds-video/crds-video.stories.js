import { storiesOf } from '@storybook/polymer';
import { withKnobs, text } from '@storybook/addon-knobs';

const stories = storiesOf('Video', module);
stories
  .addDecorator(withKnobs)
  .add('<crds-video />', () => {
    const id = text('Youtube ID', 'DP1TOQ2G0Ks');
    const transcript = text('Transcript', 'Morbi leo risus, porta ac consectetur ac, vestibulum at eros...');
    return `<crds-video youtube-id="${id}" transcript="${transcript}" />`;
  });
