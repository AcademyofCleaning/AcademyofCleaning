import React from 'react';
import { Table, Button, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import NavBar from './NavBar';


export default class SearchCandidates extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			loading: true,
			search: null,
			props: props,
		};
	}

	async componentDidMount()
	{
		const url = `https://bixe448nsa.execute-api.us-west-1.amazonaws.com/dev/search`;
		const resp = await fetch(url);
		console.log(resp)
		const data = await resp.json();
		this.setState({search: data, loading:false})
	}

	render(){
		// Add results row by row
		if (this.state.search) {
			const obj = this.state.search.result;
			var objLen = Object.keys(obj).length;
			console.log(obj);
			console.log(objLen);

			// const filt1 = ;
			// const filt2 = ;

			var items = [];
			for (var i = 0; i < objLen; i++) {
				// if (with all filter conditions)
				items.push(<tr>
								<th scope="row">{i}</th>
								<td>{this.state.search.result[i].first_name} {this.state.search.result[i].last_name}</td>
								<td>{this.state.search.result[i].email}</td>
								<td>{this.state.search.result[i].contact_num}</td>
							</tr>)
			}
		}
		return(
				<>
					{this.state.loading === (
						<div> Loading Results... </div>
						)} 
					{!this.state.search ? (
						<div> No results retrieved from DB </div>
					)  :  (
					<Form>
					<NavBar />
						<h3> Search Cleaners </h3>
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
							<Col sm={2}>
							<Button color="primary onClick={this.applySearch}">Search</Button>
							</Col>
						</FormGroup>

						<div className="searchResults">
						<h3>Results</h3>
						<p>(Found {objLen} RESULTS)</p>
						<Table>
							<thead>
								<tr>
								  <th> </th>
								  <th>Name</th>
								  <th>Email</th>
								  <th>Phone Number</th>
								</tr>
							  </thead>
							  <tbody>
								{items}
							  </tbody>
							</Table>
						</div>
					</Form>
					)}
				</>
		);
	}
}