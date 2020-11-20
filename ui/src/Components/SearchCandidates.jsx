import React from 'react';
import { Table, Button, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import NavBar from './NavBar';
import { SearchBox } from './search-box/search-box.component';

export default class SearchCandidates extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			loading: true,
			search: null,
			props: props,
			searchName: null,
			searchEmail: null,
			searchNumber: null,
		};
	}

	componentDidMount() {
		fetch('https://bixe448nsa.execute-api.us-west-1.amazonaws.com/dev/search')
		.then(response => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error('Something went wrong');
			}})
		.then(data => this.setState({ search: data, loading: false }))
		.catch((error) => {console.log(error)});
	}

	onNameSearch = (event) => {
		this.setState({ searchName: event.target.value.toLowerCase() });
		console.log(event.target.value)
		};

	onEmailSearch = (event) => {
		this.setState({ searchEmail: event.target.value.toLowerCase() });
		};

	onNumberSearch = (event) => {
		this.setState({ searchNumber: event.target.value });
		};
	
	// this method populates the table of items with the parameters passed through the state
	populate = (items, obj, i)=> {
		items.push(<tr>
			<th scope="row">{i+1}</th>
			<td ><a href={"/profiles/"+obj[i].profile_id}>{obj[i].first_name} {obj[i].last_name}</a></td>
			<td>{obj[i].email}</td>
			<td>{obj[i].contact_num}</td>
		</tr>)
	}

	render(){
		if (this.state.search) {
			const obj = this.state.search.result
			var objLen = Object.keys(obj).length;
			var items = [];


			// Builds table with JSON object items passed in
			for (var i = 0; i < objLen; i++) {
				// !!! Link row to profile eventually

				//All of these if statements are necessary to make sure that the results returned are accurate. If we don't handle all of these cases, it will not populate dynamically
				//These statements are also necessary to make sure that the filters work together, and not independently 
				if (this.state.searchName != null && this.state.searchNumber != null && this.state.searchEmail != null) {
					if ((obj[i].first_name.toLowerCase().includes(this.state.searchName) || obj[i].last_name.toLowerCase().includes(this.state.searchName)) && obj[i].contact_num.includes(this.state.searchNumber) && obj[i].email.toLowerCase().includes(this.state.searchEmail)) {
						this.populate(items)
					}
				}
				else if (this.state.searchName != null && this.state.searchNumber != null) {
					if ((obj[i].first_name.toLowerCase().includes(this.state.searchName) || obj[i].last_name.toLowerCase().includes(this.state.searchName)) && obj[i].contact_num.includes(this.state.searchNumber)) {
						this.populate(items, obj, i)
					}
				}
				else if (this.state.searchName != null && this.state.searchEmail != null) {
					if ((obj[i].first_name.toLowerCase().includes(this.state.searchName) || obj[i].last_name.toLowerCase().includes(this.state.searchName)) && obj[i].email.toLowerCase().includes(this.state.searchEmail)) {
						this.populate(items, obj, i)
					}
				}
				else if (this.state.searchNumber != null && this.state.searchEmail != null) {
					if (obj[i].contact_num.includes(this.state.searchNumber) && obj[i].email.toLowerCase().includes(this.state.searchEmail)) {
						this.populate(items, obj, i)
					}
				}
				else if (this.state.searchNumber != null) {
					if (obj[i].contact_num.includes(this.state.searchNumber)) {
						this.populate(items, obj, i)
					}
				}
				else if (this.state.searchName != null) {
					if (obj[i].first_name.toLowerCase().includes(this.state.searchName) || obj[i].last_name.toLowerCase().includes(this.state.searchName)) {
						this.populate(items, obj, i)
					}
				}
				else if (this.state.searchEmail != null) {
					if (obj[i].email.toLowerCase().includes(this.state.searchEmail)) {
						this.populate(items, obj, i)
					}
				}
				// if no search fields are entered, we still want to show the total list
				else {
						this.populate(items, obj, i)
				}
			}
  
		}
		return(
				<>
					{this.state.loading === (
						<div> Loading Results... </div>
						)} 
					{!this.state.search ? (
						<div> Retrieving results from DB... </div>
					)  :  (
					<Form>
					<FormGroup row>
					<Col sm={4}>
						<h5> Search Cleaners </h5>
						<FormGroup row>
							<Label for="text-search" sm={2}>Name</Label>
							<Col sm={10}>
							<input type="text" className="input" onChange={this.onNameSearch} placeholder="John Doe"/>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="email" sm={2}>Email</Label>
							<Col sm={10}>
							<input type="text" className="input" onChange={this.onEmailSearch} placeholder="abc@gmail.com"/>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="phone" sm={2}>Phone Number</Label>
							<Col sm={10}>
							<input type="text" className="input" onChange={this.onNumberSearch} placeholder="6471231234"/>
							</Col>
						</FormGroup>
					</Col>
					<Col lg>
						<div className="searchResults">
						<h3>Results</h3>
						<p>(Found {objLen} Cleaners)</p>
						<Table>
							<thead>
								<tr>
								  <th>Result</th>
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
					</Col>
					</FormGroup>
					</Form>
					)}
				</>
		);
	}
}