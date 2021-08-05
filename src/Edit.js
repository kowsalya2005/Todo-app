import React from 'react';
class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            title: props.elementToBeEdited[0].title,
            content: props.elementToBeEdited[0].content,
            tags: props.elementToBeEdited[0].tags,
            messagetitle: '',
            messagecontent: '',
            messagetags: '',
        }
    }
    changeHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]: value,
        })

    }

    submitEditDetails = (e) => {
        e.preventDefault();
        if (this.state.title === undefined || this.state.content === undefined || this.state.tags === undefined) {
            if (this.state.title === undefined && this.state.content === undefined && this.state.tags === undefined) {
                this.setState({
                    messagetitle: 'title is required',
                    messagecontent: 'content is required',
                    messagetags: 'tags is required',
                })
            } else if (this.state.content === undefined) {
                this.setState({ messagecontent: 'content is required' })
            } else if (this.state.tags === undefined) {
                this.setState({ messagetags: 'tags is required' })
            } else if (this.state.title === undefined || this.state.title === null) {
                this.setState({ messagetitle: 'title is required' })
            }
        } else {
            this.props.submitEditDetails(this.state);
        }


    }


    render() {

        return (
            <div className='search'>
                <h4>New Note</h4>
                <div id='close-modal'>
                    <button onClick={this.props.closeModal}>X</button>
                </div>
                <form>
                    <div className='form-group'>
                        <label>Title</label><br></br>
                        <input
                            name='title'
                            id='title'
                            type='text'
                            value={this.state.title}
                            onChange={this.changeHandler}
                        />
                        <div id='errorMessage' className='errormsg'>{this.state.messagetitle}</div>
                    </div>
                    <div className='form-group'>
                        <label>Content</label><br></br>
                        <textarea
                            name='content'
                            id='content'
                            type='text'
                            value={this.state.content}
                            onChange={this.changeHandler}
                            required />
                        <div id='errorMessage' className='errormsg'>{this.state.messagecontent}</div>
                    </div>
                    <div className='form-group'>
                        <label>Tags</label><br></br>
                        <input
                            name='tags'
                            id='tags'
                            type='text'
                            value={this.state.tags}
                            onChange={this.changeHandler}
                            required />
                        <div id='errorMessage' className='errormsg'>{this.state.messagetags}</div>
                    </div>
                    <button id='btn-save' type="button" onClick={this.submitEditDetails}>Save</button>
                    <button id='btn-cancel' onClick={this.props.closeModal}>Cancel</button>

                </form>
            </div>



        )
    }
}

export default Edit;
