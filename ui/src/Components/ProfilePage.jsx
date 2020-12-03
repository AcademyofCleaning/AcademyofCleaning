import React from 'react';
import styled from 'styled-components';
import { Form, Table, Button, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './auth/Loading';
import querySearch from "stringquery";

const URL = "https://bixe448nsa.execute-api.us-west-1.amazonaws.com/dev/viewProfile?";
// const URL = "http://localhost:3001/dev/viewProfile?"

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
      admin:false,
      verified:0,
    }

    this.handlePendingVerParam = this.handlePendingVerParam.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount()
  {
    const url = URL + `id=${this.state.props.match.params.id}`;
    const resp = await fetch(url);
    const data = await resp.json();
    var adminState = querySearch(this.props.location.search).admin;
    this.setState({profile: data, loading: false, admin: adminState});
  }

  handlePendingVerParam(event){
    if(event.target.name === "true"){
      this.setState({verified: 1});
    } else{
      this.setState({verified: 0});
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const url = URL + `id=${this.state.props.match.params.id}&verified=${this.state.verified}`;
    fetch(url)
    .then(res => res.json())
    .then(res => {
      this.setState({profile: res})
    })
    this.render()
};

  render(){
    const editOrValidateCTAs = ()=>{
      if(this.state.admin == 1){ //validate CTAs displayed
          // Currently displays "Took Pic File Uploaded" above the field, which seems incorrect. Until clarification, commenting out.
          return(
            <div>
              <Form onSubmit={ this.handleSubmit }>
                <div className="row-buffer side-buffer">
                  <p className="right-align">Applicant Status:</p>
                  <FormGroup className="right-align" check row>
                    <Button type="submit" name="false" onClick={this.handlePendingVerParam} style={{margin: '5px'}}>More Information Required</Button>
                    <Button type="submit" name="true" onClick={this.handlePendingVerParam} style={{backgroundColor: '#4CAF50'}}>Verify Candidate</Button>
                  </FormGroup>
                </div>
              </Form>
            </div>
          ) 
      } else{ //edit profile CTA
        return (
          <Form>
            <div className="right-align" style={{marginRight: '100px'}}>
            <Link to= {`/profiles/edit/${this.state.profile.result.profile_id}`}className="btn btn-secondary">Edit this profile</Link>
            </div>
          </Form>

        )
      }
  }
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
                  {/* must be updated in the GET ticket to import the state directly from the DB */}
                    <td>{this.state.profile.result.app_status}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          )}
        </Form>
        {editOrValidateCTAs()}
        
      </div>
    );
    }
  }

};
