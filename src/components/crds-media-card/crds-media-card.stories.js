import { storiesOf } from '@storybook/polymer';
import { withKnobs, text, select } from '@storybook/addon-knobs';

const stories = storiesOf('Media Card', module);
stories
  .addDecorator(withKnobs) //
  .add('Single', () => {
    const imageSrc = text(
      'imageSrc',
      'https://crds-media.imgix.net/5CaAjF9bDkXWOw6YXl92cZ/fccff599d00f378c1aae525bfff94a2b/onsite-groups-header_2x.jpg?format=auto,compress'
    );

    const thumbnailSrc = text(
      'thumbnailSrc',
      'https://crossroads-media.imgix.net/images/crds-music/jumbotron/music-laying-it-all-down-bg.jpg?format=auto,compress'

    );

    const meta = text("meta", "10/19/19 - 10/25/19");
    const metaPosition = select('metaPosition', { 'top': 'top', 'bottom': 'bottom' }, 'bottom')
    const body = text(
      'body',
      '<p> LAUNCH 2019 is a great way to make the connections that will help you thrive as you start your journey post high school. We’ll have dinner, live worship, and a chance to meet some college students and hear their stories. <a href="#"> RSVP here. <a/> </p>'
    );
    const buttonSrc = text('buttonSrc', '#');

    const contentTypeOptions = {
      'article': 'article',
      'video': 'video',
      'episode': 'episode',
      'song': 'song'
    }
    const contentType = select('Content Type', contentTypeOptions, 'article')

    return `<div style="width: 500px; height: 500px;" > 
        <crds-media-card heading='Puerto Rico' meta='${meta}' meta-position='${metaPosition}' thumbnail-src='${thumbnailSrc}' image-src='${imageSrc}' body='${body}' button-src='${buttonSrc}' content-type='${contentType}'>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco 
            <a href='#'>
            Lorem ipsum
            </a>
          </p>
          <crds-button href='#' label='Click me!'><crds-button>
        </crds-media-card> 
    </div>
    `;
  });
