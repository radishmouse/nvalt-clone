import React from 'react';

import './App.css';
import DocumentList from './DocumentList';
import DocumentEditor from './DocumentEditor';
import SearchBar from './SearchBar';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: '',
      currentDocumentId: -1,
      documents: [
        // {id: 111, title: 'foo', content: 'hey'},
        // {id: 112, title: 'bar', content: 'there'},
        // {id: 113, title: 'baz', content: 'fool'}
      ]
    };
  }
  
  render() {
    return (
      <div className="App">
        <button onClick={this._loadAppData}>Load</button>
        <button onClick={this._saveAppData}>Save</button>        
        <SearchBar
          title={this._documentById(this.state.currentDocumentId).title}
          handleSearchInput={this._changeSearchString}
          handleSubmit={this._selectOrCreate}
          value={this.state.searchString}
          />
        <DocumentList
          documents={this._documentsBySearch()}
          handleDocumentSelection={this._selectDocument}
          />
        <DocumentEditor
          document={this._documentById(this.state.currentDocumentId)}
          handleDocumentChange={this._changeDocument}
          />
      </div>
    );
  }

  componentDidMount() {
    this._loadAppData();
  }

  _documentById = (id) => this.state.documents.find(d => id === d.id) || this._blankDocument()

  _blankDocument = () => ({id: -1, title: '', content: ''})

  _newDocument = (title) => ({
    id: (new Date()).getTime(),
    title,
    content: ''
  })

  _documentsBySearch = () => this.state.searchString !== '' ?
    this.state.documents.filter(d => (
      d.title.toLowerCase().includes(this.state.searchString.toLowerCase())
        ||
      d.content.toLowerCase().includes(this.state.searchString.toLowerCase())    
    ))
    :
    this.state.documents

  _changeSearchString = (val) => {
    this.setState({
      searchString: val
    });
  }

  _selectOrCreate = (newTitle) => {
    // First, see if they were trying to match a document
    let matchedDocs = this._documentsBySearch();
    if (matchedDocs.length > 0) {
      this._selectDocument(matchedDocs[0].id);
    } else {
      let newDoc = this._newDocument(newTitle);
      this.setState({
        currentDocumentId: newDoc.id,
        searchString: '',
        documents: this.state.documents.concat(newDoc)
      });      
    }
  }
  
  _selectDocument = (id) => {
    this.setState({
      currentDocumentId: id
    });
  }

  _allDocumentsExcept = (id) => this.state.documents.filter(d => id !== d.id)

  _changeDocument = (content) => {
    if (this.state.currentDocumentId === -1) {
      // Bail if they haven't selected a document
      return;
    }
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

  _saveAppData = () => localStorage.setItem('react-notes-app', JSON.stringify(this.state))

  _loadAppData = () => {
    let savedState = JSON.parse(localStorage.getItem('react-notes-app'));
    this.setState(savedState);
  }
  
}

export default App;
