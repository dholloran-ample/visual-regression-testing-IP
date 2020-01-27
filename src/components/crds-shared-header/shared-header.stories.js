import { storiesOf } from '@storybook/polymer';
// import { withKnobs, text } from "@storybook/addon-knobs";

const stories = storiesOf('Header', module);
stories
  // .addDecorator(withKnobs) //
  .addParameters({ percy: { skip: true } })
  .add('<crds-shared-header />', () => {
    // const id = text("id", "4D9pCED9eM0GOQCOKyY0mS");
    return `<crds-shared-header></crds-shared-header>`;
  });
