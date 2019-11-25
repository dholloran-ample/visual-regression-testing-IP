import { storiesOf } from '@storybook/polymer';
import { withKnobs, text } from '@storybook/addon-knobs';

var js = document.createElement("script");
js.type = "text/javascript";
js.src = '../dist/collection/global/app.js';

const stories = storiesOf('Groups', module);
stories
  .addDecorator(withKnobs, js)
  .add('crds-group-renew', () => {
    const groupId = text('Group ID', '');
    const daystoExpire = text('Days To Expiration', '');
    return `<crds-group-renew group-id=${groupId} days-to-expiration=${daystoExpire}></crds-group-renew>`;
  });
