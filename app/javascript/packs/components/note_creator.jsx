import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';



class NoteCreator extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            content: '',
            title: '',
            editorState: EditorState.createEmpty()
        };
        
        this.onChange = (editorState) => this.setState({editorState});      
    }

    
    static getDerivedStateFromProps(nextProps, prevState){
        return nextProps;
      }

    handleTitleInput(e){
        this.setState({
            title: e.target.value,
        }) 
    }

    handleContentInput(e){
        this.setState({
            content: e.target.value,
        })
    }

    noteExists(){
        if(this.props.id){
            return true;
        } else {
            return false;
        }
    }

    saveNote(e){

        if (!this.noteExists()){
            this.props.insertNoteToDB({content: this.state.content, title: this.state.title}, this.newnote = true)
            this.setState({
                title: '',
                content: '',
            })
        } else {
            console.log('props id!', this.props.id);
            this.props.updateNoteInDB({content: this.state.content, title: this.state.title, id: this.props.id})
        }

    }

    render(){
        return(
            <div className="formWrapper">
                <input className="noteInput" onChange={this.handleTitleInput.bind(this)} value={this.state.title} placeholder="Title.." type="text"/>  
                <textarea className="noteInput" onChange={this.handleContentInput.bind(this)} value={this.state.content} placeholder="Content.." type="text"/>
                <button onClick={this.saveNote.bind(this)} className="noteButton"><i className="far fa-3x fa-save"></i></button>
                <Editor editorState={this.state.editorState} onChange={this.onChange} />
            </div>
        )
    }
}
export default NoteCreator;