import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Container, Grid } from '@mui/material';
import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import fileDialog from 'file-dialog'

class AudioDropzone extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        window.addEventListener('dragenter', this.showDropzone);
        // window.addEventListener('dragleave', this.hideDropZone);
    }

    componentWillUnmount() {
        window.removeEventListener('dragenter', this.showDropzone);
        // window.removeEventListener('dragleave', this.hideDropZone);
    }

    showDropzone = () => {
        this.setState({ dropzoneEnabled: true });
        console.log('DragEnter!');
    }

    hideDropZone = (a) => {
        this.setState({ dropzoneEnabled: false });
        console.log('DragLeave!');
        // debugger;
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
        this.onDrop(e.dataTransfer.files);
    }

    onDrop = (files) => {
        let array = Array
            .from(files)
            .filter(x => x.name.toLowerCase().endsWith(".aax"));

        if (array.length > 0) {

            this.props.onDrop(array);
        }
    }

    render() {
        const { dropzoneEnabled } = this.state;

        return (
            <>
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
                        height: '100vh',
                        pointerEvents: 'none',
                    }}>
                        <h1>
                            Drop the files here ...
                        </h1>
                    </div>

                </div>
                <Grid
                    item
                    sm={12}
                >
                    <Card>
                        <CardContent
                            style={{ paddingTop: '20px' }}
                            onClick={async () => {
                                let files = await fileDialog({ multiple: true, accept: '.aax' });
                                this.onDrop(files);
                            }}
                        >
                            <div className='dummyDropZone'>
                                <p>Drag 'n' drop some files here, or click to select fil es</p>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </>
        );
    }
}


AudioDropzone.propTypes = {
    onDrop: PropTypes.func
};

AudioDropzone.defaultProps = {
    onDrop: (files) => { }
};

export default AudioDropzone;