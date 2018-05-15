// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class Note extends React.Component {
    constructor(props) {
        super(props);
        this.noteTitle = props.noteTitle;
        this.noteContent = props.noteContent;
        this.noteId = props.noteId;
        this.forNav = props.forNav;
        this.id = props.id;
        this.pos = props.pos
    }

    noteClicked(e){
        this.props.selectNote({noteContent: this.noteContent, noteTitle: this.noteTitle})
    }

    delNote(e){
        // console.log(this.dbId);
        this.props.removeNote({id: this.id, pos: this.pos});
    }


    render(props){
        if(this.forNav){
            return (
                <div id={this.id} onClick={this.noteClicked.bind(this)}  className="note">
                   <h5 className="noteContent">{this.noteTitle}</h5>
                   <p className="noteContent">{this.noteContent}</p>
                   <button onClick={this.delNote.bind(this)} className="noteButton">Del</button>
                </div>
            )
        }else {
            return (
                <div id={this.id} onClick={this.noteClicked.bind(this)}  className="note">
                   <h5 className="noteContent">{this.props.noteTitle}</h5>
                   <p className="noteContent">{this.props.noteContent}</p>
                </div>
            )
        }
    }
}

Note.propTypes = {
    noteContent: PropTypes.string
}

export default Note;