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
        console.log("Election Name:", this.name_of_election.value)
        console.log("Election Description:", this.description_of_election.value)
        console.log("Election Duration:", this.duration.value)
        console.log("Election StartTime:", this.startTime.value)
        let startTime= new Date(this.startTime.value) 
        startTime = startTime.getTime()       
        // Write to the Blockchains
        this.props.ElectionDapp.methods.createElection(
        this.name_of_election.value,
        this.description_of_election.value,
        this.duration.value,
        startTime
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
                        <h2>CREATE ELECTION</h2>
                    </div>
                    <div className="card-body">
                        <form onSubmit = {this.handleSubmit}>
                            <div className="form-row">
                                {/* Election Name */}
                                <div className="col-md-12 mb-3">
                                    <label htmlFor="validationServer01">Election Name</label>
                                    <input 
                                        ref = {(input) => this.name_of_election = input}
                                        type="text" 
                                        className="form-control" 
                                        // id="validationServer01" 
                                        placeholder="Election Name Here"  required />
                                    <div className="valid-feedback">
                                        Looks good!
                                    </div>
                                </div>

                                <div className="col-md-12 mb-3">
                                      <label htmlFor="">Election Description</label>
                                      <textarea 
                                        class="form-control" 
                                        name="" 
                                        id="" 
                                        rows="3"
                                        ref={(input) => this.description_of_election = input}
                                        ></textarea>
                                    <div className="valid-feedback">
                                        Looks good!
                                    </div>
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label htmlFor="">Election Start Time</label>
                                    <input 
                                        ref = {(input) => this.startTime = input}
                                        type="date" 
                                        className="form-control" 
                                        id="" 
                                        placeholder="Select Date"
                                        required />
                                    <div className="valid-feedback">
                                        Looks good!
                                    </div>
                                </div><div className="col-md-12 mb-3">
                                    <label htmlFor="">Election Duration</label>
                                    <input 
                                        ref = {(input) => this.duration = input}
                                        type="text" 
                                        className="form-control" 
                                        id="" 
                                        placeholder="Election Duration(min)"  required />
                                    <div className="valid-feedback">
                                        Looks good!
                                    </div>
                                </div>

                                {/* <div className="col-md-12 mb-3">
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
                                </div> */}

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