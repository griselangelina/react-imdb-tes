import React from 'react-dom';
import PropTypes from 'prop-types';

function Portal({ id, children }) {
  let modalRoot = document.getElementById(id);

  if (!modalRoot) {
    modalRoot = document.createElement('div');

    modalRoot.setAttribute('id', id);
    document.body.insertBefore(
      modalRoot,
      document.body.lastElementChild.nextElementSibling
    );
  }

  return React.createPortal(children, modalRoot);
}

Portal.propTypes = {
  id: PropTypes.string,
  children: PropTypes.element.isRequired,
};

Portal.defaultProps = {
  id: 'modal-root',
};

export default Portal;
