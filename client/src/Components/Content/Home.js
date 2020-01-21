import React, { Component } from 'react';
// import SecondCountDown from './Electoral/SecondCountDown';
// import PlanLoader from '../Loader';
// import Web3 from "web3";
import axios from "axios"

import Fortmatic from "fortmatic";

export default class Home extends Component {
    _isMounted = false;

    
    // componentWillUnmount() {
    //     this._isMounted = false;
    //   }
    
    constructor(props) {
        super(props);
        this.state = {
            message_state:false,
            message:'',
            isStudent:false,
            persons:[]
        }

    }
    componentDidMount() {
        // axios.get(`https://jsonplaceholder.typicode.com/users`)
        // this._isMounted = true;
        let currentComponent = this;

        axios.get(`https://ujevote.herokuapp.com/users`)
            .then(res => {
            const persons = res.data.userdetails;
            this.setState({ persons });
            // console.log(this.state.persons.length)
            })
    
            // this.fetchData()
        }
    
    // fetchData = () => {
    //     axios.get(`/users`).then(function(response) {
    //         const persons = response.data.userdetails
    //         console.log(persons)
    //         this.setState({ persons })
    //     })
    // }

    
// componentDidMount(){

// }

    verifyEmail(){
        // console.log(this.props.persons)
        console.log("LOGGED IN EMAIL:",this.props.email)
        for(var i=0;i< this.state.persons.length; i++){
            if(this.state.persons[i].email.toLowerCase() === this.props.email.toLowerCase()){
                this.setState({isStudent:true})
                console.log(this.props.email)

                 break;
                }
            //  if(this.props.persons[i].email !== this.props.email){
            //      alert("NOT REGISTERED TO VOTE")
            //      break;
            //  }   
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
                                    // this.props.ShowLoader()
                                    // this.verifyEmail()

                                    if(this.state.isStudent){
                                        this.verifyEmail()
                                        this.props.ElectionDapp.methods.register_voter(this.props.account)                                                                             
                                        .send({from:this.props.account})
                                        .once('receipt', (receipt) => {
                                            console.log(receipt);
                                            this.setState({message_state:true})
                                            this.setState({message:"THANKS FOR REGISTERING ON OUR PLATFORM"})    
                                            window.location.reload()
  
                                        }
                                         )
                                    }else{
                                        alert("NOT A STUDENT")
                                    }
                                //    this.props.HideLoader()
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