import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import { bool, func, string, oneOf } from 'prop-types';
import cn from 'classnames';

import Portal from '../Portal';
import Button from '../Button';

import './styles.scss';

const CLOSE_DELAY = 300;
const DISABLE_BOUNCE_CLASSNAME = 'disable-bounce';

const MODAL_SIZE = {
  m: 'medium',
  l: 'large',
  s: 'small',
};

const Modal = (props) => {
  const {
    children,
    isOpen,
    onClose,
    portalId,
    hasCloseIcon,
    buttonSecondaryActionHandler,
    buttonSecondaryText,
    buttonActionHandler,
    buttonText,
    size,
    title,
    disableCloseOutside,
  } = props;

  // attach state is used to delay element detachment when closing, because need to wait animation to be done
  const modalBodyRef = useRef();
  const [attach, setAttach] = useState(isOpen);
  const [hasOverflowContentTop, setHasOverflowContentTop] = useState(false);
  const [hasOverflowContentBottom, setHasOverflowContentBottom] = useState(
    false
  );

  // closing state is used to handle closing animation
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);

    // waiting close animation to be done
    setTimeout(() => {
      setAttach(false);
      setClosing(false);
    }, CLOSE_DELAY);
  };

  const handleScroll = (e) => {
    const modalBodyHeight = e.target.clientHeight;
    const modalBodyContentHeight =
      modalBodyRef.current.firstElementChild.clientHeight;
    const scrollMaxY = modalBodyContentHeight - modalBodyHeight;

    setHasOverflowContentBottom(e.target.scrollTop < scrollMaxY);
    setHasOverflowContentTop(e.target.scrollTop > 0);
  };

  useEffect(() => {
    const uniqClass = `${DISABLE_BOUNCE_CLASSNAME}-${new Date()
      .valueOf()
      .toString()}`;
    const htmlClassList = document.getElementsByTagName('html')[0].classList;

    if (isOpen) {
      setAttach(true);
      htmlClassList.add(uniqClass);
    } else {
      handleClose();
    }

    return () => {
      htmlClassList.remove(uniqClass);
    };
  }, [isOpen]);

  useEffect(() => {
    if (modalBodyRef.current) {
      const modalBodyHeight = modalBodyRef.current.clientHeight;
      const modalBodyContentHeight =
        modalBodyRef.current.firstElementChild.clientHeight;

      if (modalBodyContentHeight > modalBodyHeight) {
        setHasOverflowContentBottom(true);
      }
    }

    return () => {
      setHasOverflowContentTop(false);
      setHasOverflowContentBottom(false);
    };
  }, [children, modalBodyRef.current, attach]);

  return (
    attach && (
      <Portal id={portalId}>
        <div
          className={cn('tix-modal', {
            closing,
          })}
        >
          <div className="modal-wrapper">
            <div
              className="modal-close-handle"
              onClick={!disableCloseOutside ? onClose : undefined}
            />
            <div className="modal-mask-bounce-bottom" />
            <div className="modal-popup">
              {hasCloseIcon && (
                <button className="modal-icon-close-wrapper" onClick={onClose}>
                 X
                </button>
              )}
              <div
                className={cn('modal-content', MODAL_SIZE[size], {
                  'top-border': hasOverflowContentTop,
                  'bottom-border': hasOverflowContentBottom,
                })}
              >
                <div className="modal-header">
                  <h2 className="modal-title">{title}</h2>
                </div>
                <div
                  className="modal-body"
                  onScroll={handleScroll}
                  ref={modalBodyRef}
                >
                {children}
                </div>
                <div className="modal-footer">
                  {buttonSecondaryText && buttonSecondaryActionHandler && (
                    <Button onClick={buttonSecondaryActionHandler} secondary>
                      {buttonSecondaryText}
                    </Button>
                  )}
                  <Button onClick={buttonActionHandler}>{buttonText}</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Portal>
    )
  );
};

Modal.propTypes = {
  /** Function to detach Modal */
  onClose: func.isRequired,
  /** Modal Open State */
  buttonSecondaryActionHandler: func,
  buttonSecondaryText: string,
  buttonActionHandler: func,
  buttonText: string,
  disableCloseOutside: bool,
  hasCloseIcon: bool,
  isOpen: bool,
  portalId: string,
  size: oneOf(Object.keys(MODAL_SIZE)),
  title: string,
};

Modal.defaultProps = {
  disableCloseOutside: false,
  hasCloseIcon: false,
  isOpen: false,
  portalId: 'modal-root',
  size: 's',
};

export default Modal;