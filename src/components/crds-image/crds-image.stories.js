import { storiesOf } from '@storybook/polymer';
import { withKnobs, text, object } from '@storybook/addon-knobs';

const stories = storiesOf('Images', module);

stories
  .addDecorator(withKnobs)
  .addParameters({ percy: { skip: true } })
  .add('Image', () => {
    const imgSrc = text(
      'imgSrc',
      'https://crds-media.imgix.net/4CWCvxN6iSb0QXDqvaT9Gt/a80cfd9a0b8154874777cbd71da59175/shutterstock_403980601.jpg?auto=format,compress&w=360&h=202.5&fit=crop'
    );

    return `
    <div style="max-width: 360px; margin: 0 auto;">
      <crds-image src=${imgSrc} ></crds-image>
    </div>
  `;
  })
  .add('Multiple Images', () => {
    const src1 = text(
      'imgSrc 1',
      'https://crds-media.imgix.net/4CWCvxN6iSb0QXDqvaT9Gt/a80cfd9a0b8154874777cbd71da59175/shutterstock_403980601.jpg?auto=format,compress&w=360&h=202.5&fit=crop'
    );
    const src2 = text(
      'imgSrc 2',
      'https://crds-media.imgix.net/2vioSZB8k46cQWwwgOaGYk/61df479df1b16c5fd6f8a6bb4e12753e/RSVP_90x90-1.jpg?auto=format,compress&w=360&h=202.5&fit=crop&ixlib=imgixjs-3.3.2'
    );
    const src3 = text(
      'imgSrc 3',
      'https://crds-media.imgix.net/7ASC7AviXmE8ywSWMy6MA8/a34a44b13caa8f63a3893577749f4022/EverydayFriends_90x90.jpg?auto=format,compress&w=360&h=202.5&fit=crop&ixlib=imgixjs-3.3.2'
    );

    return `
    <div style="max-width: 360px; margin: 100px auto;">
      <crds-image src=${src1} ></crds-image>
    </div>

    <div style="max-width: 360px; margin: 100px auto;">
      <crds-image src=${src2} ></crds-image>
    </div>

    <div style="max-width: 360px; margin: 100px auto;">
      <crds-image src=${src3} ></crds-image>
    </div>
  `;
  });
