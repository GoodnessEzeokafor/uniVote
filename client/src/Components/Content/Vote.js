import React, { Component } from 'react';
// import CandidateImg from "./candidates.png"
// import {  Link,  BrowserRouter as Router } from "react-router-dom";
import Web3 from "web3";
import Fortmatic from "fortmatic";
import ElectionAbi from "../../abis/Voting.json";
// import PlanLoader from "../Loader"

// import PlanLoader from './Components/Loader';

export default class Vote extends Component {
    _isMounted = false;

    async componentWillMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
        this._isMounted = true;
      }




  async loadWeb3() {
    this.setState({loader:true})
    
    // Sync functions that returns users' addresses if they are already logged in with enable().
    // Not recommended as sync functions will be deprecated in web3 1.0
    const fm = new Fortmatic("pk_test_BB47BFAE1F3D47D4");
    // fm.user.logout();
    window.web3 = new Web3(fm.getProvider());
    const web3 = window.web3;
    console.log(window.web3.currentProvider.isFortmatic)
    // Async functions that triggers login modal, if user not already logged in
    web3.eth.getAccounts((error, accounts) => {
      if (error) throw error;
      console.log(accounts); // 
    });
  }

  async loadBlockchainData() {
    // this.setState({loader:true})
    // console.log(SocialNetwork)
    const fm = new Fortmatic("pk_test_BB47BFAE1F3D47D4");
    window.web3 = new Web3(fm.getProvider());
    const web3 = window.web3;
    // fm.user.login().then(() => {

    //     // // load accounts
        const accounts = await web3.eth.getAccounts() // returns all the account in our wallet 
        this.setState({account:accounts[0]})
        
    //     // // detects the network dynamically 
        const networkId = await web3.eth.net.getId()
        // const balance = await web3.eth.getBalance(this.state.account)


    
    //     // // get network data
        const ElectionNetworkData= ElectionAbi.networks[networkId]
        if(ElectionNetworkData){
          const ElectionDapp = new web3.eth.Contract(ElectionAbi.abi, ElectionNetworkData.address) // loads the smart contract    

          console.log("-----------------VOTE COMPONENT---------------")
          // console.log(ElectionDapp)
    
    
          const candidateCount = await ElectionDapp.methods.candidateCount().call()
        //   const voters = await ElectionDapp.methods.voters(this.state.account).call()
          this.setState({ElectionDapp})
          this.setState({candidateCount})
    //       // Load ELECTIONS
          // LOAD CANDIDATES
        //   for(var i=1; i <= candidateCount; i++){
        //     const candidate = await ElectionDapp.methods.candidates(i).call()
        //     this.setState({
        //       candidate_lists:[...this.state.candidate_lists, candidate]
        //     })
        //   }

        //   console.log({candidates:this.state.candidate_lists})
      }else {
              window.alert("UniVote contract is not deployed to the network")
            }

  }



    constructor(props) {
        super(props);
        this.state = {
            candidate_lists:[],
            candidateCount:0,
            ElectionDapp:null
        }
    }
    
    render() {
        return (
            <div>
            {/* <div className="card card-default">
                <div className="card-header card-header-border-bottom">
                </div>
                <div className="card-body">
                    <div className="card-deck">
                       {this.state.candidate_lists.map((candidate,key) => {
                           return(
                            <div className="col-md-6 mb-3" key={key}>
                            <div className="card" >
                          
                            <img 
                                className="card-img-top" 
                                src={CandidateImg} 
                                alt="Card image cap" />
                            <div className="card-body">
                           <h5 className="card-title text-primary">{candidate.name}</h5>
                                <small className="card-text pb-3 font-weight-bold mb-2">
                                   FOR {candidate.post}
                                </small>
                                <p className="card-text">
                                    {this.props.voters ? 
                                            <button 
                                            className="btn btn-success"
                                            id={candidate.id}
                                            data-target="#exampleModal"
                                            style={{marginRight:"20px"}}
                                            onClick={async(event) => {
                                                const id = parseInt(candidate.id, 10)
                                                console.log(id)
                                                console.log(typeof id)
                                                this.props.ElectionDapp.methods.voteCandidate(id)                                                                             
                                                .send({from:this.props.account})
                                                .once('receipt', (receipt) => {
                                                    console.log(receipt);
                                                    // this.setState({loading:false})
                                                })
                                                event.preventDefault()
                                            }}
                                            >
                                                Vote Candidate
                                            </button>
                                    :
                                    <Link to="/" className="btn btn-success">Can't Vote</Link>
                                    }

                                </p>
                            </div>
                        </div>
                        </div>
                           );

                       })} 

                        
                    </div>
                </div>
            </div> */}
</div>

        );
    }
}

{/* <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}