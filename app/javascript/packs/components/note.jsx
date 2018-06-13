// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'


class Note extends React.Component {
    constructor(props) {
        super(props);
        this.title = props.title;
        this.content = props.content;
        this.noteId = props.noteId;
        this.forNav = props.forNav;
        this.id = props.id;
        this.pos = props.pos

    }



    noteClicked(e){
        console.log(this.content);
        this.props.selectNote({id: this.id, content: this.content, title: this.title})
    }

    delNote(e){
        // console.log(this.dbId);
        this.props.removeNoteFromDb(this.id);
    }

   


    render(props){
        if(this.forNav){
            return (
                <div id={this.id} onClick={this.noteClicked.bind(this)}  className="note">
                   <h5 className="noteContent">{this.title}</h5>
                   <p className="noteContent">{this.content.substring(0, 10)}..</p>
                   <button onClick={this.delNote.bind(this)} className="noteButton">
                    <i className="fas fa-trash"></i>
                   </button>
                </div>
            )
        }else {
            return (
                <div id={this.id} onClick={this.noteClicked.bind(this)}  className="note">
                   <h5 className="noteContent">{this.props.title}</h5>
                   <p className="noteContent">{this.props.content}</p>
                </div>
            )
        }
    }
}

Note.propTypes = {
    content: PropTypes.string
}

export default Note;