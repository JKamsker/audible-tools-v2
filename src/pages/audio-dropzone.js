import React, { Component } from 'react';

class AudioDropzone extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    window.addEventListener('dragenter', this.showDropzone);
  }

  componentWillUnmount() {
    window.removeEventListener('dragenter', this.showDropzone);
  }

  showDropzone() {
      // TODO
  }

  render() {
    return (
      <div className='dropzone'>
        
      </div>
    );
  }
}


export default AudioDropzone;
