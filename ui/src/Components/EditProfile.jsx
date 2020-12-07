import React from 'react';
import { Button, Col, FormGroup, Label, Input} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Loading } from './auth/Loading';


//Uncomment/Comment based on env
//const ApiUrl = "http://localhost:3001/dev/editProfile";
const ApiUrl = "https://bixe448nsa.execute-api.us-west-1.amazonaws.com/dev/editProfile";

//URLS for GET CALL
const GetApiUrl = `https://bixe448nsa.execute-api.us-west-1.amazonaws.com/dev/viewProfile?id=`;
// const GetApiUrl = "http://localhost:3001/dev/viewProfile?id="

// URLS for Files 
const toolPicUrl = 'https://cleaner-tool-pics.s3-us-west-1.amazonaws.com/'

// COPIES FOR REACT CLIENT 
const readyForVerificationCopy = "Submit";
const uploadCopy = "Save";

class CreateProfile extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            profile: null,
            loading: true,
            props: props,
            firstName: '',
            middleName: '',
            lastName: '',
            email: '',
            address: '',
            city: '',
            postal: '',
            province: '',
            dob: '',
            number: '',
            profile_id: '',
            sin: '',
            currentOccupation: '',
            ref1Name: '',
            ref1Email: '',
            ref1Relationship: '',
            ref2Name: '',
            ref2Email: '',
            ref2Relationship: '',
            govIdFlag: false,
            govId: null,
            toolPicFlag: false,
            toolPic: null,
            hinFlag: false,
            hinPic: null,
            readyForVerification:0,
        };

        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleMiddleNameChange = this.handleMiddleNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handlePostalChange = this.handlePostalChange.bind(this);
        this.handleProvinceChange = this.handleProvinceChange.bind(this);
        this.handleDobChange = this.handleDobChange.bind(this);
        this.handleSinChange = this.handleSinChange.bind(this);
        this.handleCurrentOccupationChange = this.handleCurrentOccupationChange.bind(this);
        this.handleNumChange = this.handleNumChange.bind(this);
        this.handleRef1NameChange = this.handleRef1NameChange.bind(this);
        this.handleRef1EmailChange = this.handleRef1EmailChange.bind(this);
        this.handleRef1RelationshipChange = this.handleRef1RelationshipChange.bind(this);
        this.handleRef2NameChange = this.handleRef2NameChange.bind(this);
        this.handleRef2EmailChange = this.handleRef2EmailChange.bind(this);
        this.handleRef2RelationshipChange = this.handleRef2RelationshipChange.bind(this);
        this.handleLicenseUpload = this.handleLicenseUpload.bind(this);
        this.handleToolUpload = this.handleToolUpload.bind(this);
        this.handleHinUpload = this.handleHinUpload.bind(this);
        this.handleAppStatusUpdate = this.handleAppStatusUpdate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Get information to populate the profile before editing
    async componentDidMount()
    {
      const url = GetApiUrl+this.state.props.match.params.id;
      const resp = await fetch(url);
      const data = await resp.json();
      this.setState({profile: data, loading: false});

      // assign all required form variable from now
      this.state.firstName = this.state.profile.result.first_name;
      this.state.lastName = this.state.profile.result.last_name;
      this.state.number = this.state.profile.result.contact_num;
    }

    handleSinChange(event) {
        this.setState({sin: event.target.value});
    }
    handleCurrentOccupationChange(event) {
        this.setState({currentOccupation: event.target.value});
    }

    handleDobChange(event) {
        this.setState({dob: event.target.value});
    }

    handleProvinceChange(event) {
        this.setState({province: event.target.value});
    }

    handlePostalChange(event) {
        this.setState({postal: event.target.value});
    }

    handleCityChange(event) {
        this.setState({city: event.target.value});
    }
    
    handleAddressChange(event) {
        this.setState({address: event.target.value});
    }

    handleMiddleNameChange(event) {
        this.setState({middleName: event.target.value});
    }

    handleFirstNameChange(event) {
        this.setState({firstName: event.target.value});
    }

    handleAppStatusUpdate(event){
        if(event.target.name == "true"){
            this.setState({readyForVerification: 1});
        } else {
            this.setState({readyForVerification: 0});
        }
    }

    handleLastNameChange(event) {
        this.setState({lastName: event.target.value});
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handleNumChange(event) {
        this.setState({number: event.target.value});
    }

    handleRef1NameChange(event) {
        this.setState({ref1Name: event.target.value});
    }

    handleRef1EmailChange(event) {
        this.setState({ref1Email: event.target.value});
    }

    handleRef2NameChange(event) {
        this.setState({ref2Name: event.target.value});
    }

    handleRef2EmailChange(event) {
        this.setState({ref2Email: event.target.value});
    }

    handleRef1RelationshipChange(event) {
        this.setState({ref1Relationship: event.target.value});
    }

    handleRef2RelationshipChange(event) {
        this.setState({ref2Relationship: event.target.value});
    }

    handleLicenseUpload(event) {
        this.setState({
            govIdFlag: true,
            govId: event.target.files[0]
        });
    }
    
    handleToolUpload(event) {
        this.setState({
            toolPicFlag: true,
            toolPic: event.target.files[0]
        });
    }
    
    handleHinUpload(event) {
        this.setState({
            hinFlag: true,
            hinPic: event.target.files[0]
        });
    }

    // check required form variables to make sure they are the original or new values
    checkIfBlank(){
        if(this.state.firstName == ""){
            this.state.firstName = this.state.profile.result.first_name;
        }  
        if(this.state.lastName  == ""){
            this.state.lastName = this.state.profile.result.last_name;
        }    
        if(this.state.number  == ""){
            this.state.number = this.state.profile.result.contact_num;         
        }     
        if(this.state.email  == ""){
            this.state.email = this.state.profile.result.email; 
        }  
    };

    handleSubmit(event) {
        this.checkIfBlank();
        event.preventDefault();
        fetch(ApiUrl,
            {
              method: "PUT",
              headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
                },
              body: JSON.stringify( { 
                firstName:this.state.firstName, 
                middleName:this.state.middleName, 
                lastName:this.state.lastName,
                address:this.state.address,
                city:this.state.city,
                postal: this.state.postal,
                province: this.state.province,
                dob: this.state.dob,
                sin: this.state.sin,
                currentOccupation: this.state.currentOccupation,
                email: this.state.email, 
                number: this.state.number, 
                reference1Name:this.state.ref1Name,
                reference1Email:this.state.ref1Email,
                reference1Relationship:this.state.ref1Relationship,
                reference2Name:this.state.ref2Name,
                reference2Email:this.state.ref2Email,
                reference2Relationship:this.state.ref2Relationship,
                govId:this.state.govIdFlag,
                toolPic:this.state.toolPicFlag,
                hinFlag:this.state.hinFlag,
                id:this.state.props.match.params.id, //added profile ID to payload
                readyForVerification: this.state.readyForVerification,
                }),
            })
            .then(res => res.json())
            .then(res => {
                if (res.govIdUrl!=='') { //upload gov id
                    fetch(res.govIdUrl, {
                        method: "PUT",
                        body: this.state.govId,
                        headers: {
                            "Content-Type": "application/pdf",
                            "x-amx-acl" : "public-read",
                        },
                    })
                }
                if (res.toolPicUrl!=='') { //upload tool file
                    fetch(res.toolPicUrl, {
                        method: "PUT",
                        body: this.state.toolPic,
                        headers: {
                            "Content-Type": "application/pdf",
                            "x-amx-acl" : "public-read",
                        },
                    })
                }
            window.location.href = ('/profiles/' + res.result) //redirect to Profile View Page
            })
            .catch(error => console.error('Error:', error));
    };
    
    render() {
        const checkToolFile = ()=>{
            if(this.state.profile.result.has_tools){
                // Currently displays "Took Pic File Uploaded" above the field, which seems incorrect. Until clarification, commenting out.
                return <a target="_blank" href={toolPicUrl + this.state.props.match.params.id + '.pdf'}>Tool Picture Link</a>
            } 
        }
        if (this.state.loading) {
            return <Loading />
           } else {
               return (
                   <>
                   {!this.state.profile ? (
                       <div> Profile Does Not Exist </div>
                   ) : (
                    <AvForm onSubmit={ this.handleSubmit }>
                    <div class="row-buffer side-buffer">
                    <FormGroup row>
                    <Label sm={2}><h4 className="left-align" >Complete Profile</h4></Label>
                    </FormGroup>
                    <FormGroup className="left-align" row>
                        <Label for="firstName" sm={2}>First Name</Label>
                        <Col sm={10}>
                        <AvField name="firstName" type="text" placeholder="John" onChange={this.handleFirstNameChange} value={this.state.firstName} required />
                        </Col>
                    </FormGroup>
                    <FormGroup className="left-align" row>
                        <Label for="middleName" sm={2}>Middle Name</Label>
                        <Col sm={10}>
                        <AvField name="middleName" type="text" placeholder="Doe" onChange={this.handleMiddleNameChange} value={this.state.middleName} required />
                        </Col>
                    </FormGroup>
                    <FormGroup className="left-align" row>
                        <Label for="lastName" sm={2}>Last Name</Label>
                        <Col sm={10}>
                        <AvField name="lastName" type="text" placeholder="Arelli" onChange={this.handleLastNameChange} value={this.state.lastName} required />
                        </Col>
                    </FormGroup>
                    <FormGroup className="left-align" row>
                        <Label for="dob" sm={2}>Date of Birth</Label>
                        <Col sm={10}>
                        <AvField name="dob" type="date" placeholder="mm/dd/yyyy" onChange={this.handleDobChange} value={this.state.dob} required />
                        </Col>
                    </FormGroup>
                    <FormGroup className="left-align" row>
                        <Label for="sin" sm={2}>Social Insurance Number</Label>
                        <Col sm={10}>
                        <AvField name="sin" type="number" placeholder="123456789" maxLength={9} minLength={9} onChange={this.handleSinChange} value={this.state.sin} required />
                        </Col>
                    </FormGroup>
                    <FormGroup className="left-align" row>
                        <Label for="email" sm={2}>Email</Label>
                        <Col sm={10}>
                        <AvField name="email" type="email" placeholder="johndoe@gmail.com" onChange={this.handleEmailChange} value={this.state.email} required />
                        </Col>
                    </FormGroup>
                    <FormGroup className="left-align" row>
                        <Label for="number" sm={2}>Phone Number</Label>
                        <Col sm={10}>
                        <AvField name="number" type="tel" placeholder="415-879-7877" onChange={this.handleNumChange} value={this.state.number} required />
                        </Col>
                    </FormGroup>
                    <FormGroup className="left-align" row>
                        <Label for="address" sm={2}>Address</Label>
                        <Col sm={10}>
                        <AvField name="address" type="text" placeholder="100 Reindeer Street" onChange={this.handleAddressChange} value={this.state.address} required />
                        </Col>
                    </FormGroup>
                    <FormGroup className="left-align" row>
                        <Label for="city" sm={2}>City</Label>
                        <Col sm={10}>
                        <AvField name="city" type="text" placeholder="North Pole" onChange={this.handleCityChange} value={this.state.city} required />
                        </Col>
                    </FormGroup>
                    <FormGroup className="left-align" row>
                        <Label for="postal" sm={2}>Postal Code</Label>
                        <Col sm={10}>
                        <AvField name="postal" type="text" placeholder="H0H 0H0" onChange={this.handlePostalChange} value={this.state.postal} required />
                        </Col>
                    </FormGroup>
                    <FormGroup className="left-align" row>
                        <Label for="province" sm={2}>Province</Label>
                        <Col sm={10}>
                        <AvField name="province" type="text" placeholder="Arctic Circle" onChange={this.handleProvinceChange} value={this.state.province} required />
                        </Col>
                    </FormGroup>
                    <FormGroup className="left-align" row>
                        <Label for="currentOccupation" sm={2}>Current Occupation</Label>
                        <Col sm={10}>
                        <AvField name="currentOccupation" type="text" placeholder="Student" onChange={this.handleCurrentOccupationChange} value={this.state.currentOccupation} required />
                        </Col>
                    </FormGroup>
                    
                    <FormGroup className="left-align" row>
                        <Label sm={2}>Reference 1:</Label>
                        <Label for="ref1Name" sm={1}>Name</Label>
                        <Col sm={2}>
                        <Input type="text" name="ref1Name" id="referenceName" onChange={this.handleRef1NameChange} value={this.state.ref1Name}/>
                        </Col>
                        <Label for="ref1Email" sm={1}>Email</Label>
                        <Col sm={2}>
                        <Input type="email" name="ref1Email" id="referenceEmail" onChange={this.handleRef1EmailChange} value={this.state.ref1Email}/>
                        </Col>
                        <Label for="ref1Relationship" sm={1}>Relationship</Label>
                        <Col sm={2}>
                        <Input type="text" name="ref1Email" id="referenceRelationship" onChange={this.handleRef1RelationshipChange} value={this.state.ref1Relationship}/>
                        </Col>
                    </FormGroup>
                    <FormGroup className="left-align" row>
                        <Label sm={2}>Reference 2:</Label>
                        <Label for="ref2Name" sm={1}>Name</Label>
                        <Col sm={2}>
                        <Input type="text" name="ref2Name" id="referenceName" onChange={this.handleRef2NameChange} value={this.state.ref2Name}/>
                        </Col>
                        <Label for="ref2Email" sm={1}>Email</Label>
                        <Col sm={2}>
                        <Input type="email" name="ref2Email" id="referenceEmail" onChange={this.handleRef2EmailChange} value={this.state.ref2Email}/>
                        </Col>
                        <Label for="ref2Relationship" sm={1}>Relationship</Label>
                        <Col sm={2}>
                        <Input type="text" name="ref2Relationship" id="referenceRelationship" onChange={this.handleRef2RelationshipChange} value={this.state.ref2Relationship}/>
                        </Col>
                    </FormGroup>
                    <FormGroup className="left-align" row>
                        <Label for="hin" sm={2}>Proof of Health Insurance</Label>
                        <Col sm={10}>
                        <AvField name="hin" type="file" onChange={this.handleHinUpload} />
                        </Col>
                    </FormGroup>
                    <FormGroup className="left-align" row>
                        <Label for="govId" sm={2}>Government Issued ID</Label>
                        <Col sm={10}>
                        <AvField name="govId" type="file" onChange={this.handleLicenseUpload} />
                        </Col>
                    </FormGroup>
                    <FormGroup className="left-align" row>
                        <Label for="tools" sm={2}>Tools/Supplies</Label>
                        <Col sm={10}>
                        <AvField type="file" name="tools" id="tools" onChange={this.handleToolUpload} />
                        </Col>
                    </FormGroup>
                    <FormGroup className="right-align" check row>
                        <Button className="btn btn-secondary" type="submit">Submit</Button>
                    </FormGroup>
                </div>
                </AvForm>
                   )}
                   </>
               );
           }

    }
}

export default CreateProfile;
