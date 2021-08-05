import React, { Component } from 'react';
import Modal from 'react-modal';
import AddNoteForm from './AddNoteForm';
import EditNoteForm from './EditNoteForm';
import NoteTable from './NoteTable';
import ControlPanel from './ControlPanel';

class NoteManager extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            details : [],
            notes: [],
            selectedNote: null,
            isAddNoteModalOpen: false,
            isEditNoteModalOpen: false
        };
        this.todoId = 1;
        
    }

componentDidMount = () =>{
 this.setState({
     notes : this.state.details
 })   
}

    handleOnDeleteNote = (noteId)=> {

        let notes = this.state.notes.filter(n=>{
            return n.id !== noteId
        });
        this.setState({
            notes,
            details:notes
        })
        

        
    }


    handleOnFindNotes = (title) => {
        if (!title || title === '') {
            this.setState({
                     notes : this.state.details
                 }) 
              
            return;
        }
        else{
             let search = this.state.details.filter(a=>{
              return  a.title.toLowerCase().includes(title.toLowerCase())
            })
             this.setState({
                     notes : search
                 })
        }
        
    }


    handleOnAddNote = (note) => {

        this.setState({ isAddNoteModalOpen: false });

        const { title, content, tags } = note;

        let newNote = this.state.notes
          newNote.push({id:this.todoId,title,content, tags})
        this.setState({
            notes:newNote,
            details:newNote
        })
        this.todoId = this.todoId + 1;
      
    }


    handleOnCloseAddNoteModal = () =>{
        this.setState({isAddNoteModalOpen: false});
    }


    handleOpenAddNoteModal = () =>{
        this.setState({isAddNoteModalOpen: true});
    }


    handleOnCloseEditNoteModal = () =>{
        this.setState({isEditNoteModalOpen: false});
    }


    handleOpenEditNoteModal = (noteId) => {
        if (!noteId || noteId < 1) {
            throw Error('Cannot edit note. Invalid note id specified.');
        }
        else{
            let selectedNote = this.state.notes.filter(select => {
                return select.id === noteId
            })
            this.setState({
                selectedNote,
                isEditNoteModalOpen : true,
            })
        }
       
    }


    handleOnEditNote = (note) =>{
        this.setState({ isEditNoteModalOpen: false });
        
        const { title, content, tags } = note;
        let notes = this.state.notes
            notes.forEach(n =>{
            if(n.id === note.id){
              n.title =  title;
              n.content = content;
                n.tags = tags
            }
        })
        this.setState({
            notes,
            details:notes
        })

        
    }


    render() {
        return (
            <div>                                
                <Modal isOpen={this.state.isAddNoteModalOpen} onRequestClose={this.handleOnCloseAddNoteModal} ariaHideApp={false}>
                    <AddNoteForm onSaveNote={this.handleOnAddNote} onCloseModal={this.handleOnCloseAddNoteModal} />
                </Modal>
                <Modal isOpen={this.state.isEditNoteModalOpen} onRequestClose={this.handleOnCloseEditNoteModal} ariaHideApp={false}>
                    <EditNoteForm onSaveNote={this.handleOnEditNote} onCloseModal={this.handleOnCloseEditNoteModal} note={this.state.selectedNote} />
                </Modal>
                <div className="mb-3">
                    <ControlPanel openAddNoteModal={this.handleOpenAddNoteModal} onFindNotes={this.handleOnFindNotes} />
                </div>
                <NoteTable notes={this.state.notes} onDeleteNote={this.handleOnDeleteNote} onOpenEditNoteModal={this.handleOpenEditNoteModal} />
            </div>
        );
    }
}

export default NoteManager;