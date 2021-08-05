import React, { Component } from 'react';

class ControlPanel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: ''
        };

        
    }

    onSearchTitleChanged = (event)=> {
        const title = event.target.value;
        this.props.onFindNotes(title)
        this.setState({title});
        
    }

    render () {
        return (
            <div>
                <div className="input-group input-group-lg">
                    <span className="input-group-btn">
                        <button className="btn btn-primary" id="add-item" type="button" onClick={this.props.openAddNoteModal}>
                            <i className="fa fa-plus"></i>
                        </button>
                    </span>
                    <input type="text" className="form-control" id="search-item-input" placeholder="Search for note by title ..." value={this.state.title} onChange={this.onSearchTitleChanged} />
                    <span className="input-group-btn">
                        <button className="btn btn-primary" id="search-item-button" type="button" onClick={() => this.props.onFindNotes(this.state.title)} >
                            <i className="fa fa-search"></i>
                        </button>
                    </span>
                </div>        
            </div>
        );
    }
}



export default ControlPanel;