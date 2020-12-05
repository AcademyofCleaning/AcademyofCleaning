import React from 'react';
import styled from 'styled-components';
import { Alert, Form, Table, Button, FormGroup } from 'reactstrap';
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
            <Link to= {`/profiles/edit/${this.state.profile.result.profile_id}`}className="btn btn-secondary">Edit Profile</Link>
            </div>
          </Form>

        )
      }
  }


  if (this.state.profile && this.state.profile.resultRefs) {
    const refs = this.state.profile.resultRefs;
    var refLen = Object.keys(refs).length;
    var references = [];

    // Builds table with JSON object items passed in

    if (refLen == 0) {
      references.push(<tr><th>Reference</th><td>Not Provided</td></tr>)
    }

    for (var i = 0; i < refLen; i++) {
      references.push(<tr><th>Reference {i+1}</th>
        <td><div>{refs[i].first_name} {refs[i].last_name}</div>
        <div>{refs[i].email}</div><div>{refs[i].contact_num.substring(0,3)}-{refs[i].contact_num.substring(3,6)}-{refs[i].contact_num.substring(6,10)} x {refs[i].contact_ext}</div>
        <div>{refs[i].relationship}</div></td></tr>)
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
            <div className="row-buffer side-buffer">
               {this.state.profile.result.app_status == 'Began Application' ? (
                  <Alert className="width-fit" color="primary">
                    Your application is in draft mode.
                    Submit your application to employers through Edit Profile > Submit
                  </Alert>                    
                  ) : <div/>}
                <Alert className="push-right" color="success">
                  APPLICATION STATUS: {this.state.profile.result.app_status}
                </Alert>
                <h4 className="push-left">{this.state.profile.result.first_name} {' '}
                {this.state.profile.result.middle_name} {' '}
                {this.state.profile.result.last_name}</h4>
              <div>
              </div>
              <Table responsive>
                <tbody>
                <tr>
                    <th>Email</th>
                    <td>{this.state.profile.result.email}</td>
                  </tr>
                  <tr>
                    <th>Phone Number</th>
                    {this.state.profile.result.contact_ext ? (
                    <td>{this.state.profile.result.contact_num.substring(0,3)}-{this.state.profile.result.contact_num.substring(3,6)}-{this.state.profile.result.contact_num.substring(6,10)}  x  {this.state.profile.result.contact_ext}</td>
                  ) : <td>{this.state.profile.result.contact_num}</td>}
                  </tr>
                  <tr>
                    <th>Address</th>
                    {this.state.profile.result.address ? (
                        <td><div>{this.state.profile.result.address}</div>
                        <div>{this.state.profile.result.city},  {this.state.profile.result.postal_code.substring(0,3)} {this.state.profile.result.postal_code.substring(3,6)}   {this.state.profile.result.province}</div>
                        </td>
                      ) : <td>Not Provided</td>}
                  </tr>
                  <tr>
                    <th>Date of Birth (MM/DD/YYYY)</th>
                    {this.state.profile.result.dob ? (
                      <td>{this.state.profile.result.dob.substring(0,2)}/{this.state.profile.result.dob.substring(2,4)}/{this.state.profile.result.dob.substring(4,8)}</td>
                      ) : <td>Not Provided</td>}
                  </tr>


                  {references}


                  <tr>
                    <th>Current Occupation</th>
                    {this.state.profile.result.dob ? (
                      <td>{this.state.profile.result.current_occup}</td>
                      ) : <td>Not Provided</td>}
                  </tr>
                  <tr>
                    <th>Canadian ID Provided?</th>
                    {this.state.profile.result.canadian_id ? (
                    <td>Yes</td>
                  ) : <td>No</td>}
                  </tr>
                  <tr>
                    <th>Health Insurance Provided?</th>
                    {this.state.profile.result.hin ? (
                    <td>Yes</td>
                  ) : <td>No</td>}
                  </tr>
                  <tr>
                    <th>Government Issued ID Provided?</th>
                    {this.state.profile.result.gov_id ? (
                    <td>Yes</td>
                  ) : <td>No</td>}
                  </tr>

                  {this.state.profile.result.has_tools ? (
                    <tr>
                    <th>Tool Pictures</th>
                    <td><a target="_blank" href={toolPicUrl + this.state.profile.result.profile_id + '.pdf'}>Tool Picture Link</a></td>
                  </tr>
                  ) : <div/>}
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
