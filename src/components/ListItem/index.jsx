import React from 'react';
import { string } from 'prop-types';

import './styles.scss';

ListItem.propTypes = {
  title: string,
  content: string,
};

function ListItem(props) {
  const { title, content } = props || {};

  return (
    <div className='list-item'>
      <div className="title">{title}</div>
      <div className="content">{content}</div>
    </div>
  );
}

export default ListItem;
