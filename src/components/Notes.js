import React, { Component } from 'react';
import { ReactMic } from 'react-mic';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Container,
  Row,
  Col,
  Input
} from 'reactstrap'

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
      blobs: [],
    }
  }



  startRecording = () => {
    this.setState({
      record: true
    });
  }

  stopRecording = (e) => {
    this.setState({
      record: false
    });
  }

  onData(recordedBlob) {
    // console.log('chunk of real-time data is: ', recordedBlob);
  }

  onStop = (recordedBlob) => {
    // console.log('recordedBlob is: ', recordedBlob);
    this.props.getMyLocation()

    let date = new Date()
    let blobURL = recordedBlob.blobURL
    let latitude = this.props.latitude
    let longitude = this.props.longitude
    let newBlob = {date, blobURL, latitude, longitude}
    let newBlobs = [ ...this.state.blobs, newBlob ]
    console.log(newBlobs)
    this.setState({
      blobs: newBlobs
    })
  }

  render(){
    return (<Container fluid={true}>
      <Row>
        <Col xl="3"></Col>
        <Col xl="6">
          <Form className="p-4" id="initial-form">
              <ReactMic
                record={this.state.record}
                className="sound-wave"
                onStop={this.onStop}
                onData={this.onData}
                strokeColor="#000000"
                backgroundColor="#FFFFFF" />
              <br />
              <Button color="primary" onClick={this.startRecording}>Start</Button>
              <Button color="primary" onClick={this.stopRecording}>Stop</Button>
          </Form>

        </Col>
        <Col xl="3"></Col>
      </Row>
    </Container>
  )}
}

export default Notes
