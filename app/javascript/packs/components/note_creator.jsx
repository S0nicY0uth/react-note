import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'


class NoteCreator extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            content: '',
            title: '',
        };      
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
                <button onClick={this.saveNote.bind(this)} className="noteButton"><i class="far fa-3x fa-save"></i></button>
            </div>
        )
    }
}
export default NoteCreator;