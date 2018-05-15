// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Note from './note'
import NoteCreator from './note_creator'
import axios from 'axios'
import update from 'immutability-helper';
import './app.css';

class App extends React.Component{

  constructor(props){
    super(props);
    this.addNote = this.addNote.bind(this);
    this.selectNote = this.selectNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
  
    this.state = {
      notes: [

        ],
      currentNote: {},
    }
  }

  componentDidMount(){
    this.getNotes();
  }

  addNote(note, newnote = false){
    const currNote = this.state.currentNote;
    const previousNotes = this.state.notes;
    const noteToAdd = {id: note.id, noteTitle: note.title, noteContent: note.content, pos: previousNotes.length}
    previousNotes.push(noteToAdd);
    this.setState({
      notes: previousNotes,
      currentNote: currNote,
    })
    if (newnote){
      this.insertNoteToDB(noteToAdd);
    }
    console.log(this.state);
  }

  insertNoteToDB(note){
    const csrf = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    axios.post(
      '/notes', 
    {
      title: note.noteTitle,
      content: note.noteContent,
      tags: 'tag'
    },
    {
      headers: { 'X-CSRF-Token': csrf }
    }
    )
    .then(function (response) {
      console.log("succesfully added");
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  removeNoteFromDb(id){
    const csrf = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    console.log(id);
  }

  removeNote(data){
    const currNote = this.state.currentNote;
    console.log(data.pos, 'this is the index..');

    const previousNotes = this.state.notes
    
    previousNotes.splice(data.pos, 1);

    console.log(previousNotes);

    // this.setState({
    //   notes: previousNotes,
    //   currentNote: currNote,
    // },function(){
    //   console.log(this.state);
    // });

    console.log(this.state.previousNotes);
    update(this.state, { notes: { $splice: [[data.pos, 1]] } });

    console.log(this.state);
  }

  getNotes(){
    axios.get('/notes.json')
      .then(
        response=>(
          response.data.map((note)=>{
            this.addNote({id: note.id, title: note.title, content: note.content, tags: note.tags});
          })
        )
      );
  }

  selectNote(note){
    var currNote = this.state.currentNote;
    const previousNotes = this.state.notes;

    // const currNote2 = update(currNote, {noteContent: {$set: note.noteContent}});
    currNote.noteContent = note.noteContent
    currNote.noteTitle = note.noteTitle

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
        <div className = "header">
          <h1>Note</h1>
        </div>
        <div className="nav">
          <h3>Note List</h3>

          {
            this.state.notes.map((note,i)=>{
              return (
                <Note forNav={true} id={note.id} removeNote={this.removeNote} selectNote={this.selectNote} addNote={this.addNote} noteTitle={note.noteTitle} noteContent={note.noteContent} pos={note.pos} key={i}/> 
              )
            })
          }
        </div>
        <div className="main">
          <h3>Create a note</h3>
          <NoteCreator addNote={this.addNote}/>
          <div>   
            <Note forNav={false} selectNote={this.selectNote} addNote={this.addNote} noteTitle={this.state.currentNote.noteTitle} noteContent={this.state.currentNote.noteContent}/>
          </div>
        </div>
      </div>

    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App name="note-app" />,
    document.querySelector('#app')
  )
})
