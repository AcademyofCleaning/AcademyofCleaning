import React from 'react';
import { Table, Button, Col, Form, FormGroup, Label, Switch} from 'reactstrap';
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
			searchCity: null,
			searchProvince: null,
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

	onProvinceSearch = (event) => {
		this.setState({ searchProvince: event.target.value });
		};
	
	onCitySearch = (event) => {
		this.setState({ searchCity: event.target.value });
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
			var indices = [];
			var indLen = indices.length
			

			// Builds table with JSON object items passed in
			for (var i = 0; i < objLen; i++) {

				if (this.state.searchName != null) {
					if (indLen == 0) {
						if (obj[i].first_name.concat(' ', obj[i].last_name).toLowerCase().includes(this.state.searchName)) {
							if (!indices.includes(i)){
								indices.push(i);
							}
							console.log(obj[i])
						}
					}
					if (indLen == objLen) {
						indLen = 0
					}
					else {
						for (var j = 0; j < indices.length; j++){
							if (!obj[indices[j]].first_name.concat(' ', obj[indices[j]].last_name).toLowerCase().includes(this.state.searchName)) {
								indices.splice(indices[j],1);
								j--;
							}
						}
					}
				}
				
				if (this.state.searchEmail != null) {
					if (indLen == 0) {
						if (obj[i].email.toLowerCase().includes(this.state.searchEmail)) {
							if (!indices.includes(i)){
								indices.push(i);
							}
						}
					}
					if (indLen == objLen) {
						indLen = 0
					}
					else {
						for (var j = 0; j < indices.length; j++){
							if (!obj[indices[j]].email.toLowerCase().includes(this.state.searchEmail)) {
								indices.splice(indices[j],1);
								j--;
							}
						}
					}
				}

				if (this.state.searchProvince != null) {
					if (indLen == 0 && obj[i].province != null) {
						if (obj[i].province.toLowerCase().includes(this.state.searchProvince)) {
							if (!indices.includes(i)){
								indices.push(i);
							}
						}
					}
					if (indLen == objLen) {
						indLen = 0
					}
					else {
						for (var j = 0; j < indices.length; j++){
							if (obj[indices[j]].province == null) {
								indices.splice(indices[j],1);
								j--;
							}
							else if (!obj[indices[j]].province.toLowerCase().includes(this.state.searchProvince)) {
								indices.splice(indices[j],1);
								j--;
							}
						}
					}
				}

				if (this.state.searchCity != null) {
					if (indLen == 0 && obj[i].city != null) {
						if (obj[i].city.toLowerCase().includes(this.state.searchCity)) {
							if (!indices.includes(i)){
								indices.push(i);
							}
						}
					}
					if (indLen == objLen) {
						indLen = 0
					}
					else {
						for (var j = 0; j < indices.length; j++){
							if (obj[indices[j]].city == null) {
								indices.splice(indices[j],1);
								j--;
							}
							else if (!obj[indices[j]].city.toLowerCase().includes(this.state.searchCity)) {
								indices.splice(indices[j],1);
								j--;
							}
						}
					}
				}
			}
			if (this.state.searchEmail == null && this.state.searchName == null && this.state.searchProvince == null && this.state.searchCity == null) {
				indices = []
				for (var i = 0; i < objLen; i++) {
					this.populate(items, obj, i)
				}
			}
			else{
				for (var i = 0; i < indices.length; i++){
					this.populate(items, obj, indices[i])
				}
			}
			console.log(this.state.searchName)
			console.log(indices)

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
							<input type="text" className="input" onChange={this.onEmailSearch} placeholder="6471231234"/>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="province" sm={2}>Province</Label>
							<Col sm={10}>
							<input type="text" className="input" onChange={this.onProvinceSearch} placeholder="ON"/>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="city" sm={2}>City</Label>
							<Col sm={10}>
							<input type="text" className="input" onChange={this.onCitySearch} placeholder="Toronto"/>
							</Col>
						</FormGroup>
					</Col>
					<Col lg>
						<div className="searchResults">
						<h4>Results</h4>
						<p>(Search The Total {objLen} Cleaners)</p>
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