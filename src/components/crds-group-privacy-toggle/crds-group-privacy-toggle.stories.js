import { storiesOf } from '@storybook/polymer';
import { withKnobs, text } from '@storybook/addon-knobs';

const stories = storiesOf('Groups', module);
stories
  .addDecorator(withKnobs)
  .add('crds-group-privacy-toggle', () => {
    const groupId = text('groupId', '');
    return `<crds-group-privacy-toggle group-id=${groupId}></crds-group-privacy-toggle>`;
});
