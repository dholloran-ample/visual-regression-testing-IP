import { storiesOf, addDecorator } from '@storybook/polymer';
import { withKnobs, text } from '@storybook/addon-knobs';

var js = document.createElement("script");
js.type = "text/javascript";
js.src = '../dist/collection/global/app.js';


const stories = storiesOf('Personalization', module);
stories
  .addDecorator(withKnobs, js)
  .add('crds-greeting', () => {
    const defaultName = text('defaultName', '');
    return `<crds-greeting default-name=${defaultName}></crds-greeting>`;
  });
