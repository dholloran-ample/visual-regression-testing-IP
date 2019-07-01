import { storiesOf } from "@storybook/polymer";

const stories = storiesOf('Footer', module);
stories
  .add("<shared-footer />", () => {
    return `<shared-footer></shared-footer>`;
  });
