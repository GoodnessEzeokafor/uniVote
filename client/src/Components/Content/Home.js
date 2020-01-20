import React, { Component } from 'react';
// import SecondCountDown from './Electoral/SecondCountDown';
// import PlanLoader from '../Loader';
// import Web3 from "web3";

import Fortmatic from "fortmatic";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message_state:false,
            message:''
        }
    }


    render() {
        return (
            <div>

                    {!this.state.message_state ? 
                    <span></span>                    
                    :
                    <div className="col-lg-12">
                    <div class="alert alert-info alert-highlighted" role="alert">
                        {this.state.message}
                    </div>
                    </div>

                    }

                    <div className="col-lg-6 mr-auto ml-auto">
                        {/* <!-- Block buttons --> */}
                        <div className="card card-default">

                        <div className="card-header card-header-border-bottom">
        <h2>Welcome to Univote {this.props.email}</h2>
                            </div>
                            <div className="card-header card-header-border-bottom">
                            {!this.props.voters ? 
                                <center><h2>CLICK ON THIS BUTTON TO REGISTER</h2></center>
                                :
                                <center><h2>ALREADY REGISTERED!!</h2></center>

                                }
                            </div>

                            
                            <div className="card-body">
                                {this.props.voters ? 
                                    <button 
                                    type="button" 
                                    className="mb-1 btn btn-block  btn-secondary"
                                    disabled
                                    >ALREADY REGISTERED</button>

                                :
                                <button 
                                type="button" 
                                className="mb-1 btn btn-block  btn-secondary"
                                onClick ={async(event) => {
                                    event.persist()
                                    
                                    const fm = new Fortmatic("pk_test_BB47BFAE1F3D47D4");

                                    const user = await fm.user.getUser()
                                    console.log(user.email)

                                    for (let k in this.props.persons) {
                                        
                                        
                                        if (this.props.persons[k].email.toLowerCase() === user.email.toLowerCase() ) {

                                            // return true;
                                            console.log("HELLO VOTER")
                                            console.log(user)
                                    this.props.ShowLoader()
                                    this.props.ElectionDapp.methods.register_voter(this.props.account)                                                                             
                                    .send({from:this.props.account})
                                    .once('receipt', (receipt) => {
                                        console.log(receipt);
                                        this.setState({message_state:true})
                                        this.setState({message:"THANKS FOR REGISTERING ON OUR PLATFORM"})
                                        
                                        
                                        // window.location.reload()
                                    })
                                    break

                                        }

                                        
                                        else{
                                            alert("This Email is not eligible to vote on this platform")
                                            console.log(user.email)
                                        }
                                        break;
                                    }
                                   
                                    
                                
                                    
                                   this.props.HideLoader()
                                    event.preventDefault()
                                }}>REGISTER TO VOTE</button>

                                }
                                        <br></br>
                                        <br></br>

                                        <button 
                                        type="button" 
                                        className="mb-1 btn btn-block  btn-primary"
                                        onClick ={async() => {
                                            const fm = new Fortmatic("pk_test_BB47BFAE1F3D47D4");
                                            console.log("Logging out")
                                            await fm.user.logout();
                                               window.location.reload()
                                            // event.preventDefault()
                                        }}>Logout</button>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}