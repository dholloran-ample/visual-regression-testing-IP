import { storiesOf } from '@storybook/polymer';
import { withKnobs, select, boolean, text } from '@storybook/addon-knobs';
import { colors, sizes, displays, types } from './crds-button-options';

const stories = storiesOf('DDK/Atoms', module);
stories.addDecorator(withKnobs).add('crds-button', () => {
  const type = select('type', types, '');
  const color = select('color', colors, type == 'link' ? '' : 'blue');
  const buttonText = text('text', 'Button');
  const value = text('value', '');
  const href = text('href', '');
  const size = select('size', sizes, '');
  const display = select('display', displays, '');
  const disabled = boolean('disabled', false);
  const secondary = boolean('secondary', false);
  const block = boolean('block', false);

  document.getElementById('root').parentElement.parentElement.style.backgroundColor = color === 'white' ? 'black' : '';

  return `<crds-button 
              ${color && type !== 'link' ? 'color=' + color : ''}
              ${buttonText ? 'text=' + buttonText.replace(/\s/g, '&nbsp;') : ''}
              ${href ? 'href=' + href : ''}
              ${value ? 'value=' + value : ''}
              ${type ? 'type=' + type : ''} 
              ${size ? 'size=' + size : ''}  
              ${display ? 'display=' + display : ''} 
              ${disabled ? 'disabled=' + disabled : ''} 
              ${secondary ? 'secondary=' + secondary : ''} 
              ${block ? 'block=' + block : ''}
              ></crds-button>`;
});
