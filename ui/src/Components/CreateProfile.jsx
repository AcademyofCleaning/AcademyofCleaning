import React from 'react';
import { Button, Col, Form, FormGroup, Label, Input } from 'reactstrap';

const CreateProfile = () => {
    return (
        <Form>
            <FormGroup row>
            <Label for="name" sm={2}>Complete Profile</Label>
            </FormGroup>
            <FormGroup row>
                <Label for="name" sm={2}>Name</Label>
                <Col sm={10}>
                <Input type="text" name="name" id="name" placeholder="John Doe" />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="email" sm={2}>Email</Label>
                <Col sm={10}>
                <Input type="email" name="email" id="email" placeholder="johndoe@gmail.com" />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="phone" sm={2}>Phone Number</Label>
                <Col sm={10}>
                <Input type="tel" name="phone" id="phone" placeholder="415-879-7877" />
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
                <Input type="text" name="referenceName" id="referenceName" />
                </Col>
                <Label for="referenceEmail" sm={1}>Email</Label>
                <Col sm={4}>
                <Input type="email" name="referenceEmail" id="referenceEmail" />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label sm={2}>Reference 2:</Label>
                <Label for="referenceName" sm={1}>Name</Label>
                <Col sm={4}>
                <Input type="text" name="referenceName" id="referenceName" />
                </Col>
                <Label for="referenceEmail" sm={1}>Email</Label>
                <Col sm={4}>
                <Input type="email" name="referenceEmail" id="referenceEmail" />
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
                <Button>Submit</Button>
                </Col>
            </FormGroup>
        </Form>
    );
}

export default CreateProfile;
