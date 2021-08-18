import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

function Card(props) {
  const [openImage, setOpenImage] = useState(false);
  const { title, imageUrl, year, url } = props;

  return (
    <div className="card-wrapper">
      <div className="left">
        {' '}
        <img src={imageUrl} />
      </div>
      <div className="right">
        <p className="title">{title}</p>
        <p className="year">{year}</p>
        <Link to={url}>
          <p>Detail</p>
        </Link>
      </div>
    </div>
  );
}

export default Card;
