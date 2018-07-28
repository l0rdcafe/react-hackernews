import React from "react";
import PropTypes from "prop-types";
import Button from "./button";
import { SORTS } from "./constants";
import Sort from "./sort";

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortKey: "NONE",
      isSortReverse: false
    };
  }
  onSort = sortKey => {
    const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
    this.setState({ sortKey, isSortReverse });
  };
  render() {
    const { list, onDismiss } = this.props;
    const { isSortReverse, sortKey } = this.state;
    const { onSort } = this;
    const sortedList = SORTS[sortKey](list);
    const reversedSortedList = isSortReverse ? sortedList.reverse() : sortedList;

    return (
      <div className="table">
        <div className="table-header">
          <span style={{ width: "40%" }}>
            <Sort sortKey="TITLE" onSort={onSort} activeSortKey={sortKey} isReversed={isSortReverse}>
              Title
            </Sort>
          </span>
          <span style={{ width: "30%" }}>
            <Sort sortKey="AUTHOR" onSort={onSort} activeSortKey={sortKey} isReversed={isSortReverse}>
              Author
            </Sort>
          </span>
          <span style={{ width: "10%" }}>
            <Sort sortKey="COMMENTS" onSort={onSort} activeSortKey={sortKey} isReversed={isSortReverse}>
              Comments
            </Sort>
          </span>
          <span style={{ width: "10%" }}>
            <Sort sortKey="POINTS" onSort={onSort} activeSortKey={sortKey} isReversed={isSortReverse}>
              Points
            </Sort>
          </span>
          <span style={{ width: "10%" }}>Archive</span>
        </div>
        {reversedSortedList.map(item => (
          <div key={item.objectID} className="table-row">
            <span style={{ width: "40%" }}>
              <a href={item.url}>{item.title}</a>
            </span>
            <span style={{ width: "30%" }}>{item.author}</span>
            <span style={{ width: "10%" }}>{item.num_comments}</span>
            <span style={{ width: "10%" }}>{item.points}</span>
            <span style={{ width: "10%" }}>
              <Button className="button-inline" onClick={() => onDismiss(item.objectID)}>
                Dismiss
              </Button>
            </span>
          </div>
        ))}
      </div>
    );
  }
}

Table.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      objectID: PropTypes.string.isRequired,
      author: PropTypes.string,
      url: PropTypes.string,
      num_comments: PropTypes.number,
      points: PropTypes.number
    })
  ).isRequired,
  onDismiss: PropTypes.func.isRequired
};

export default Table;
