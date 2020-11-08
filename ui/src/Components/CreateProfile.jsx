import React from 'react';
import styled from 'styled-components';
import { Button, Col, Form, FormGroup, Label, Input, Row } from 'reactstrap';
import NavBar from './NavBar';

const H3 = styled.h3`
  display: flex;
  justify-content: align-left;
  margin-top: 40px;
  margin-bottom: 40px;
  margin-left: 50px;
`;

class CreateProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            number: '',
            ref1Name: '',
            ref1Email: '',
            ref2Name: '',
            ref2Email: '',
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleNumChange = this.handleNumChange.bind(this);
        this.handleRef1NameChange = this.handleRef1NameChange.bind(this);
        this.handleRef1EmailChange = this.handleRef1EmailChange.bind(this);
        this.handleRef2NameChange = this.handleRef2NameChange.bind(this);
        this.handleRef1EmailChange = this.handleRef2EmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
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

    handleSubmit(event) {
        console.log("submitting data to db..");
        event.preventDefault();
        // window.location.href = "/viewProfile";
        // console.log(this.state.name);
        console.log(this.state);
        fetch( 'http://localhost:3001/dev/insertFormData',
            {
              //should this be post?
              method: "POST",
              headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
                },
              body: JSON.stringify( { 
                name:this.state.name, 
                email:this.state.email, 
                number:this.state.number, 
                referenc1Name:this.state.ref1Name,
                reference1Email:this.state.ref1Email,
                referenc2Name:this.state.ref2Name,
                reference2Email:this.state.ref2Email
                } ),

            } )
            .then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => console.log('Success:', response));

            // route to /profiles/:id (id ==cleanerId) 
    };
    
    render() {
        return (
            <Form onSubmit={ this.handleSubmit }>
                <FormGroup row>
                <Label for="name" sm={2}>Complete Profile</Label>
                </FormGroup>
                <FormGroup row>
                    <Label for="name" sm={2}>Name</Label>
                    <Col sm={10}>
                    <Input type="text" name="name" id="name" placeholder="John Doe" onChange={this.handleNameChange} value={this.state.name}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="email" sm={2}>Email</Label>
                    <Col sm={10}>
                    <Input type="email" name="email" id="email" placeholder="johndoe@gmail.com" onChange={this.handleEmailChange} value={this.state.email}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="phone" sm={2}>Phone Number</Label>
                    <Col sm={10}>
                    <Input type="tel" name="phone" id="phone" placeholder="415-879-7877" onChange={this.handleNumChange} value={this.state.number}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="govId" sm={2}>Government Issued ID</Label>
                    <Col sm={10}>
                    <Input type="file" name="govId" id="govId" />
                    </Col>
                </FormGroup>
                <FormGroup row>
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
                <FormGroup row>
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
                <FormGroup row>
                    <Label for="tools" sm={2}>Tools/Supplies</Label>
                    <Col sm={10}>
                    <Input type="file" name="tools" id="tools" />
                    </Col>
                </FormGroup>
                <FormGroup check row>
                    <Col sm={{ size: 10, offset: 6 }}>
                    <Button type="submit">Submit</Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}


export default CreateProfile;

