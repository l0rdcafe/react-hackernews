import React from "react";
import PropTypes from "prop-types";

const Loading = () => (
  <div>
    <i className="fas fa-spinner fa-spin fa-lg" />
  </div>
);

const withLoading = Component => ({ isLoading, ...rest }) => (isLoading ? <Loading /> : <Component {...rest} />);

withLoading.propTypes = {
  isLoading: PropTypes.bool.isRequired
};

export default withLoading;
