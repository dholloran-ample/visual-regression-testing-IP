import { storiesOf } from '@storybook/polymer';
import { withKnobs, text } from '@storybook/addon-knobs';

var js = document.createElement('script');
js.type = 'text/javascript';
js.src = '../dist/collection/global/app.js';

const stories = storiesOf('Groups', module);
stories
  .addDecorator(withKnobs, js)
  .addParameters({ percy: { skip: true } })
  .add('crds-group-renew-button', () => {
    const groupId = text('Group ID', '');
    const daystoExpire = text('Days To Expiration', '');
    document.getElementById('root').parentElement.parentElement.style.backgroundColor = '#3b6e8f';
    return `<crds-group-renew-button group-id=${groupId} days-to-expiration=${daystoExpire}/>`;
  });
