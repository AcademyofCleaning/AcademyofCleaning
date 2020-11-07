import React from 'react';
import styled from 'styled-components';
import { Col, Form, FormGroup, Label, Row, Table } from 'reactstrap';
import NavBar from './NavBar';

/* Illustration of how to use a styled component 
  1. create a styled component with the given syntax
  2. instead of using <h3> tag, now use <H3> or whatever
      the variable name is set to 
*/
const H3 = styled.h3`
  margin-top: 40px;
  margin-bottom: 40px;
`;

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
      <div>
        <NavBar />
        <Form>
          {this.state.loading === (
            <div>Loading...</div>
          )}
          {!this.state.profile ? (
            <div> Profile Does Not Exist </div>
          ) : (
            <div>
              <H3>{this.state.profile.result.first_name} {' '}
              {this.state.profile.result.last_name}</H3>
              <Table responsive>
                <tbody>
                <tr>
                    <td>Email</td>
                    <td>placeholder@gmail.com</td>
                  </tr>
                  <tr>
                    <td>Phone Number</td>
                    <td>{this.state.profile.result.contact_num}</td>
                  </tr>
                  <tr>
                    <td>Extension</td>
                    <td>{this.state.profile.result.contact_ext}</td>
                  </tr>
                </tbody>
              </Table>
              {/* <FormGroup row>
                  <Label sm={6}>Contact Number</Label>
                  <Label sm={6}>{this.state.profile.result.contact_num}</Label>
                  <Label sm={6}>Extension</Label>
                  <Col sm={6}>
                    <Label sm={6}>{this.state.profile.result.contact_ext}</Label>
                  </Col>
              </FormGroup> */}
            </div>
          )}
        </Form>
      </div>
    );
  }

};
