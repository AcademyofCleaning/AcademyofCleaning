import React from 'react';
import styled from 'styled-components';
import { Form, Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './auth/Loading';

/* Illustration of how to use a styled component 
  1. create a styled component with the given syntax
  2. instead of using <h3> tag, now use <H3> or whatever
      the variable name is set to 
*/
const H3 = styled.h3`
  margin-top: 40px;
  margin-bottom: 40px;
  margin-left: 15px;
  text-align: left;
`;

const H4 = styled.p`
  margin-top: 40px;
  margin-bottom: 40px;
  margin-left: 15px;
  text-align: left;
`;

const toolPicUrl = 'https://cleaner-tool-pics.s3-us-west-1.amazonaws.com/'

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
    this.setState({profile: data, loading: false});
  }

  render(){
    if (this.state.loading == true) {
      return(
       <Loading/> 
      );
    } else {
    return(
      <div>
        <Form>
          {!this.state.profile && this.state.loading == false ? (
            <div> Profile Does Not Exist </div>
          ) : (
            <div className="row-buffer side-buffer left-align">
              <h4>{this.state.profile.result.first_name} {' '}
              {this.state.profile.result.last_name}</h4>
              {this.state.profile.result.city ? <H4>Servicing the {this.state.profile.result.city} area</H4> : <div/>}
              <Table className="row-buffer" responsive>
                <tbody>
                  <tr>
                    <td>Email</td>
                    <td>{this.state.profile.result.email}</td>
                  </tr>
                  <tr>
                    <td>Phone Number</td>
                    <td>{this.state.profile.result.contact_num}</td>
                  </tr>
                  <tr>
                    <td>Extension</td>
                    <td>{this.state.profile.result.contact_ext}</td>
                  </tr>
                  <tr>
                    <td>Location</td>
                    <td>{this.state.profile.result.city}</td>
                  </tr>
                  {this.state.profile.result.has_tools ? (
                  <tr>
                    <td>Tool Pictures</td>
                    <td><a target="_blank" href={toolPicUrl + this.state.profile.result.profile_id + '.pdf'}>Tool Picture Link</a></td>
                  </tr>
                  ) : <div/>}
                  <tr>
                    <td>Id Verified</td>
                    {this.state.profile.result.gov_id ? <td>Verified</td> : <td>Not Verified</td> }
                  </tr>
                </tbody>
              </Table>
              <div className="right-align">
                <Link to= {`/profiles/edit/${this.state.profile.result.profile_id}`}className="btn btn-secondary">Edit this profile</Link>
              </div>
            </div>
          )}
        </Form>
      </div>
    );
    }
  }

};
