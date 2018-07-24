import React from 'react';

const SearchBar = (props) => {
  return (
    <div>
      <input
        type="text"
        value={props.title}
        onChange={props.handleSearchInput}
        />
    </div>
  );
}

export default SearchBar;
