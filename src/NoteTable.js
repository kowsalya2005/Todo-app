import React from 'react';

const NoteTable = (props) => {
    const notes = props.notes;
    let noteRows = ""
    if(notes.length>0){
         noteRows = notes.map(note => {

            let classes = `small ${!!note.isNew ? 'table-success' : ''}`;
            
            return (
                <tr key={note.id.toString()} id={`todo-item${note.id}`} className={classes}>
                    <td className="align-middle" style={{width: '80px'}}>
                        <div className="d-flex flex-row">
                            <div data-toggle="tooltip" data-placement="top" title="Edit Note" id={`edit-item${note.id}`} className="p-2 pointer" onClick={() => props.onOpenEditNoteModal(note.id)}>
                                <i className="fa fa-pencil fa-lg text-primary"></i>
                            </div>
                            <div data-toggle="tooltip" data-placement="top" title="Delete Note" id={`delete-item${note.id}`} className="p-2 pointer" onClick={() => props.onDeleteNote(note.id)}>
                                <i className="fa fa-trash fa-lg text-danger"></i>
                            </div>
                        </div>                
                    </td>
                    <td className="align-middle" id={`todo-title${note.id}`}>{note.title}</td>
                    <td className="align-middle" id={`todo-content${note.id}`}>
                        <span className="d-inline-block text-truncate" style={{maxWidth: '200px'}}>
                            {note.content}
                        </span>                
                    </td>
                    <td className="align-middle" id={`todo-tag${note.id}`}>{note.tags.join(",")}</td>
                </tr>
            );
        });
    }
    else {
        noteRows = <tr ><td colSpan="4" align="center">No Items found</td></tr>
    }
    

    return (
            <table className="table table-bordered table-striped table-hover" id="todo-table">
                <thead>
                    <tr>
                        <th></th>
                        <th className="align-middle text-center">Title</th>
                        <th className="align-middle text-center">Content</th>
                        <th className="align-middle text-center">Tags</th>
                    </tr>
                </thead>
                <tbody>
                    {noteRows}
                </tbody>
            </table>
    );
};



export default NoteTable;
