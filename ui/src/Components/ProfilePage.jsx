import React from 'react';
import { Col, Form, FormGroup, Label, Input } from 'reactstrap';

export default class ProfilePage extends React.Component {
  state = {
    loading: true,
    profile: null,
    edit:"readonly",
    id:"ewewew"
  }

  async componentDidMount()
  {
    const url = 'https://bixe448nsa.execute-api.us-west-1.amazonaws.com/dev/home';
    const resp = await fetch(url);
    const data = await resp.json();
    this.setState({profile: data, loading: false});
    console.log(data);
  }

  render(){
    return(
      <Form>
        {this.state.loading || !this.state.profile ? (
          <div> Profile loading </div>
        ) : (
          <div>
            <FormGroup row>
              <Label sm={2}>Your Profile</Label>
            </FormGroup>
            <FormGroup row>
                <Label for="name" sm={2}>Name</Label>
                <Col sm={10}>
                  <Label for="name" sm={2}>{this.state.profile.message}</Label>
                </Col>
                {/*
                <Label for="name" sm={2}>Name</Label>
                <Col sm={10}>
                <Input type="text" name="name" id="name" placeholder={this.state.profile.message}/>
                </Col>
                */}
            </FormGroup>
          </div>
        )}
      </Form>
    );
  }

};
