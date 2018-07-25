import React from 'react';

const SearchBar = (props) => {
  return (
    <div>
      <input
        type="text"
        value={props.value}
        onChange={(e) => props.handleSearchInput(e.target.value)}
        onKeyPress={(e) => {
          if (e.which === 13) { // if they press 'Enter'
            // fire ze missiles
            props.handleSubmit(e.target.value);
          }
        }}
        />
        <button onClick={() => props.handleSearchInput('')}>
          x
        </button>
    </div>
  );
};

export default SearchBar;
