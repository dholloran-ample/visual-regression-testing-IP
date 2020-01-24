import { storiesOf } from '@storybook/polymer';
import { withKnobs, text } from '@storybook/addon-knobs';

var js = document.createElement('script');
js.type = 'text/javascript';
js.src = '../dist/collection/global/app.js';

const stories = storiesOf('Groups', module);
stories
  .addDecorator(withKnobs, js)
  .addParameters({ percy: { skip: true } })
  .add('crds-group-renew', () => {
    const groupIds = text('Group IDs', '');
    const daystoExpire = text('Days To Expiration', '');
    return `<crds-group-renew group-ids-string=${groupIds} days-to-expiration=${daystoExpire}></crds-group-renew>`;
  });
