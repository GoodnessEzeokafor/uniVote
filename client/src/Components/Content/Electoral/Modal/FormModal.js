import React, { Component } from 'react';
// import "../Modal.css"

export default class FormModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
        
    }
    async  handleSubmit(event){
        event.preventDefault()
        console.log("Candidate Name:", this.name.value)
        console.log("Candidate Department:", this.department.value)
        console.log("Candidate Level:", this.level.value)
        console.log("Candidate POST:", this.post.value)
        
        // console.log("Election StartTime:", this.startTime.value)
        // let startTime= new Date(this.startTime.value) 
        // startTime = startTime.getTime()       
        // Write to the Blockchains
        this.props.ElectionDapp.methods.createCandidate(
        this.props.id,
        this.name.value,
        this.department.value,
        this.level.value,
        this.post.value
    )
    .send({from:this.props.account})
    .once('receipt', (receipt) => {
        console.log(receipt);
        this.setState({loading:false})
    })
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
                <h5 className="modal-title">ADD CANDIDATE</h5>
                  <button onClick={this.props.handleClose} type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                </div>  
                <div className="modal-body">
                <form onSubmit = {this.handleSubmit}>
                            <div className="form-row">
                                {/* Election Name */}
                                <div className="col-md-12 mb-3">
                                    <label htmlFor="validationServer01">Candidate Name</label>
                                    <input 
                                        ref={(input) => this.name = input}                                        
                                        type="text" 
                                        className="form-control" 
                                        // id="validationServer01" 
                                        placeholder="Candidate Name Here"  required />
                                    <div className="valid-feedback">
                                        Looks good!
                                    </div>
                                </div>

                                <div className="col-md-12 mb-3">
                                           <label htmlFor="">CANDIDATE DEPARTMENT</label>
                                           <select
                                                ref={(input) => this.department = input} 
                                                className="form-control" name="" id="">
                                             <option id="computerSci" value="COMPUTER SCIENCE">COMPUTER SCIENCE</option>
                                             <option id="computerEdu" value="COMPUTER EDUCTAION">COMPUTER EDUCTAION</option>
                                             <option id="maths" value="MATH DEPARTMENT">MATH DEPARTMENT</option>
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
                                             <option id="100lvl" value="100 LEVEL">100 LEVEL</option>
                                             <option id="200lvl" value="200 LEVEL">200 LEVEL</option>
                                             <option id="300lvl" value="300 LEVEL">300 LEVEL</option>
                                             <option id="400lvl" value="400 LEVEL">400 LEVEL</option>
                                             
                                           </select>
                                    <div className="valid-feedback">
                                        Looks good!
                                    </div>
                                </div> 
                                <div className="col-md-12 mb-3">
                                           <label htmlFor="">OFFICE POST</label>
                                           <select
                                                ref={(input) => this.post = input} 
                                                className="form-control" name="" id="">
                                             <option id="PRESIDENT" value="PRESIDENT">PRESIDENT</option>
                                             <option id="VICE-PRESIDENT" value="VICE-PRESIDENT">VICE PRESIDENT</option>
                                             <option id="Secretary-General" value="SECRETARY-GENERAL">SECRETARY GENERAL</option>
                                             <option id="Financial-secretary" value="FINIANCIAL-SECRETARY">FINIANCIAL SECRETARY</option>
                                             <option id="Assistant-Secretary-General" value="ASSISTANT-SECRETARY-GENERAL"> ASSISTANT SECRETARY GENERAL</option>
                                             <option id="Welfare-Secretary" value="WELFARE-SECRETARY"> WELFARE SECRETARY</option>
                                             <option id="Director-of-Software" value="DIRECTOR-OF-SOFTWARE"> DIRECTOR OF SOFTWARE</option>
                                             <option id="Director-of-Socials" value="DIRECTOR-OF-SOCIALS">DIRECTOR OF SOCIALS</option>
                                             <option id="Director-of-Sports" value="DIRECTOR-OF-SPORTS">DIRECTOR OF SPORTS</option>
                                             <option id="Public-Relations-Officer" value="PUBLIC-RELATIONS-OFFICER">PUBLIC RELATIONS OFFICER</option>
                                             <option id="Auditor-General" value="AUDITOR-GENERAL">AUDITOR GENERAL</option>
                                             <option id="Treasurer" value="TREASURER">TREASURER</option>
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