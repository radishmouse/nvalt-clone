import React from 'react';

const DocumentEditor = (props) => {
    return (
      <div>
        <h1>{props.document.title}</h1>
        <textarea
          value={props.document.content}
          onChange={(e) => {props.handleDocumentChange(e.target.value)}}
          />
      </div>
    );
};


export default DocumentEditor;
