import React, { Component } from 'react';

export default class CandidateForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading:false,
            message:'',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async  handleSubmit(event){
        event.preventDefault()
        console.log("Candidate Name:", this.full_name.value)
        console.log("Candidate Department:", this.department.value)
        console.log("Candidate level:", this.level.value)
                  // Write to the Blockchains
                  this.props.ElectionDapp.methods.createCandidate(
                      this.full_name.value,
                      this.department.value,
                      parseInt(this.level.value,10)
                )
                .send({from:this.props.account})
                .once('receipt', (receipt) => {
                    console.log(receipt);
                    this.setState({loading:false})
                })
    }
    render() { 
        return (
            <div className="row">

            <div className="col-lg-6 mr-auto ml-auto">
                <div className="card card-default">
                    <div className="card-header card-header-border-bottom">
                        <h2>ADD CANDIDATE</h2>
                    </div>
                    <div className="card-body">
                        <form onSubmit = {this.handleSubmit}>
                            <div className="form-row">
                                <div className="col-md-12 mb-3">
                                    <label htmlFor="validationServer01">Full Name</label>
                                    <input 
                                        ref = {(input) => this.full_name = input}
                                        type="text" 
                                        className="form-control" 
                                        id="validationServer01" 
                                        placeholder="Full Name Here"  required />
                                    <div className="valid-feedback">
                                        Looks good!
                                    </div>
                                </div>
                                <div className="col-md-12 mb-3">
                                           <label htmlFor="">DEPARTMENT</label>
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
                                           <label htmlFor="">LEVEL</label>
                                           <select 
                                                ref={(input) => this.level = input}
                                                className="form-control" name="" id="">
                                             <option value="100">100 LEVEL</option>
                                             <option value="200">200 LEVEL </option>
                                             <option value="300">300 LEVEL</option>
                                             <option value="400">400 LEVEL</option>
                                           </select>
                                    <div className="valid-feedback">
                                        Looks good!
                                    </div>
                                </div>
                            </div>
                            <button className="btn btn-primary btn-block" type="submit">Submit form</button>
                        </form>
                    </div>
                </div>
            </div>

</div>
);
}
}