import { storiesOf } from '@storybook/polymer';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import colors from '../../shared/crds-icon-colors'

const stories = storiesOf('Icons', module);

stories
  .addDecorator(withKnobs)
  .add('Static Icon', () => {

    const nameOptions = {
      'account-thin': 'account-thin',
      'calendar': 'calendar',
      'camera': 'camera',
      'caret-down': 'caret-down',
      'chart-bar-thin': 'chart-bar-thin',
      'chat-thin': 'chat-thin',
      'check-circle': 'check-circle',
      'chevron-down': 'chevron-down',
      'chevron-down-thin': 'chevron-down-thin',
      'chevron-left': 'chevron-left',
      'chevron-left-thin': 'chevron-left-thin',
      'chevron-right': 'chevron-right',
      'chevron-right-thin': 'chevron-right-thin',
      'chevron-up': 'chevron-up',
      'chevron-up-thin': 'chevron-up-thin',
      'circle-thin': 'circle-thin',
      'close': 'close',
      'close-thin': 'close-thin',
      'clock-o': 'clock-o',
      'contrast': 'contrast',
      'copy': 'copy',
      'credit-card': 'credit-card',
      'download': 'download',
      'equalizer': 'equalizer',
      'exclamation-circle': 'exclamation-circle',
      'eye': 'eye',
      'eye-slash': 'eye-slash',
      'facebook': 'facebook',
      'github': 'github',
      'heart': 'heart',
      'heart-o': 'heart-o',
      'instagram': 'instagram',
      'link': 'link',
      'location-arrow': 'location-arrow',
      'map-marker': 'map-marker',
      'media-article': 'media-article',
      'media-music': 'media-music',
      'media-podcast': 'media-podcast',
      'media-video': 'media-video',
      'menu': 'menu',
      'menu-thin': 'menu-thin',
      'minus': 'minus',
      'play-thin': 'play-thin',
      'plus': 'plus',
      'question-circle': 'question-circle',
      'screwhead-crds': 'screwhead-crds',
      'search': 'search',
      'search-thin': 'search-thin',
      'share': 'share',
      'twitter': 'twitter',
      'university': 'university',
      'usd': 'usd',
      'user-plus-thin': 'user-plus-thin',
      'youtube': 'youtube',
    };

    const name = select('name', nameOptions, 'media-article');

    const sizeOptions = { '12': '12', '24': '24', '36': '36' }
    const size = select('size(px)', sizeOptions, '24');

    const color = select('color', colors, 'black')


    return `
        <crds-icon name="${name}" size="${size}" color="${color}"></crds-icon>
    `;
  })