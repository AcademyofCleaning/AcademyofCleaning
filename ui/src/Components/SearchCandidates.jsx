import React from 'react';
import { Table, Button, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { SearchBox } from './search-box/search-box.component';
import NavBar from './NavBar';

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


	// async componentDidMount()
	// {
	// 	const url = `https://bixe448nsa.execute-api.us-west-1.amazonaws.com/dev/search`;
	// 	const resp = await fetch(url);
	// 	const data = await resp.json();
	// 	this.setState({search: data, loading:false})
	// }
	componentDidMount() {
		fetch('https://bixe448nsa.execute-api.us-west-1.amazonaws.com/dev/search')
		  .then(response => response.json())
		  .then(data => this.setState({ search: data, loading: false }));
	}

	/** Event Handlers for search fields
		// TODO: Uncomment so state is updated, triggering a rerender of results
	onNameSearch = (event) => {
		this.setState({ searchName: event.target.value });
		};

	onEmailSearch = (event) => {
		this.setState({ searchEmail: event.target.value });
		};

	onNumberSearch = (event) => {
		this.setState({ searchNumber: event.target.value });
		};

	*/

	render(){
		console.log("RENDERING");
		// Add results row by row
		if (this.state.search) {
			const obj = this.state.search.result; // instance of cleaner data queried earlier
			var objLen = Object.keys(obj).length;
			var items = [];

			// Builds table with JSON object items passed in
			items = []; // rebuild
			for (var i = 0; i < objLen; i++) {
				// !!! Link row to profile eventually
				items.push(<tr>
							<th scope="row">{i+1}</th>
							<td ><a href={"/profiles/"+obj[i].profile_id}>{obj[i].first_name} {obj[i].last_name}</a></td>
							<td>{obj[i].email}</td>
							<td>{obj[i].contact_num}</td>
						</tr>)
			}



			/** Filters json object with cleaner information, with filters specified in state
				// TODO: Add logic to filter results when email & phone number values are typed in filters

			var searchName = this.state.searchName;
			var searchEmail = this.state.searchEmail;
			var searchNumber = this.state.searchNumber;

			function applyFilters() {
				var finalResults = obj;
				const fullName = String.prototype.toLowerCase.call(obj.first_name + ' ' + obj.last_name);
				if (searchName != null) {
					console.log(searchName);
					finalResults = fullName.includes(String.prototype.toLowerCase.call(searchName));
				}
				return finalResults	

			var filteredResults = obj.filter(applyFilters);
			displayResults(filteredResults);
			*/

  
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
					<NavBar />
					<FormGroup row>
					<Col sm={4}>
						<h5> Search Cleaners </h5>
						<FormGroup row>
							<Label for="text-search" sm={2}>Name</Label>
							<Col sm={10}>
							<SearchBox onSearchChange={this.onNameSearch} />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="email" sm={2}>Email</Label>
							<Col sm={10}>
							<SearchBox onEmailSearch={this.onEmailSearch} />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="phone" sm={2}>Phone Number</Label>
							<Col sm={10}>
							<SearchBox onNumberSearch={this.onNumberSearch} />
							</Col>
						</FormGroup>
						<FormGroup check row>
							<Button>Search</Button>
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