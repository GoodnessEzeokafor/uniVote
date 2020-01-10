import React, { Component } from 'react';
import SecondCountDown from './Electoral/SecondCountDown';
import PlanLoader from '../Loader';

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
                                <h2>CLICK ON THIS BUTTON TO REGISTER</h2>
                            </div>

                            
                            <div className="card-body">

                                <button 
                                        type="button" 
                                        className="mb-1 btn btn-block  btn-secondary"
                                        onClick ={async(event) => {
                                            console.log("HELLO VOTER")
                                            this.props.ElectionDapp.methods.register_voter(this.props.account)                                                                             
                                            .send({from:this.props.account})
                                            .once('receipt', (receipt) => {
                                                console.log(receipt);
                                                // this.setState({loading:false})
                                                window.location.reload()
                                            })
                                            event.preventDefault()
                                        }}>REGISTER TO VOTE</button>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}