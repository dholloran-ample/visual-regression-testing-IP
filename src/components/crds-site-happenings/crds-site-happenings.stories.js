import { storiesOf } from '@storybook/polymer';
import { withKnobs, text } from '@storybook/addon-knobs';

const stories = storiesOf('Personalization', module);
stories
  .addDecorator(withKnobs)
  .add('<crds-site-happenings />', () => {
    const t = text('token', '');
    document.cookie = `intsessionId=${t}`;
    return `<crds-site-happenings></crds-site-happenings>`;
  });
