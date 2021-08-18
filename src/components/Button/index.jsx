import React from 'react';
import { bool, func, number, object, oneOfType, string } from 'prop-types';
import cx from 'classnames';

// styles
import './styles.scss';

Button.propTypes = {
  button: bool,
  buttonGradient: bool,
  className: string,
  curved: bool,
  danger: bool,
  dark: bool,
  disabled: bool,
  filterSearch: bool,
  flat: bool,
  grey: bool,
  height: oneOfType([number, string]),
  icon: string,
  large: bool,
  medium: bool,
  onClick: func,
  primary: bool,
  reset: bool,
  search: bool,
  secondary: bool,
  small: bool,
  style: object,
  success: bool,
  text: string,
  warning: bool,
  warningGrey: bool,
  width: oneOfType([number, string]),
};

Button.defaultProps = {
  height: 'auto',
  width: 'auto',
};

function Button(props) {
  // Props
  const {
    button,
    buttonGradient,
    className,
    curved,
    danger,
    dark,
    disabled,
    height,
    flat,
    grey,
    large,
    medium,
    onClick,
    primary,
    secondary,
    small,
    style,
    success,
    text,
    warning,
    warningGrey,
    width,
    search,
    filterSearch,
    reset,
    icon,
    ...restProps
  } = props;

  const buttonClassNames = cx('button', className, {
    'btn-large': large,
    'btn-medium': medium,
    'btn-small': small,
    'btn-disabled': disabled,
    'btn-primary': primary,
    'btn-secondary': secondary,
  });

  return (
    <button
      className={buttonClassNames}
      {...(typeof onClick === 'function' && { onClick: () => onClick() })}
      style={{ height: height, width: width, ...style }}
      {...(button && { type: 'button' })}
      {...restProps}
    >
      {' '}
      {text}
    </button>
  );
}

export default Button;
