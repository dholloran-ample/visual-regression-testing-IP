import { storiesOf } from '@storybook/polymer';
import { withKnobs, text } from '@storybook/addon-knobs';


const stories = storiesOf('Personalization', module);
stories
  .addDecorator(withKnobs)
  .add('crds-image-title-cutout', () => {
    const imageUrl = text('Image Url', '');
    const imageHref = text('Image HREF', '');
    const cardTitle = text('Card Title', '');
    const titleHref = text('Title HREF', '');
    return `<div style="width:400px"><crds-image-title-cutout
              ${imageUrl ? "image-url=" + imageUrl : ''}
              ${imageHref ? "image-href=" + imageHref : ''} 
              ${cardTitle ? "card-title=" + cardTitle : ''} 
              ${titleHref ? "title-href=" + titleHref : ''}  
    ></crds-image-title-cutout></div>`;
  });