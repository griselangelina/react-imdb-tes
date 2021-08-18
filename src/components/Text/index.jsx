import React from 'react';
import { string, func, number, bool } from 'prop-types';

function Text(props) {
  Text.propTypes = {
    id: number,
    value: string,
    onInputChange: func,
    isShowDelete: bool,
    onRemoveInput: func,
    errorText: string,
    isError: bool,
  };

  function handleFocus(e) {
    const element = e.target;

    element.classList.add('active');
  }

  function handleBlur(e) {
    const element = e.target;

    element.classList.remove('active');
  }

  const { id, value, onInputChange, isError, errorText } = props;

  return (
    <div>
      <input
        type="text"
        className="input"
        id={id}
        value={value}
        onChange={onInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {isError && <p>{errorText}</p>}
    </div>
  );
}

export default Text;
