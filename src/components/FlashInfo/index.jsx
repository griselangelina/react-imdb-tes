import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';
import { resetFlash } from '../../redux/app/action';

import { object, func } from 'prop-types';
import cx from 'classname';

import './style.scss';

const duration = 300;

class FlashInfo extends PureComponent {
  static propTypes = {
    flash: object,
    resetFlash: func,
  };

  componentDidUpdate() {
    if (this.props.flash.show) {
      setTimeout(this.props.resetFlash, 3000);
    }
  }

  render() {
    const show = this.props.flash.show;
    return <div className={cx('flash-info', { show: show })}>{this.props.flash.text}</div>;
  }
}

export default connect((state) => ({ flash: state.app.flash }), { resetFlash })(FlashInfo);
