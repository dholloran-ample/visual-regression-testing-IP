import { storiesOf } from '@storybook/polymer';
import { withKnobs, text } from '@storybook/addon-knobs';

const stories = storiesOf('Images', module);
stories
  .addParameters({ percy: { skip: true } })
  .addDecorator(withKnobs)
  .add('crds-image-title-cutout', () => {
    const imageUrl = text(
      'Image Url',
      'https://crds-media.imgix.net/6Wuqirf5JxhZxBPQlwheZH/8cf6b62e7117846df347c086317c73c2/Screen_Shot_2019-10-10_at_3.26.57_PM.png?auto=format&ar=2.63&fit=crop'
    );
    const imageHref = text(
      'Image HREF',
      'https://www.google.com/maps/place/Crossroads+Church+Oakley/@39.1594124,-84.4255232,17z/data=!3m1!4b1!4m5!3m4!1s0x8841ad6e8703e557:0x91d871185ba4400e!8m2!3d39.1594083!4d-84.4233345?hl=en'
    );
    const cardTitle = text('Card Title', 'Oakley');
    const titleHref = text('Title HREF', 'https://int.crossroads.net/oakley');
    return `<div style="width:400px"><crds-image-title-cutout
              ${imageUrl ? 'image-url=' + imageUrl : ''}
              ${imageHref ? 'image-href=' + imageHref : ''}
              ${cardTitle ? 'card-title=' + cardTitle : ''}
              ${titleHref ? 'title-href=' + titleHref : ''}
    ></crds-image-title-cutout></div>`;
  });
