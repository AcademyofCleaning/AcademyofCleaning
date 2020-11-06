import React from 'react';
import { Col, Form, FormGroup, Label } from 'reactstrap';

export default class ProfilePage extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      loading: true,
      profile: null,
      props: props,
    }
  }

  async componentDidMount()
  {
    const url = `https://bixe448nsa.execute-api.us-west-1.amazonaws.com/dev/viewProfile?id=${this.state.props.match.params.id}`;
    const resp = await fetch(url);
    const data = await resp.json();
    console.log();
    this.setState({profile: data, loading: false});
  }

  render(){
    return(
      <Form>
        {this.state.loading || !this.state.profile ? (
          <div> Profile Does Not Exist </div>
        ) : (
          <div>
            <FormGroup row>
              <Label sm={2}>Your Profile</Label>
            </FormGroup>
            <FormGroup row>
                <Label for="name" sm={2}>First Name</Label>
                <Col sm={10}>
                  <Label for="name" sm={2}>{this.state.profile.result.first_name}</Label>
                </Col>
                <Label for="name" sm={2}>Last Name</Label>
                <Col sm={10}>
                  <Label for="name" sm={2}>{this.state.profile.result.last_name}</Label>
                </Col>
                <Label for="name" sm={2}>Contact Number</Label>
                <Col sm={10}>
                  <Label for="name" sm={2}>{this.state.profile.result.contact_num}</Label>
                </Col>
                <Label for="name" sm={2}>Extension</Label>
                <Col sm={10}>
                  <Label for="name" sm={2}>{this.state.profile.result.contact_ext}</Label>
                </Col>
            </FormGroup>
          </div>
        )}
      </Form>
    );
  }

};
