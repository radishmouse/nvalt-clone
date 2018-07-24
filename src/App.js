import React from 'react';

import './App.css';
import DocumentList from './DocumentList';
import DocumentEditor from './DocumentEditor';
import SearchBar from './SearchBar';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentDocumentId: -1,
      documents: [
        {id: 111, title: 'foo', content: 'hey'},
        {id: 112, title: 'bar', content: 'there'},
        {id: 113, title: 'baz', content: 'fool'}
      ]
    };
  }
  
  render() {
    return (
      <div className="App">
        <SearchBar
          title={this._documentById(this.state.currentDocumentId).title}
          handleSearchInput={this._searchDocuments}
          handleSubmit={this._createAndSelectDocument}
          />
        <DocumentList
          documents={this.state.documents}
          handleDocumentSelection={this._selectDocument}
          />
        <DocumentEditor
          document={this._documentById(this.state.currentDocumentId)}
          handleDocumentChange={this._changeDocument}
          />
      </div>
    );
  }

  _documentById = (id) => this.state.documents.find(d => id === d.id) || this._blankDocument()

  _blankDocument = () => ({id: -1, title: '', content: ''})

  _newDocument = (title) => ({
    id: (new Date()).getTime(),
    title,
    content: ''
  })

  _searchDocuments = () => {}

  _createAndSelectDocument = () => {}
  
  _selectDocument = (id) => {
    this.setState({
      currentDocumentId: id
    });
  }

  _allDocumentsExcept = (id) => this.state.documents.filter(d => id !== d.id)

  _changeDocument = (content) => {
    let doc = this._documentById(this.state.currentDocumentId);
    this.setState({
      documents: [
        ...this._allDocumentsExcept(this.state.currentDocumentId),
        {
          ...doc,
          content
        }
      ]
    });
  }
}

export default App;
