import React from "react";
import PropTypes from "prop-types";
import Button from "./button";

const Sort = ({ sortKey, onSort, children, activeSortKey, isReversed }) => {
  const sortClass = ["button-inline"];
  let icon;

  if (sortKey === activeSortKey) {
    sortClass.push("button-active");
    icon = (
      <span>
        <i className={isReversed ? "fas fa-arrow-down" : "fas fa-arrow-up"} />
      </span>
    );
  }

  return (
    <div>
      {icon}
      <Button onClick={() => onSort(sortKey)} className={sortClass.join(" ")}>
        {children}
      </Button>
    </div>
  );
};

Sort.propTypes = {
  sortKey: PropTypes.string.isRequired,
  onSort: PropTypes.func.isRequired,
  children: PropTypes.string,
  activeSortKey: PropTypes.string,
  isReversed: PropTypes.bool
};

Sort.defaultProps = {
  children: "Category",
  activeSortKey: "NONE",
  isReversed: false
};

export default Sort;
