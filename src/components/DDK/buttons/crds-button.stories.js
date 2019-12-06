import { storiesOf } from '@storybook/polymer';
import { withKnobs, select, boolean, text } from '@storybook/addon-knobs';
import { colors, sizes, displays } from './crds-button-options';

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
              ></crds-button>`;
});
