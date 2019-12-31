import { storiesOf } from '@storybook/polymer';
import { withKnobs, select, boolean, text } from '@storybook/addon-knobs';
import { colors, sizes, displays } from './crds-button-options';
import {icons, iconSizeOptions, iconAlignOptions}  from './button-icon-options';
import iconColors from '../../../shared/crds-icon-colors'


const stories = storiesOf('DDK/Atoms', module);
stories.addDecorator(withKnobs).add('crds-button', () => {
  const color = select('color', colors, 'blue');
  const buttonText = text('text', 'Button');
  const href = text('href', '');
  const size = select('size', sizes, '');
  const display = select('display', displays, '');
  const disabled = boolean('disabled', false);
  const secondary = boolean('secondary', false);
  const block = boolean('block', false);
  const onClick = text('onClick', 'alert(\'Button Pressed\')');
  const icon = select('icon', icons, '');
  const iconSize = select('size(px)', iconSizeOptions, '14');
  const iconColor = select('iconColor', Object.keys(iconColors), 'white')
  const iconAlign = select('iconAlign', iconAlignOptions, '');



  document.getElementById('root').parentElement.parentElement.style.backgroundColor = color === 'white' ? 'black' : '';

  return `<crds-button
              ${color ? 'color=' + color : ''}
              ${buttonText ? 'text=' + buttonText.replace(/\s/g, '&nbsp;') : ''}
              ${href ? 'href=' + href : ''}
              ${size ? 'size=' + size : ''}
              ${display ? 'display=' + display : ''}
              ${disabled ? 'disabled=' + disabled : ''}
              ${secondary ? 'secondary=' + secondary : ''}
              ${block ? 'block=' + block : ''}
              ${onClick ? 'onClick=' + onClick.replace(/\s/g, '&nbsp;') : ''}
              ${icon ? 'icon=' + icon : ''}
              ${iconSize ? 'icon-size=' + iconSize : ''}
              ${iconColor ? 'icon-color=' + iconColor : ''}
              ${iconAlign ? 'icon-align=' + iconAlign : ''}
              ></crds-button>`;
});
