import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'


class NoteCreator extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            newNoteContent: '',
            newNoteTitle: '',
        };        
    }

    handleTitleInput(e){
        console.log(this);
        this.setState({
            newNoteTitle: e.target.value,
        })
    }

    handleContentInput(e){
        console.log(this);
        this.setState({
            newNoteContent: e.target.value,
        })
    }

    writeNote(e){
        this.props.addNote({content: this.state.newNoteContent, title: this.state.newNoteTitle}, this.newnote = true)
        this.setState({
            newNoteTitle: '',
            newNoteContent: '',
        })
    }

    render(){
        return(
            <div className="formWrapper">
                <input className="noteInput" onChange={this.handleTitleInput.bind(this)} value={this.state.newNoteTitle} placeholder="Title.." type="text"/>  
                <textarea className="noteInput" onChange={this.handleContentInput.bind(this)} value={this.state.newNoteContent} placeholder="Content.." type="text"/>
                <button onClick={this.writeNote.bind(this)} className="noteButton">Add</button>
            </div>
        )
    }
}
export default NoteCreator;