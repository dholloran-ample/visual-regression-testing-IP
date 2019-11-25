import { storiesOf } from '@storybook/polymer';
import { withKnobs, text, select, boolean} from '@storybook/addon-knobs';

const stories = storiesOf('Media Card', module);
stories
  .addDecorator(withKnobs) //
  .add('Single', () => {
    const imageSrc = text(
      'imageSrc',
      'https://crds-media.imgix.net/4CWCvxN6iSb0QXDqvaT9Gt/a80cfd9a0b8154874777cbd71da59175/shutterstock_403980601.jpg?auto=format,compress'
    );

    const thumbnailSrc = text(
      'thumbnailSrc',
      'https://crossroads-media.imgix.net/images/crds-music/jumbotron/music-laying-it-all-down-bg.jpg?format=auto,compress'

    );

    const iconLabel = text("iconLabel", "5 min");
    const meta = text("meta", "10/19/19 - 10/25/19");
    const category = text("category", "Example");
    const body = text(
      'body',
      `<p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco
        <a href='#'>
        Lorem ipsum
        </a>
      </p>
      <crds-button type="primary" color="blue" href='#' text='Click me!'><crds-button>`
    );
    const url = text('url', '#');
    const contentTypeOptions = ['article', 'video', 'episode', 'song', null];
    const contentType = select('Content Type', contentTypeOptions, 'article');


    return `
    <div style="width: 350px;">
        <crds-media-card heading='Game of thrones' icon-label='${iconLabel}' meta='${meta}' category='${category}' thumbnail-src='${thumbnailSrc}' image-src='${imageSrc}' url='${url}' content-type='${contentType}'>
              ${body}
        </crds-media-card>
    </div>
    `;
  }, {
    knobs: {
      escapeHTML: false
    },
  }).add('Grid', () => {
    const imageSrc = text(
      'imageSrc',
      'https://crds-media.imgix.net/4CWCvxN6iSb0QXDqvaT9Gt/a80cfd9a0b8154874777cbd71da59175/shutterstock_403980601.jpg?auto=format,compress'
    );

    const thumbnailSrc = text(
      'thumbnailSrc',
      'https://crossroads-media.imgix.net/images/crds-music/jumbotron/music-laying-it-all-down-bg.jpg?format=auto,compress'

    );

    const iconLabel = text("iconLabel", "5 min");
    const meta = text("meta", "10/19/19 - 10/25/19");
    const category = text("category", "Example");
    const body = text(
      'body',
      `<p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco
        <a href='#'>
        Lorem ipsum
        </a>
      </p>
      <crds-button type="primary" color="blue" href='#' text='Click me!'><crds-button>`
    );

    const url = text('url', '#');
    const contentTypeOptions = ['article', 'video', 'episode', 'song', null];
    const contentType = select('Content Type', contentTypeOptions, 'article');
    const truncateLength = text("Truncate Length", "18");

    return `
    <div style="width: 1000px; display: flex;">
      <div style="flex: 0 0 750px; margin-right: 20px;">
        <crds-media-card heading='Game of thrones' icon-label='${iconLabel}' truncate-length='${truncateLength}' meta='${meta}' category='${category}' thumbnail-src='${thumbnailSrc}' image-src='${imageSrc}' url='${url}' content-type='${contentType}'>
              ${body}
        </crds-media-card>
      </div>
      <div style="display: flex; flex-direction: column; flex: 0 0 250px;">
        <div style="margin-bottom: 20px">
        <crds-media-card heading='Game of thrones' icon-label='${iconLabel}' category='${category}' thumbnail-src='${thumbnailSrc}' image-src='${imageSrc}' url='${url}' content-type='${contentType}'>
  </crds-media-card>
        </div>
        <div>
        <crds-media-card heading='Game of thrones' icon-label='${iconLabel}' category='${category}' thumbnail-src='${thumbnailSrc}' image-src='${imageSrc}' url='${url}' content-type='${contentType}'>
        </crds-media-card>
        </div>
      </div>
    </div>
    `;
  }, {
    knobs: {
      escapeHTML: false
    },
  });
