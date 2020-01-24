import { storiesOf } from '@storybook/polymer';
import { withKnobs, text } from '@storybook/addon-knobs';

const stories = storiesOf('Groups', module);
stories
  .addDecorator(withKnobs)
  .addParameters({ percy: { skip: true } })
  .add('crds-group-privacy-toggle', () => {
    const groupId = text('groupId', '');
    document.getElementById('root').parentElement.parentElement.style.backgroundColor = '#3b6e8f';
    return `<crds-group-privacy-toggle group-id=${groupId}></crds-group-privacy-toggle>`;
  });
