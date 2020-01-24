import { storiesOf } from '@storybook/polymer';
import staticFooter from './static-footer';

const stories = storiesOf('Footer', module);
stories
  .add('<crds-shared-footer />', () => {
    return `<crds-shared-footer></crds-shared-footer>`;
  })
  .addParameters({ percy: { skip: true } });

stories.add('Static Footer', () => {
  return staticFooter();
});
