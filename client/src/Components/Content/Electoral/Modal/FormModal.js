import React, { Component } from 'react';
// import "../Modal.css"

export default class FormModal extends Component {
    constructor(props) {
        super(props);
        
    }
    render() {
        const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";

        return (
            <div
            className={showHideClassName} 
              // class="modal fade" 
              tabIndex="-1" role="dialog">
                  <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                <h5 class="modal-title">ADD CANDIDATE</h5>
                  <button onClick={this.props.handleClose} type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                </div>  
                <div className="modal-body">
                <form onSubmit = {this.handleSubmit}>
                            <div className="form-row">
                                {/* Election Name */}
                                <div className="col-md-12 mb-3">
                                    <label htmlFor="validationServer01">Candidate Name</label>
                                    <input 
                                                ref={(input) => this.name = input}                                        type="text" 
                                        className="form-control" 
                                        id="validationServer01" 
                                        placeholder="Election Name Here"  required />
                                    <div className="valid-feedback">
                                        Looks good!
                                    </div>
                                </div>

                                <div className="col-md-12 mb-3">
                                           <label htmlFor="">CANDIDATE DEPARTMENT</label>
                                           <select
                                                ref={(input) => this.department = input} 
                                                className="form-control" name="" id="">
                                             <option value="COMPUTER SCIENCE">COMPUTER SCIENCE</option>
                                             <option value="COMPUTER EDUCTAION">COMPUTER EDUCTAION</option>
                                             <option value="MATH DEPARTMENT">MATH DEPARTMENT</option>
                                           </select>
                                    <div className="valid-feedback">
                                        Looks good!
                                    </div>
                                </div> 
                                <div className="col-md-12 mb-3">
                                           <label htmlFor="">CANDIDATE LEVEL</label>
                                           <select
                                                ref={(input) => this.level = input} 
                                                className="form-control" name="" id="">
                                             <option value="COMPUTER SCIENCE">COMPUTER SCIENCE</option>
                                             <option value="COMPUTER EDUCTAION">COMPUTER EDUCTAION</option>
                                             <option value="MATH DEPARTMENT">MATH DEPARTMENT</option>
                                           </select>
                                    <div className="valid-feedback">
                                        Looks good!
                                    </div>
                                </div> 

                            </div>
                            <button className="btn btn-primary btn-block" type="submit">Submit form</button>
                        </form>

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