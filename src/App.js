import React, { Component } from "react";
import axios from "axios";
import Table from "./table";
import Search from "./search";
import Button from "./button";
import { DEFAULT_QUERY, DEFAULT_HPP, PATH_BASE, PATH_SEARCH, PARAM_PAGE, PARAM_HPP, PARAM_SEARCH } from "./constants";
import withLoading from "./loading";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: null,
      searchKey: "",
      searchQuery: DEFAULT_QUERY,
      error: null,
      isLoading: false
    };
  }
  componentDidMount() {
    const { searchQuery } = this.state;
    this.setState({ searchKey: searchQuery });
    this.fetchTopStories(searchQuery);
  }
  onSearchChange = e => {
    this.setState({ searchQuery: e.target.value });
  };
  onSearchSubmit = e => {
    const { searchQuery } = this.state;
    this.setState({ searchKey: searchQuery });

    if (this.needsToSearchStories(searchQuery)) {
      this.fetchTopStories(searchQuery);
    }

    e.preventDefault();
  };
  onDismiss = id => {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];
    const newList = hits.filter(item => item.objectID !== id);

    this.setState({ results: { ...results, [searchKey]: { hits: newList, page } } });
  };
  setSearchResult = result => {
    const { hits, page } = result;
    this.setState(this.updateSearchStories(hits, page));
  };
  updateSearchStories = (hits, page) => prevState => {
    const { searchKey, results } = prevState;
    const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
    const newHits = [...oldHits, ...hits];

    return {
      results: {
        ...results,
        [searchKey]: { hits: newHits, page }
      },
      isLoading: false
    };
  };
  needsToSearchStories = query => (this.state.results ? !this.state.results[query] : true);
  fetchTopStories = (query, page = 0) => {
    const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${query}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`;
    this.setState({ isLoading: true });

    axios(url)
      .then(res => this.setSearchResult(res.data))
      .catch(error => this.setState({ error }));
  };
  render() {
    const { results, searchQuery, searchKey, error, isLoading } = this.state;
    const page = (results && results[searchKey] && results[searchKey].page) || 0;
    const list = (results && results[searchKey] && results[searchKey].hits) || [];
    const ButtonWithLoading = withLoading(Button);

    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchQuery}
            ref={el => (this.input = el)}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
        </div>
        {error ? (
          <div className="interactions">
            <p>Something went wrong.</p>
          </div>
        ) : (
          <Table list={list} onDismiss={this.onDismiss} />
        )}
        <div className="interactions">
          <ButtonWithLoading isLoading={isLoading} onClick={() => this.fetchTopStories(searchKey, page + 1)}>
            More
          </ButtonWithLoading>
        </div>
      </div>
    );
  }
}

export default App;
