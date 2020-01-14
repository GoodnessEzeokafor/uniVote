import React, { Component } from 'react';
import Web3 from "web3";
import Fortmatic from "fortmatic";
import ElectionAbi from "../../abis/Voting.json";


export default class Score extends Component {

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
    
              console.log("-----------------SCORE COMPONENT---------------")
              // console.log(ElectionDapp)
        
        
              const candidateCount = await ElectionDapp.methods.candidateCount().call()
            //   const voters = await ElectionDapp.methods.voters(this.state.account).call()
              this.setState({ElectionDapp})
              this.setState({candidateCount})
        //       // Load ELECTIONS
              // LOAD CANDIDATES
              for(var i=1; i <= candidateCount; i++){
                const candidate = await ElectionDapp.methods.candidates(i).call()
                this.setState({
                  candidate_lists:[...this.state.candidate_lists, candidate]
                })
              }
    
              console.log({candidates:this.state.candidate_lists})
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
                <h3 className="text-center mb-2">LIVE SCORE</h3>
            <table className="table">
                <thead className="thead-dark">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">FULL NAME</th>
                        <th scope="col">DEPARTMENT</th>
                        <th scope="col">LEVEL</th>
                        <th scope="col">SCORE</th>
                        </tr>
                </thead>
                    <tbody>
                        {this.state.candidate_lists.map((candidate,key) => {

                           return(
                        <tr key={key}>
                        <th scope="row">{candidate.id}</th>
                        <td>{candidate.name}</td>
                        <td>{candidate.department}</td>
                        <td>{candidate.level}</td>
                        <td>{candidate.voteCount}</td>
                        
                        </tr>
                            );  
                        })}
                    </tbody>
                </table>

            </div>
        );
    }
}