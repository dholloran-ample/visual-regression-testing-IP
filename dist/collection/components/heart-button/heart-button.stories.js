import { storiesOf } from "@storybook/polymer";
import { withKnobs, text } from "@storybook/addon-knobs";

const stories = storiesOf("Interactions", module);
stories
  .addDecorator(withKnobs) //
  .add("<heart-button />", () => {
    const id = text("id", "4D9pCED9eM0GOQCOKyY0mS");
    return `<heart-button id="${id}"></heart-button>`;
  });
