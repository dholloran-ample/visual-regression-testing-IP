import { storiesOf } from '@storybook/polymer';
import { withKnobs, text } from '@storybook/addon-knobs';

const stories = storiesOf('Media Card', module);
stories
  .addDecorator(withKnobs) //
  .add('<crds-media-card/>', () => {
    return `<div style="width: 500px; height: 500px; background: rgba(50,50,50,0.50)" > 
        <crds-media-card/> 
    </div>
    `;
  });
