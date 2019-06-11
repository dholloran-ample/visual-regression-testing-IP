import { storiesOf } from '@storybook/polymer';
// import { withKnobs, text } from "@storybook/addon-knobs";

const stories = storiesOf('Header', module);
stories
  // .addDecorator(withKnobs) //
  .add('<shared-header />', () => {
    // const id = text("id", "4D9pCED9eM0GOQCOKyY0mS");
    return `<shared-header></shared-header>`;
  });
