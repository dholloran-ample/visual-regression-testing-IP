import { storiesOf } from '@storybook/polymer';
import { withKnobs, text } from '@storybook/addon-knobs';


const stories = storiesOf('Personalization', module);
stories
  .addDecorator(withKnobs)
  .add('<crds-image-title-cutout />', () => {
    const imageUrl= text('Image Url', '');
    const cardTitle = text('Card Title', '');
    const imageHref = text('Image HREF', '');
    const titleHref = text('Title HREF', '');
    return `<crds-image-title-cutout imageSrc=${imageUrl} imageHref=${imageHref} cardTitle=${cardTitle} titleHref=${titleHref} ></crds-image-title-cutout>`;
  });