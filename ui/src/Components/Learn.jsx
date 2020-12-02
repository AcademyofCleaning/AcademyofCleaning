import React from 'react';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class ProfilePage extends React.Component {
    constructor(props){
      super(props);
    }
  
    render(){
      return(
        <Table className="row-buffer" responsive>
            <h3> Start Learning Here! </h3>
            <tbody>
            <tr>
            <iframe width="648" height="365" src="https://www.youtube.com/embed/TqHX3pTeRdg" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </tr> 
            <tr>
                Cleaning Tips 101
            </tr> <br></br>


            <tr>
            <iframe width="648" height="365" src="https://www.youtube.com/embed/2fFaPDe5uI8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </tr>
            <tr>
                How to Mop
            </tr> <br></br>
            
            <tr>
            <iframe width="648" height="486" src="https://www.youtube.com/embed/iApBJYyi67k" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </tr>
            <tr>
                Window Cleaning like a Pro
            </tr> <br></br>
            </tbody>

            <div className="center-align">
                <Link to= {`/`}className="btn btn-secondary">Back to Home</Link>
              </div>
        </Table>
      )}
    }