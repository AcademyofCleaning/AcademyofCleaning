import React from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button, Col, Form, FormGroup, Label, Input} from 'reactstrap';
import './App.css';

//Uncomment/Comment based on env
const URL = "https://bixe448nsa.execute-api.us-west-1.amazonaws.com/dev/insertFormData";
//const URL = "http://localhost:3000/dev/insertFormData";

class CreateProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            number: '',
            profile_id: '',
            ref1Name: '',
            ref1Email: '',
            ref2Name: '',
            ref2Email: '',
            govIdFlag: false,
            govId: null,
            toolPicFlag: false,
            toolPic: null,
        };

        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleNumChange = this.handleNumChange.bind(this);
        this.handleRef1NameChange = this.handleRef1NameChange.bind(this);
        this.handleRef1EmailChange = this.handleRef1EmailChange.bind(this);
        this.handleRef2NameChange = this.handleRef2NameChange.bind(this);
        this.handleRef1EmailChange = this.handleRef2EmailChange.bind(this);
        this.handleLicenseUpload = this.handleLicenseUpload.bind(this);
        this.handleToolUpload = this.handleToolUpload.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleFirstNameChange(event) {
        this.setState({firstName: event.target.value});
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

    handleSubmit(event) {
        event.preventDefault();
        fetch(URL,
            {
              method: "POST",
              headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
                },
              body: JSON.stringify( { 
                firstName:this.state.firstName, 
                lastName:this.state.lastName,
                email:this.state.email, 
                number:this.state.number, 
                reference1Name:this.state.ref1Name,
                reference1Email:this.state.ref1Email,
                reference2Name:this.state.ref2Name,
                reference2Email:this.state.ref2Email,
                govId:this.state.govIdFlag,
                toolPic:this.state.toolPicFlag
                }),
            })
            .then(res => res.json())
            .then(res => {
                res = JSON.parse(res.body)
                if (res.govIdUrl!=='') {
                    fetch(res.govIdUrl, {
                        method: "PUT",
                        body: this.state.govId,
                        headers: {
                            "Content-Type": "application/pdf",
                            "x-amx-acl" : "public-read",
                        },
                    })
                    .then((res) => {
                        console.log(res);
                    });
                }
                if (res.toolPicUrl!=='') {
                    fetch(res.toolPicUrl, {
                        method: "PUT",
                        body: this.state.toolPic,
                        headers: {
                            "Content-Type": "application/pdf",
                            "x-amx-acl" : "public-read",
                        },
                    })
                }
            window.location.href = ('/dev/viewProfile?id=', res.result) 
            })
            .catch(error => console.error('Error:', error));
    };
    
    render() {
        return (
            <>
            <AvForm onSubmit={ this.handleSubmit }>
                <div class="row-buffer side-buffer">
                <FormGroup row>
                <Label for="name" sm={2}><h4 className="left-align" >Complete Profile</h4></Label>
                </FormGroup>
                <FormGroup className="left-align" row>
                    <Label for="name" sm={2}>First Name</Label>
                    <Col sm={10}>
                    <AvField name="name" type="text" placeholder="John" onChange={this.handleFirstNameChange} value={this.state.firstName} required />
                    {/* <Input type="text" name="name" id="firstname" placeholder="John" onChange={this.handleFirstNameChange} value={this.state.firstName}/> */}
                    </Col>
                </FormGroup>
                <FormGroup className="left-align" row>
                    <Label for="name" sm={2}>Last Name</Label>
                    <Col sm={10}>
                    <AvField name="name" type="text" placeholder="Doe" onChange={this.handleLastNameChange} value={this.state.lastName} required />
                    </Col>
                </FormGroup>
                <FormGroup className="left-align" row>
                    <Label for="email" sm={2}>Email</Label>
                    <Col sm={10}>
                    <AvField name="email" type="email" placeholder="johndoe@gmail.com" onChange={this.handleEmailChange} value={this.state.email} required />
                    </Col>
                </FormGroup>
                <FormGroup className="left-align" row>
                    <Label for="phone" sm={2}>Phone Number</Label>
                    <Col sm={10}>
                    <AvField name="phone" type="tel" placeholder="415-879-7877" onChange={this.handleNumChange} value={this.state.number} required />
                    </Col>
                </FormGroup>
                <FormGroup className="left-align" row>
                    <Label for="govId" sm={2}>Government Issued ID</Label>
                    <Col sm={10}>
                    <AvField name="govId" type="file" onChange={this.handleLicenseUpload} />
                    </Col>
                </FormGroup>
                <FormGroup className="left-align" row>
                    <Label sm={2}>Reference 1:</Label>
                    <Label for="referenceName" sm={1}>Name</Label>
                    <Col sm={4}>
                    <Input type="text" name="referenceName" id="referenceName" onChange={this.handleRef1NameChange} value={this.state.ref1Name}/>
                    </Col>
                    <Label for="referenceEmail" sm={1}>Email</Label>
                    <Col sm={4}>
                    <Input type="email" name="referenceEmail" id="referenceEmail" onChange={this.handleRef1EmailChange} value={this.state.ref1Email}/>
                    </Col>
                </FormGroup>
                <FormGroup className="left-align" row>
                    <Label sm={2}>Reference 2:</Label>
                    <Label for="referenceName" sm={1}>Name</Label>
                    <Col sm={4}>
                    <Input type="text" name="referenceName" id="referenceName" onChange={this.handleRef2NameChange} value={this.state.ref2Name}/>
                    </Col>
                    <Label for="referenceEmail" sm={1}>Email</Label>
                    <Col sm={4}>
                    <Input type="email" name="referenceEmail" id="referenceEmail" onChange={this.handleRef2EmailChange} value={this.state.ref2Email}/>
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
            </>
        );
    }
}

export default CreateProfile;
