// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Note from './components/note'
import NoteCreator from './components/note_creator'
import axios from 'axios'
import update from 'immutability-helper';
import 'draft-js/dist/Draft.css';


class App extends React.Component{

  constructor(props){
    super(props);
    this.addNote = this.addNote.bind(this);
    this.selectNote = this.selectNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
    this.insertNoteToDB = this.insertNoteToDB.bind(this);
    this.removeNoteFromDb = this.removeNoteFromDb.bind(this);
    this.updateNoteInList = this.updateNoteInList.bind(this);
    this.updateNoteInDB = this.updateNoteInDB.bind(this);
  
    this.state = {
      notes: [

        ],
      currentNote: {id: '', content: '', title: ''},
    }
  }

  componentDidMount(){
    this.getNotes();
  }

  addNote(note){
    const currNote = this.state.currentNote;
    const previousNotes = this.state.notes;
    previousNotes.push(note);
    this.setState({
      notes: previousNotes,
      currentNote: currNote,
    })

  }

  updateNoteInList(note){

    const currNote = note;
    const previousNotes = this.state.notes;

    for(let i = 0; i < previousNotes.length; i++){
      if (previousNotes[i].id == note.id){
        previousNotes[i] = note;
      }
    }

    this.setState({
      notes: [],
      currentNote: currNote,
    },function(){
      this.getNotes()
    })
  }

  insertNoteToDB(note){
    const csrf = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    axios.post('/notes.json', note ,{headers: { 'X-CSRF-Token': csrf }})
    .then(response=>(
      this.addNote(response.data)
    ))
    .catch(function (error) {
      console.log(error);
    });
  }

  removeNoteFromDb(id){
    const csrf = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    fetch(`/notes/${id}.json`, {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'X-CSRF-Token': csrf }})
    .then(response=>{
      console.log(response)
      this.removeNote(id)
      this.newNote()
    })
    .catch(function(er){
      console.log(er);
    });
  }

  updateNoteInDB(note){
    const csrf = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    fetch(`/notes/${note.id}.json`, {
      method: 'PUT',
      body: JSON.stringify(note),
      credentials: 'include',
      headers: { 'X-CSRF-Token': csrf,
      'content-type' : 'application/json'
     }})
    .then((response) => response.json())
    .then((response)=>{
      console.log(this);
      this.updateNoteInList(response)
    })
    .catch(function(er){
      console.log(er);
    });
  }

  removeNote(id){
    let previousNotes = this.state.notes
    
    for(let i = 0; i < previousNotes.length; i++){
      if (previousNotes[i].id == id){
        previousNotes.splice(i,1);
      }
    }

    this.setState({
      notes: previousNotes,
    },function(){
      console.log(this.state);
    })
  }

  getNotes(){
    axios.get('/notes.json')
      .then(
        response=>(
          response.data.map((note)=>{
            this.addNote(note);
          })
        )
      );
  }

  selectNote(note){
    this.setState({
      currentNote: note,
    },function(){
      console.log(this.state);
    });
  }

  newNote(){
    var currNote = {id: '', content: '', title: ''};
    const previousNotes = this.state.notes;
    this.setState({
      notes: previousNotes,
      currentNote: currNote,
    },function(){
      console.log(this.state);
    });
  }
  

  render(props) {
    return (
      <div id="app" className="grid-container">
        <div className="nav">
          <div className="nav-heading">
            <h3>Noteable</h3>
          </div>
          {
            this.state.notes.map((note,i)=>{
              return (
                <Note forNav={true} id={note.id} removeNoteFromDb={this.removeNoteFromDb} selectNote={this.selectNote} addNote={this.addNote} title={note.title} content={note.content} pos={i} key={note.id}/> 
              )
            })
          }
        </div>
        <div className="main">
          <NoteCreator id={`${this.state.currentNote.id}`} content={this.state.currentNote.content} title={this.state.currentNote.title} insertNoteToDB={this.insertNoteToDB} updateNoteInDB={this.updateNoteInDB}/>
        </div>
        <div className="popups">
          <button className="add-note" onClick={this.newNote.bind(this)}><i className="fas fa-2x fa-plus"></i></button>
        </div>
      </div>

    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App name="note-app" />,
    document.querySelector('#app-container')
  )
})
