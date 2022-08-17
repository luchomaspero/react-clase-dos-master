import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './FancyButton.css';

function FancyButton({ className, active = false, navigation = false, ...props }) {
  return (
    <button
      className={cx('fancy-button', className, {
        'fancy-button--navigation': navigation,
        'fancy-button--active': active,
      })}
      {...props}
    />
  );
}

FancyButton.propTypes = {
  className: PropTypes.string,
  navigation: PropTypes.bool,
  active: PropTypes.bool,
};

export default FancyButton;
