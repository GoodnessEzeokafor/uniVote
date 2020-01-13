import React, { Component } from 'react';
import SecondCountDown from './Electoral/SecondCountDown';
import PlanLoader from '../Loader';
import Web3 from "web3";
import Fortmatic from "fortmatic";

export default class Home extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>





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

                                    console.log("HELLO VOTER")
                                    this.props.ShowLoader()
                                    this.props.ElectionDapp.methods.register_voter(this.props.account)                                                                             
                                    .send({from:this.props.account})
                                    .once('receipt', (receipt) => {
                                        console.log(receipt);
                                        // this.setState({loading:false})
                                        // window.location.reload()
                                    })
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