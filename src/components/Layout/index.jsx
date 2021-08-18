import React from 'react';
import { renderRoutes } from 'react-router-config';
import { object } from 'prop-types';

import FlashInfo from '../FlashInfo';

Layout.propTypes = {
  route: object,
};

function Layout(props) {
  const { route } = props;

  return (
    <div className="layout-wrapper">
      <FlashInfo />
      {renderRoutes(route.routes)}
    </div>
  );
}

export default Layout;
