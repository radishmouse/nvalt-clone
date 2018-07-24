import React from 'react';

const DocumentList = (props) => {
  return (
    <div>
      <ul>
        {props.documents.map(doc => (
          <li key={doc.id}
              onClick={() => props.handleDocumentSelection(doc.id)}
            >{doc.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default DocumentList;
