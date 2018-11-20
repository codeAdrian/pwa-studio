import React, { Component } from 'react';
import SearchAutocomplete from './autocomplete';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.searchRef = React.createRef();
    }

    state = {
        searchQuery: ''
    };
    handleSearchKeyUp = () => {
        const searchQuery = this.searchRef.current.value;
        this.setState({ searchQuery: searchQuery });
    };

    render() {
        const { searchQuery } = this.state;

        return (
            <div style={{ padding: '5em' }}>
                <input ref={this.searchRef} onKeyUp={this.handleSearchKeyUp} />
                <SearchAutocomplete searchQuery={searchQuery} />
            </div>
        );
    }
}

export default SearchBar;
