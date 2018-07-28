import React from "react";
import PropTypes from "prop-types";

class Search extends React.Component {
  componentDidMount() {
    if (this.input) {
      this.input.focus();
    }
  }
  render() {
    const { value, onSubmit, children } = this.props;
    return (
      <form onSubmit={onSubmit}>
        <input type="text" defaultValue={value} />
        <button type="submit">{children}</button>
      </form>
    );
  }
}

Search.propTypes = {
  value: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.string
};

Search.defaultProps = {
  children: "Submit"
};

export default Search;
