import React, { Component } from 'react';
import { Box, Container, Grid } from '@mui/material';


class AudioDropzone extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    componentDidMount() {
        window.addEventListener('dragenter', this.showDropzone);
    }

    componentWillUnmount() {
        window.removeEventListener('dragenter', this.showDropzone);
    }

    showDropzone = () => {
        this.setState({ dropzoneEnabled: true });
        console.log('DragEnter!');
    }

    hideDropZone = () => {
        this.setState({ dropzoneEnabled: false });
        console.log('DragLeave!');
    }

    allowDrag(e) {
        if (true) {  // Test that the item being dragged is a valid one
            e.dataTransfer.dropEffect = 'copy';
            e.preventDefault();
        }
    }

    handleDrop = (e) => {
        e.preventDefault();
        this.hideDropZone();

        alert('Drop!');
    }

    render() {
        const { dropzoneEnabled } = this.state;

        return (
            <div className='dropzone'
                style={{ display: dropzoneEnabled ? 'block' : 'none' }}
                onDragEnter={this.allowDrag}
                onDragOver={this.allowDrag}
                onDrop={this.handleDrop}
                onDragLeave={this.hideDropZone}
            >
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh'
                }}>
                    <h1>
                        Drop the files here ...
                    </h1>
                </div>

            </div>
        );
    }
}


export default AudioDropzone;
