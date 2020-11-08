import React from 'react';
import { Table, Button, Col, Form, FormGroup, Label, Input } from 'reactstrap';


export default class SearchCandidates extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			loading: true,
			search: null,
			props: props,
		};

		// this.applySearch = this.applySearch.bind(this);
	}

	async componentDidMount()
	{
		const url = `https://bixe448nsa.execute-api.us-west-1.amazonaws.com/dev/search`;
		const resp = await fetch(url);
		const data = await resp.json();
		//const data = {"result":{
		//	"first_name": "Christina",
		//	}}
		//console.log(resp)
		this.setState({search: data, loading:false})
	}

	render(){
		// const items = []

		return(
				<>
					{this.state.loading === (
						<div> Loading Results... </div>
						)} 
					{this.state.search ? (
						<div> No results from DB </div>
					)  :  (
					<>
					<Form>
						<FormGroup row>
						<Label for="name" sm={2}>Search Candidates</Label>
						</FormGroup>
						<FormGroup row>
							<Label for="text-search" sm={2}>Name</Label>
							<Col sm={10}>
							<Input type="text" name="name" id="name" placeholder="search by name" />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="email" sm={2}>Email</Label>
							<Col sm={10}>
							<Input type="email" name="email" id="email" placeholder="search by email" />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="phone" sm={2}>Phone Number</Label>
							<Col sm={10}>
							<Input type="tel" name="phone" id="phone" placeholder="search by phone number" />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="checkDocs" sm={2}>All Docs Provided</Label>
							<Col sm={10}>
							<Input type="documentsCheck" name="checkDocs" id="checkDocs" />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="certComplete" sm={2}>Completed Certificates (select all)</Label>
							<Col sm={10}>
								<Input type="select" name="selectCerts" id="certComplete" multiple>
								<option>AUTOPOPULATE FROM TABLE LATER</option>
								<option>Sweeping</option>
								<option>Mopping</option>
								<option>Windows</option>
								</Input>
							</Col>
						</FormGroup>

						<FormGroup check row>
							<Col sm={{ size: 10, offset: 6 }}>
							<Button color="primary onClick={this.applySearch}">Search</Button> 
							// https://reactjs.org/docs/faq-functions.html
							</Col>
						</FormGroup>

					</Form>

					<div className="searchResults">
						<h3>Found # Results</h3>
						<p>(#_OF_RESULTS)</p>
						<Table>
						// https://flaviocopes.com/react-how-to-loop/
						// https://stackoverflow.com/questions/22876978/loop-inside-react-jsx
							<thead>
								<tr>
								  <th>#</th>
								  <th>Name</th>
								  <th>Email</th>
								  <th>Phone Number</th>
								  <th>All Docs Provided</th>
								  <th>Completed Certificates</th>
								</tr>
							  </thead>
							  <tbody>
								<tr>
								  <th scope="row">1</th>
								  <td>{this.state.search.result.first_name}</td>
								  <td>Otto</td>
								  <td>@mdo</td>
								  <td>@mdo</td>
								  <td>@mdo</td>
								</tr>
							  </tbody>
							</Table>
						</div>
						</>
					)}
				</>
		);
	}
}