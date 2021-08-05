import React, { Component } from 'react';


class AddNoteForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            content: '',
            tags: [],
            validationErrors: []
        };

    }

    
    onTitleChange = (event) =>{
        const title = event.target.value.trim();

        this.validateTitle(title);

        this.setState({ title: title });
    }


    onContentChange = (event) => {
        const content = event.target.value.trim();

        this.validateContent(content);
        
        this.setState({ content: content });
    }


    onTagsChange = (event) => {
        const tags = event.target.value.trim();
           
            this.setState({ tags: tags.split(',')});
    }

    
     
    onSave = (event) =>{
        event.preventDefault();

        if (this.state.validationErrors && this.state.validationErrors.length === 0) {
            const { title, content } = this.state;
            
            if (this.validateTitle(title) && this.validateContent(content)) {
                this.props.onSaveNote({
                    id: this.state.id,
                    title: this.state.title,
                    content: this.state.content,
                    tags: this.state.tags
                });
            }
        }
    }
    

    validateTitle = (title) => {
        const message = 'Title is required';

        if (title === '') {
            this.addValidationError(message);
            return false;
        } else {
            this.removeValidationError(message);
            return true;
        }
    }


    validateContent = (content) => {
        const message = 'Content is required';

        if (content === '') {
            this.addValidationError(message);
            return false;
        } else {
            this.removeValidationError(message);
            return true;
        }
    }


    

    
    addValidationError = (message) => { 
        let validationErrors = this.state.validationErrors;
        validationErrors.push({message});
        this.setState( {
                validationErrors: validationErrors
        });      
    }

    
    removeValidationError = (message) => {
        
        let validationErrors = this.state.validationErrors;
        validationErrors = validationErrors.filter(error => error.message !== message);;
        this.setState( {
                validationErrors: validationErrors
        });     
    }

    
    render() {

        const validationErrorSummary = this.state.validationErrors.map((error,index) => 
            <div key={index} className="alert alert-danger" id="errorMessage">
                {error.message}
            </div>
        );

        return (
            <div className="card card-body">
                <div className="mb-2">        
                    <span className="h4 my-auto"><i className="fa fa-file-text-o fa-lg"></i> New Note</span>
                    <div className="float-right ml-auto" id="close-modal" onClick={this.props.onCloseModal}>
                        <i className="fa fa-remove fa-2x mr-2 text-danger"></i>
                    </div>
                </div>
                {validationErrorSummary}
                <form onSubmit={this.onSave} className="mt-2" id="add-item-form">
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" id="title" name="title" autoComplete= "off" autoFocus onChange={this.onTitleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <textarea className="form-control" name="content" id="content" rows="3" autoComplete= "off" onChange={this.onContentChange}></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="tags">Tags</label>
                        <input type="text" className="form-control" name="tags" id="tags" autoComplete= "off" onChange={this.onTagsChange} />
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-4 col-md-3 col-xl-2 ml-auto">
                            <button type="submit" className="btn btn-success btn-lg btn-block" id="btn-save">
                                <i className="fa fa-save mr-2"></i>Save
                            </button>
                        </div>
                        <div className="col-sm-4 col-md-3 col-xl-2">
                            <button className="btn btn-danger btn-lg btn-block mt-2 mt-sm-0"
                                onClick={this.props.onCloseModal}
                                type="button" id="btn-cancel">
                                <i className="fa fa-remove mr-2"></i>Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}



export default AddNoteForm;