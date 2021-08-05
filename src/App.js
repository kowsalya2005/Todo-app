import React, { Component } from 'react';
import Header from './Header';
import NoteManager from './NoteManager';
export default class App extends Component {
        render() {
        return (
            <div>
                <Header />
                <div className="container mt-5">
                  <NoteManager/>
                </div>
                
            
            </div>
        );
    }
}