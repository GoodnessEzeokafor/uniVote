import React, { Component } from 'react';
import Nav from "./Components/Content/Nav"
import { Route, Link, Switch, BrowserRouter as Router } from "react-router-dom";
import Web3 from "web3";


/* COMPONENTS */
import Home from"./Components/Content/Home"
import Score from"./Components/Content/Score"
import Vote from "./Components/Content/Vote"
import Profile from "./Components/Profile/Dashboard"
import ElectionForm from "./Components/Content/Electoral/ElectionForm"
import Elections from "./Components/Content/Electoral/Elections"

// import Login from "./Components/Auth/Login"
// import Signup from "./Components/Auth/Signup"
/* COMPONENTS */

import ElectionAbi from "./abis/Voting.json";

export default class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async loadBlockchainData() {
    // console.log(SocialNetwork)
    const web3 = window.web3;
    window.web3 = new Web3(window.ethereum);
    
    //     // // load accounts
        const accounts = await web3.eth.getAccounts() // returns all the account in our wallet 
        this.setState({account:accounts[0]})
        // console.log(accounts)
    
    //     // // detects the network dynamically 
        const networkId = await web3.eth.net.getId()
    
    //     // // get network data
        const ElectionNetworkData= ElectionAbi.networks[networkId]
        if(ElectionNetworkData){
          const ElectionDapp = new web3.eth.Contract(ElectionAbi.abi, ElectionNetworkData.address) // loads the smart contract    
          // console.log(ElectionDapp)
    
    
          const electionAuthority = await ElectionDapp.methods.electionAuthority().call()  // gets the address of the election coordinator
          const dapp_name = await ElectionDapp.methods.dapp_name().call()
          const electionCount = await ElectionDapp.methods.electionCount().call()
          const candidateCount = await ElectionDapp.methods.candidateCount().call()
          console.log("Account of Election Coordinator:",electionAuthority)
          this.setState({electionAuthority})
          this.setState({ElectionDapp})
          this.setState({dapp_name})
          this.setState({candidateCount})
          this.setState({electionCount})

          // const electionEndTime = await ProjectDapp.methods.projectCount().call() 
          // const candidates = await ProjectDapp.methods.projectCount().call() 
          // const voters = await ProjectDapp.methods.projectCount().call() 
          // const hasVoted = await ElectionDapp.methods.hasVoted()
          // console.log("Projects Length:", projectCount)


            // this.setState({ProjectDapp})
            //  this.setState({projectCount})
    
    //       // Load ELECTIONS
          for(var j=1; j <= electionCount; j++){
            const election = await ElectionDapp.methods.elections(j).call()
            this.setState({
              elections:[...this.state.elections, election]
            })
          }
          // LOAD CANDIDATES
          for(var i=1; i <= candidateCount; i++){
            const candidate = await ElectionDapp.methods.candidates(i).call()
            this.setState({
              candidate_lists:[...this.state.candidate_lists, candidate]
            })
          }

          console.log({candidates:this.state.candidate_lists})
        //   console.log({contributors:this.state.contributors})
      }else {
              window.alert("UniVote contract is not deployed to the network")
            }

  }
  constructor(props) {
    super(props)
    this.state ={
     account:'',
     ElectionDapp:null,
    //  projects:[],
     loader:false,
     message:'',
     dapp_name:'',
     elections:[],
     candidate_lists:[],
     candidateCount:0,
     electionCount:0,

    //  message:''
    }
   }


  render() {
    return (
  <Router>
        <div>
        <div className="mobile-sticky-body-overlay"></div>

      <div className="wrapper">
        
                {/* <!--
            ====================================
            ——— LEFT SIDEBAR WITH FOOTER
            =====================================
          --> */}
          <aside className="left-sidebar bg-sidebar">
            <div id="sidebar" className="sidebar sidebar-with-footer">
              {/* <!-- Aplication Brand -->
              */}
              <div className="app-brand">
                <a href="/">
                  <svg
                    className="brand-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid"
                    width="30"
                    height="33"
                    viewBox="0 0 30 33"
                  >
                    <g fill="none" fillRule="evenodd">
                      <path
                        className="logo-fill-blue"
                        fill="#7DBCFF"
                        d="M0 4v25l8 4V0zM22 4v25l8 4V0z"
                      />
                      <path className="logo-fill-white" fill="#FFF" d="M11 4v25l8 4V0z" />
                    </g>
                  </svg>
            <span className="brand-name">{this.state.dapp_name}</span>
                </a>
              </div>
              {/* <!-- begin sidebar scrollbar --> */}
              <div className="sidebar-scrollbar">

                {/* <!-- sidebar menu --> */}
                <ul className="nav sidebar-inner" id="sidebar-menu">
                <li  className="has-sub active expand" >
                    <Link className="sidenav-item-link" to="/">
                      <i className="mdi mdi-view-dashboard-outline"></i>
                      <span className="nav-text">Home</span> 
                      {/* <b className="caret"></b> */}
                    </Link>
                </li>
                {this.state.account === this.state.electionAuthority ?
                <li  className="has-sub active expand" >
                <Link className="sidenav-item-link" to="/createElection">
                  <i className="mdi mdi-view-dashboard-outline"></i>
                  <span className="nav-text">Create Election</span> 
                  {/* <b className="caret"></b> */}
                </Link>
                 </li> 
                 : <span></span>}
              
                    <li  className="has-sub active expand" >
                      <Link className="sidenav-item-link" to="/score">
                        <i className="mdi mdi-view-dashboard-outline"></i>
                        <span className="nav-text">Live Score</span> 
                        {/* <b className="caret"></b> */}
                      </Link>
                    </li>
                    <li  className="has-sub active expand" >
                      <Link className="sidenav-item-link" to="/elections">
                        <i className="mdi mdi-view-dashboard-outline"></i>
                        <span className="nav-text">Elections</span> 
                        {/* <b className="caret"></b> */}
                      </Link>
                    </li>
                    
                    <li  className="has-sub active expand">
                      <Link className="sidenav-item-link" to="/vote">
                        <i className="mdi mdi-folder-multiple-outline"></i>
                        <span className="nav-text">Vote</span> 
                      </Link>
                    </li>
                    <li  className="has-sub" >
                      <Link className="sidenav-item-link" to="/profile">
                        <i className="mdi mdi-chart-pie"></i>
                        <span className="nav-text">Profile</span> 
                        {/* <b className="caret"></b> */}
                      </Link>
                    </li>        
                </ul>
              </div>
              {/* <hr className="separator" /> */}
            </div>
          </aside>
        <div className="page-wrapper">
                    {/* <!-- Header --> */}
            <header className="main-header " id="header">
              <Nav 
                account={this.state.account}
                />
            </header>


          <div className="content-wrapper">
            <div className="content">	
            <Switch>
            <Route path="/createElection">
                  <ElectionForm 
                    ElectionDapp={this.state.ElectionDapp}
                    account={this.state.account}
                  />
              </Route>
              <Route path="/score">
                  <Score />
              </Route>
              <Route path="/elections">
                  <Elections 
                   elections={this.state.elections} 
                   ElectionDapp={this.state.ElectionDapp}
                   account={this.state.account}
                   />
              </Route>
              <Route path="/profile">
                  <Profile />
              </Route>
              <Route path="/vote">
                  <Vote 
                      candidate_lists={this.state.candidate_lists} 
                      ElectionDapp={this.state.ElectionDapp}
                      account={this.state.account}
                  />
              </Route>
              <Route path="/">
                  <Home />
              </Route>              
            </Switch>
            </div>
          </div>


        </div>
      </div>
  </div>
  </Router>
    );
 
  }
}