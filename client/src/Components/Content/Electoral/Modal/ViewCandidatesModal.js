import React, { Component } from 'react';
// import "../Modal.css"

export default class ViewCandidatesModal extends Component {
    constructor(props) {
        super(props);
        // this.getCandidates = this.getCandidates(this)
    }
    // async getCandidates(id){
    //     const result = await this.props.ElectionDapp.methods.getElectionCandidates(id).call();
    //     return result;
    // }
    render() {
        const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
        // const candidates = this.getCandidates()
        // console.log(this.getCandidates())
        return (
            <div
            className={showHideClassName} 
              // class="modal fade" 
              tabIndex="-1" role="dialog">
                  <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
        <h5 className="modal-title text-center">
            {this.props.getCandidates['0']} ELECTION
            </h5>
            <small>{this.props.getCandidates['1']}</small>
                  <button onClick={this.props.handleClose} type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                </div>  
                <div className="modal-body">
                <table class="table">
                <thead class="thead-dark">
                     {/* {this.props.getCandidates['2'].map((candidate,key) => {
                        return(  */}
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">FULL NAME</th>
                        <th scope="col">DEPARTMENT</th>
                        <th scope="col">LEVEL</th>
                        <th scope="col">VOTE</th>
                        </tr>
                          {/* );
                     })}  */}
                </thead>
                    <tbody>
                        {/* {this.props.getCandidates['2'].map((candidate,key) =>{
                            return(  */}
                                <tr>
                                <th scope="row">1</th>
                                <td>GOODNESS CHINEMEREM EZEOKAFOR</td>
                                <td>COMPUTER SCIENCE</td>
                                <td>300 LEVEL</td>
                                <td>{this.props.getCandidates['2']}</td>
                                </tr>
                             {/* );
                        }) }  */}

                    </tbody>
                </table>

                </div>
                <div className="modal-footer">             
                  <button 
                    onClick={this.props.handleClose} 
                    data-dismiss="modal" 
                    type="button" 
                    className="btn btn-primary">Close</button>
                </div>
              </div>
            </div> 
            </div>
        );
    }
}