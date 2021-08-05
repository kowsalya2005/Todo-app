import React from 'react';
import Form from './Form';
import Edit from './Edit';
class ItemList extends React.Component {
     constructor() {
        super();
        this.state = {
            search: '',
            isShowTable: true,
            tableElements: [],
            isSearch: false,
            title: '',
            content: '',
            tags: '',
            isEdit: false,
            elementToBeEdited: [],

        }
    }
    closeModal = () => {
        this.setState({
            isShowTable: !this.state.isShowTable,
        });
        console.log("showtable", this.state.isShowTable);
    }

    buttonSearch = () => {
        this.setState({ isSearch: true })
    }

    changeHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]: value,
        })

    }

    submitDetails = () => {
        let elements = [...this.state.tableElements];
        elements.push({
            title: this.state.title,
            content: this.state.content,
            tags: this.state.tags,
        });
        this.setState({
            tableElements: elements,
            title: '',
            content: '',
            tags: '',
            isShowTable: !this.state.isShowTable,

        })
    }

    deleteElement = (id) => {
        let itemdelete = this.state.tableElements;
        itemdelete = itemdelete.slice(0, id).concat(itemdelete.slice(id + 1, this.state.tableElements.length));
        this.setState({
            tableElements: itemdelete
        })
    }

    buttonSearch = () => {
        this.setState({ isSearch: true })
    }

    searchValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
        console.log(this.state.search);

    }

    editElement = (id) => {
        let itemedit = this.state.tableElements;
        itemedit = itemedit.splice(id, 1);
        let remelements = this.state.tableElements;
        remelements = remelements.slice(0, id).concat(remelements.slice(id + 1, this.state.tableElements.length));
        console.log("edit element", itemedit);
        console.log("rem elements", this.state.elementToBeEdited);
        console.log("before isShowTable click", this.state.isShowTable)
        console.log("before edit click", !this.state.isClickEdit)
        this.setState({
            tableElements: remelements,
            elementToBeEdited: itemedit,
            isShowTable: !this.state.isShowTable,
            isEdit: !this.state.isEdit,
        });
        console.log("after edit click", this.state.isClickEdit)
        console.log("after isShowTable click", this.state.elementToBeEdited)
    }

    submitEditDetails = (edit) => {
        console.log("submited elements", edit)
        let elements = [...this.state.tableElements];
        elements.push({
            title: edit.title,
            content: edit.content,
            tags: edit.tags,
        });
        console.log("edit title", elements);

        this.setState({
            tableElements: elements,
            isEdit: false,
            isShowTable: !this.state.isShowTable,
        })


    }



    render() {
        const tableContent = this.state.tableElements.map((table, index) => {
            return (<tr id={'todo-item' + (index + 1)}>
                <td>
                    <div id={'edit-item' + (index + 1)} className='table-button'>
                        <button onClick={() => { this.editElement(index) }}>edit</button>
                    </div>
                    <div id={'delete-item' + (index + 1)}>
                        <button onClick={() => { this.deleteElement(index) }}>delete</button>
                    </div>
                </td>
                <td>
                    <div id={'todo-title' + (index + 1)}>{table.title}</div>
                </td>
                <td>
                    <div id={'todo-content' + (index + 1)}>{table.content}</div>
                </td>
                <td>
                    <div id={'todo-tags' + (index + 1)}>{table.tags}</div>
                </td>
            </tr>

            )
        })


        const searchValue = this.state.tableElements.filter((val) => val.title === this.state.search).map((table, index) => {
            return (<tr id={'todo-item' + (index + 1)}>
                <td>
                    <div id={'edit-item' + (index + 1)} className='table-button'>
                        <button>edit</button>
                    </div>
                    <div id={'delete-item' + (index + 1)}>
                        <button onClick={() => { this.deleteElement(index) }}>delete</button>
                    </div>
                </td>
                <td>
                    <div id={'todo-title' + (index + 1)}>{table.title}</div>
                </td>
                <td>
                    <div id={'todo-content' + (index + 1)}>{table.content}</div>
                </td>
                <td>
                    <div id={'todo-tags' + (index + 1)}>{table.tags}</div>
                </td>
            </tr>

            )
        })

        return (
            <div className='todo'>
                {this.state.isShowTable ?
                    <div className='showTable'>
                        <h1>Todo Notes</h1>
                        <button id='add-item' onClick={this.closeModal}>+</button>
                        <input id='search-item-input'
                            type='search'
                            name='search'
                            value={this.state.search}
                            placeholder='Search for note by title...'
                            onChange={this.searchValue} />
                        <button id='search-item-button' onClick={this.buttonSearch}>search</button>
                        {this.state.tableElements.length > 0 ?
                            <table className='show-table'>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Title</th>
                                        <th>Content</th>
                                        <th>Tags</th>
                                    </tr>
                                </thead>
                                {this.state.isSearch ?
                                    <tbody>{searchValue}</tbody> :
                                    <tbody>{tableContent}</tbody>}
                            </table> :
                            <></>}
                    </div> : <>
                        {this.state.isEdit ?
                            <Edit elementToBeEdited={this.state.elementToBeEdited}
                                submitEditDetails={this.submitEditDetails}
                                closeModal={this.closeModal} /> :
                            <Form
                                title={this.state.title}
                                content={this.state.content}
                                tags={this.state.tags}
                                changeHandler={this.changeHandler}
                                submitDetails={this.submitDetails}
                                closeModal={this.closeModal}
                                tableElements={this.state.tableElements} />}

                    </>}
            </div>


        )
    }
}

export default ItemList;