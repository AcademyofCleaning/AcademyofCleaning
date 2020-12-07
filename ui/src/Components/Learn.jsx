import React from 'react';
import { Table, Label } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class ProfilePage extends React.Component {
    constructor(props){
      super(props);
    }
  
    render(){
      return(
        <Table className="row-buffer" responsive>
            <Label for="name" sm={4}><h4 className="left-center" >Start Learning Here</h4></Label>
            <tbody>
            <tr>
            <iframe width="648" height="365" src="https://www.youtube.com/embed/TqHX3pTeRdg" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </tr> 
            <tr>
              <Label for="name" sm={2}>Cleaning Tips 101</Label> 
            </tr> <br></br>


            <tr>
            <iframe width="648" height="365" src="https://www.youtube.com/embed/2fFaPDe5uI8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </tr>
            <tr>
              <Label for="name" sm={2}>How to Mop</Label> 
            </tr> <br></br>
            
            <tr>
            <iframe width="648" height="486" src="https://www.youtube.com/embed/iApBJYyi67k" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </tr>
            <tr>
              <Label for="name" sm={4}>Window Cleaning like a Pro</Label> 
            </tr> <br></br>
            </tbody>

            <div className="center-align">
                <Link to= {`/`}className="btn btn-secondary">Back to Home</Link>
              </div>
        </Table>
      )}
    }