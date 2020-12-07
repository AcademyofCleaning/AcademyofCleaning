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
    this.formatNumber = this.formatNumber.bind(this);
    this.formatRefs = this.formatRefs.bind(this);
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
    this.render();
  };

  /* This method formats phone numbers */
  formatNumber (number, ext) {
    if (this.state.profile){}
    let formattedNum = number.substring(0,3).concat("-").concat(number.substring(3,6)).concat("-").concat(number.substring(6,10));

    if (ext != null) {
      formattedNum = formattedNum.concat(" x ").concat(ext)
    }
    return formattedNum;    
  };

  /* This method formats references depending on how many are available for the profile*/
  formatRefs() {
    if (this.state.profile && this.state.profile.resultRefs) {
        const refs = this.state.profile.resultRefs;
        const refLen = Object.keys(refs).length;
        let references = [];

        if (refLen == 0) {
          references.push(<tr><td>Reference</td><td>Not Provided</td></tr>)
        }

        for (let i = 0; i < refLen; i++) {
          references.push(<tr><td>Reference {i+1}</td>
            <td><div>{refs[i].first_name} {refs[i].last_name}</div>
            <div>{refs[i].email}</div><div>{this.formatNumber(refs[i].contact_num, refs[i].contact_ext)}</div>
            <div>{refs[i].relationship}</div></td></tr>)
        }
        return references;
      }
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
                    <td>Email</td>
                    <td>{this.state.profile.result.email}</td>
                  </tr>
                  <tr>
                    <td>Phone Number</td>
                    {this.state.profile.result.contact_ext ? (
                    <td>{this.formatNumber(this.state.profile.result.contact_num, this.state.profile.result.contact_ext)}</td>
                  ) : <td>{this.state.profile.result.contact_num}</td>}
                  </tr>
                  <tr>
                    <td>Address</td>
                    {this.state.profile.result.address ? (
                        <td><div>{this.state.profile.result.address}</div>
                        <div>{this.state.profile.result.city},  {this.state.profile.result.postal_code.substring(0,3)} {this.state.profile.result.postal_code.substring(3,6)}   {this.state.profile.result.province}</div>
                        </td>
                      ) : <td>Not Provided</td>}
                  </tr>
                  <tr>
                    <td>Date of Birth</td>
                    {this.state.profile.result.dob ? (
                      <td>{this.state.profile.result.dob}</td>
                      ) : <td>Not Provided</td>}
                  </tr>

                  {this.formatRefs()}

                  <tr>
                    <td>Current Occupation</td>
                    {this.state.profile.result.dob ? (
                      <td>{this.state.profile.result.current_occup}</td>
                      ) : <td>Not Provided</td>}
                  </tr>
                  <tr>
                    <td>Canadian ID Provided?</td>
                    {this.state.profile.result.canadian_id ? (
                    <td>Yes</td>
                  ) : <td>No</td>}
                  </tr>
                  <tr>
                    <td>Health Insurance Provided?</td>
                    {this.state.profile.result.hin ? (
                    <td>Yes</td>
                  ) : <td>No</td>}
                  </tr>
                  <tr>
                    <td>Government Issued ID Provided?</td>
                    {this.state.profile.result.gov_id ? (
                    <td>Yes</td>
                  ) : <td>No</td>}
                  </tr>

                  {this.state.profile.result.has_tools ? (
                  <tr>
                    <td>Tool Pictures</td>
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
