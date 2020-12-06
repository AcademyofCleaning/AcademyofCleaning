import React from 'react';
import { Table, Button, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { SearchBox } from './search-box/search-box.component';
import './App.css';

export default class SearchCandidates extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			loading: true,
			search: null,
			props: props,
			searchName: null,
			searchEmail: null,
			searchVerified: false,
			searchPendingVerified: false,
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

	onVerifiedSearch = (event) => {
		this.setState({ searchVerified: event.target.checked});
		};
	
	onPendingVerifiedSearch = (event) => {
		this.setState({ searchPendingVerified: event.target.checked});
		};
	
	// this method populates the table of items with the parameters passed through the state
	populate = (items, obj, i)=> {
		items.push(<tr>
			<th scope="row">{i+1}</th>
			<td ><a href={"/profiles/"+obj[i].profile_id+"?admin=1"}>{obj[i].first_name} {obj[i].last_name}</a></td>
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

				//All of these if statements are necessary to make sure that the results returned are accurate. If we don't handle all of these cases, it will not populate dynamically
				//These statements are also necessary to make sure that the filters work together, and not independently 
				if (this.state.searchName != null && this.state.searchEmail != null && ((this.state.searchVerified == false && this.state.searchPendingVerified == false) || this.state.searchVerified == true && this.state.searchPendingVerified == true)) {
					if (obj[i].first_name.concat(' ', obj[i].last_name).toLowerCase().includes(this.state.searchName) && obj[i].email.toLowerCase().includes(this.state.searchEmail) && (obj[i].app_status.toLowerCase().includes('pending validaton') || obj[i].app_status.toLowerCase().includes('completed validation'))) {
						this.populate(items, obj, i)
					}
				}
				else if (this.state.searchName != null && this.state.searchEmail != null && this.state.searchVerified == true) {
					if (obj[i].first_name.concat(' ', obj[i].last_name).toLowerCase().includes(this.state.searchName) && obj[i].email.toLowerCase().includes(this.state.searchEmail) && obj[i].app_status.toLowerCase().includes('completed validation')) {
						this.populate(items, obj, i)
					}
				}
				else if (this.state.searchName != null && this.state.searchEmail != null && this.state.searchPendingVerified == true) {
					if (obj[i].first_name.concat(' ', obj[i].last_name).toLowerCase().includes(this.state.searchName) && obj[i].email.toLowerCase().includes(this.state.searchEmail) && obj[i].app_status.toLowerCase().includes('pending validation')) {
						this.populate(items, obj, i)
					}
				}
				else if (this.state.searchName != null && this.state.searchEmail != null) {
					if (obj[i].first_name.concat(' ', obj[i].last_name).toLowerCase().includes(this.state.searchName) && obj[i].email.toLowerCase().includes(this.state.searchEmail)) {
						this.populate(items, obj, i)
					}
				}
				else if (this.state.searchName != null && this.state.searchVerified == true) {
					if (obj[i].first_name.toLowerCase().includes(this.state.searchName) && obj[i].app_status.toLowerCase().includes('completed validation')) {
						this.populate(items, obj, i)
					}
				}
				else if (this.state.searchName != null && this.state.searchPendingVerified == true) {
					if (obj[i].first_name.toLowerCase().includes(this.state.searchName) && obj[i].app_status.toLowerCase().includes('pending validation')) {
						this.populate(items, obj, i)
					}
				}
				else if (this.state.email != null && this.state.searchVerified == true) {
					if (obj[i].email.toLowerCase().includes(this.state.searchEmail) && obj[i].app_status.toLowerCase().includes('completed validation')) {
						this.populate(items, obj, i)
					}
				}
				else if (this.state.email != null && this.state.searchPendingVerified == true) {
					if (obj[i].email.toLowerCase().includes(this.state.searchEmail) && obj[i].app_status.toLowerCase().includes('pending validation')) {
						this.populate(items, obj, i)
					}
				}
				// if both of these are selected, will want to show rows that match either, not both
				else if (this.state.searchPendingVerified == true && this.state.searchVerified == true) {
					if (obj[i].app_status.toLowerCase().includes('pending validaton') || obj[i].app_status.toLowerCase().includes('completed validation')) {
						this.populate(items, obj, i)
					}
				}
				else if (this.state.searchName != null) {
					if (obj[i].first_name.concat(' ', obj[i].last_name).toLowerCase().includes(this.state.searchName)) {
						this.populate(items, obj, i)
					}
				}
				else if (this.state.searchEmail != null) {
					if (obj[i].email.toLowerCase().includes(this.state.searchEmail)) {
						this.populate(items, obj, i)
					}
				}
				else if (this.state.searchVerified == true) {
					if (obj[i].app_status.toLowerCase().includes('completed validation')) {
						this.populate(items, obj, i)
					}
				}
				else if (this.state.searchPendingVerified == true) {
					if (obj[i].app_status.toLowerCase().includes('pending validation')) {
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
						<div className="row-buffer"> Results cannot be retrieved. Please contact admin.</div>
					)  :  (
					<Form>
					<div class="row-buffer side-buffer">
					<FormGroup row>
					<Col sm={4}>
						<h4> Search Cleaners </h4>
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
							<Label for="verified" sm={2}>Verified</Label>
							<Col sm={10}>
							<input type="checkbox" className="font-small d-flex align-items-center" onChange={this.onVerifiedSearch}/>
							</Col>
						</FormGroup>
						<FormGroup row >
							<Label for="verified" sm={2}>Pending Verification</Label>
							<Col sm={10}>
							<input type="checkbox" className="font-small d-flex align-items-center" onChange={this.onPendingVerifiedSearch} />
							</Col>
						</FormGroup>
					</Col>
					<Col lg>
						<div className="searchResults">
						<h4>Results</h4>
						<p>(Found {objLen} Total Cleaners)</p>
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
					</div>
					</Form>
					)}
				</>
		);
	}
}