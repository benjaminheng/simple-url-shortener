import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';

class App extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            type: undefined,
            data: undefined
        }
        this.state = this.initialState;
    }

    updateState(type, data) {
        this.setState({
            type: type,
            text: data[type]
        });
    }

    resetState() {
        this.setState(this.initialState);
    }

    getShortId() {
        const url = this.refs.input.value;
        if (!url) {
            this.resetState();
            return;
        }
        console.log('url -> ' + url);
        fetch(`/api/getShortId?url=${url}`)
            .then(response => response.json())
            .then(json => this.updateState('shortId', json));
    }

    getLongUrl() {
        const shortId = this.refs.input.value;
        if (!shortId) {
            this.resetState();
            return;
        }
        fetch(`/api/getLongUrl?shortid=${shortId}`)
            .then(response => response.json())
            .then(json => this.updateState('url', json));
    }

    render() {
        return (
            <div className='content'>
                <div className='input-wrapper'>
                    <input ref='input' placeholder='URL or ShortID' />
                </div>
                <div className='buttons-wrapper'> 
                    <button onClick={e => this.getShortId()} >Get Short ID</button>
                    <button onClick={e => this.getLongUrl()} >Get Long URL</button>
                </div>

                {this.state.type === 'shortId' &&
                    <div className='output-text'>
                        Short URL: <span className='faded'>http://example.com/</span>
                        <strong>{this.state.text}</strong>
                    </div>
                }
                {this.state.type === 'url' &&
                    <div className='output-text'>
                        Long URL: <strong>{this.state.text}</strong>
                    </div>
                }
            </div>
        );
    }
}

export default App;

