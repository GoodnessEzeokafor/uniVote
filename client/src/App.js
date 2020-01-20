import React, { Component } from 'react';
import Nav from "./Components/Content/Nav"
import { Route, Link, Switch, BrowserRouter as Router } from "react-router-dom";
import Web3 from "web3";
import Fortmatic from "fortmatic";
import axios from "axios"



/* COMPONENTS */
import Home from"./Components/Content/Home"
import Score from"./Components/Content/Score"
import Vote from "./Components/Content/Vote"
// import Profile from "./Components/Profile/Dashboard"
import ElectionForm from "./Components/Content/Electoral/ElectionForm"
import Elections from "./Components/Content/Electoral/Elections"

// import Login from "./Components/Auth/Login"
// import Signup from "./Components/Auth/Signup"
/* COMPONENTS */

import ElectionAbi from "./abis/Voting.json";
import CardProfile from './Components/Profile/Dashboard';

export default class App extends Component {
  async componentDidMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
    // await this.checkIncognito();

    axios.get(`/users`)
      .then(res => {
        const persons = res.data.userdetails;
        this.setState({ persons });
        console.log(this.state.persons[100].email.toLowerCase())
        console.log(this.state.persons.length)
      })
  }


  // async checkIncognito(){
  //   isPrivateWindow(function(is_private) {
  //     document.getElementById('root').innerHTML = is_private === null ? 'cannot detect' : is_private ? 'private <span>👻</span>' : console.log(" Not Private");
  //   });
  // }

  async loadWeb3() {
    this.setState({loader:true})
    
    // Sync functions that returns users' addresses if they are already logged in with enable().
    // Not recommended as sync functions will be deprecated in web3 1.0
    const fm = new Fortmatic("pk_test_BB47BFAE1F3D47D4");
    // fm.user.logout();
    window.web3 = new Web3(fm.getProvider());
    const web3 = window.web3;
    console.log(window.web3.currentProvider.isFortmatic)
    

  
    // window.web3.currentProvider.isFortmatic; // => true
    // console.log(web3.eth.accounts); // ['0x...']
    // console.log(web3.eth.coinbase); // '0x...'

    // await window.ethereum.enable();

    // Async functions that triggers login modal, if user not already logged in
    web3.eth.getAccounts((error, accounts) => {
      if (error) throw error;
      console.log(accounts); // ['0x...']
    });
    //  else {
    //   window.alert(
    //     "Non-Ethereum browser detected. You should consider trying MetaMask or FortMatic!"
    //   );
    // }
  }

  async loadBlockchainData() {
    this.setState({loader:true})
    // console.log(SocialNetwork)
    const fm = new Fortmatic("pk_test_BB47BFAE1F3D47D4");
    window.web3 = new Web3(fm.getProvider());

    const web3 = window.web3;

    // fm.user.login().then(() => {

    //     // // load accounts
        const accounts = await web3.eth.getAccounts() // returns all the account in our wallet 
        this.setState({account:accounts[0]})
        
        // console.log(accounts)
    
    //     // // detects the network dynamically 
        const networkId = await web3.eth.net.getId()
        const balance = await web3.eth.getBalance(this.state.account)


        // gets the email of the user
        var loggedInMail = await fm.user.getUser(); 
        var email = loggedInMail.email
        console.log(email)

        this.setState({email})
        console.log("Balance:",balance)
    
    //     // // get network data
        const ElectionNetworkData= ElectionAbi.networks[networkId]
        if(ElectionNetworkData){
          const ElectionDapp = new web3.eth.Contract(ElectionAbi.abi, ElectionNetworkData.address) // loads the smart contract    
          // console.log(ElectionDapp)
    
    
          const electionAuthority = await ElectionDapp.methods.electionAuthority().call()  // gets the address of the election coordinator
          const dapp_name = await ElectionDapp.methods.dapp_name().call()
          const electionCount = await ElectionDapp.methods.electionCount().call()
          const candidateCount = await ElectionDapp.methods.candidateCount().call()
          const voters = await ElectionDapp.methods.voters(this.state.account).call()
          // const liveScoreCandidatesCount = await ElectionDapp.methods.liveScoreCandidateCount().call()
          // liveScoreCandidates
          console.log("Account of Election Coordinator:",electionAuthority)
          console.log("Account of the deployer", this.state.account)
          this.setState({electionAuthority})
          this.setState({ElectionDapp})
          this.setState({dapp_name})
          this.setState({candidateCount})
          this.setState({electionCount})
          this.setState({voters})
          // this.setState({liveScoreCandidatesCount})
          if(voters === true){
            console.log("VOTERS:", voters);
          } else{
            console.log("NOT TRUE:")
          }
    // //       // Load CANDIDATES
    //       for(var i=1; i <= liveScoreCandidatesCount; i++){
    //         const candidate = await ElectionDapp.methods.liveScoreCandidates(i).call()
    //         this.setState({
    //           liveScoreCandidates:[...this.state.liveScoreCandidates, candidate],              
    //         })
    //       }
//ELECTION
          for(var j=1; j <= electionCount; j++){
            const election = await ElectionDapp.methods.elections(j).call()
            this.setState({
              elections:[...this.state.elections, election],
              
            })
          }
          console.log({elections:this.state.elections})

          // LOAD CANDIDATES
          // for(var i=1; i <= candidateCount; i++){
          //   const candidate = await ElectionDapp.methods.candidates(i).call()
          //   this.setState({
          //     candidate_lists:[...this.state.candidate_lists, candidate]
          //   })
          // }

          // console.log({candidates:this.state.candidate_lists})
          this.setState({loader:false})
        //   console.log({contributors:this.state.contributors})
      }else {
              window.alert("UniVote contract is not deployed to the network")
            }

  }

  // componentWillMount() {
  //   // axios.get(`https://jsonplaceholder.typicode.com/users`)
  //   axios.get(`/users`)
  //     .then(res => {
  //       const persons = res.data.userdetails;
  //       this.setState({ persons });
  //       console.log(this.state.persons[100].email.toLowerCase())
  //       console.log(this.state.persons.length)
  //     })
  // }

  ShowLoader(){

    this.setState({
     
      loader : true
    })
  }

  HideLoader(){

    this.setState({
     
      loader : false
    })
  }

  constructor(props) {

   
    super(props)
    this.ShowLoader = this.ShowLoader.bind(this)
    this.HideLoader = this.HideLoader.bind(this)
    this.state ={
     account:'',
     email : '',
     ElectionDapp:null,
    //  projects:[],
     loader:false,
     message:'',
     dapp_name:'',
     elections:[],
     candidate_lists:[],
     liveScoreCandidates:[],
     candidateCount:0,
     electionCount:0,
     voters:null,
    //  liveScoreCandidatesCount:0,
     persons : []

    //  message:''
    }
   }


  render() {
    return (
  <Router>
        <div>
        <div className="mobile-sticky-body-overlay"></div>
        {this.state.loader ? 
                           <div className="col-lg-12">
                    <div class="alert alert-info alert-highlighted" role="alert">
                       <h3>LOADING PLEASE WAIT</h3>
                    </div>
                    </div>
        : 

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
                <a href="#">
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
                      </Link>
                    </li>
                    <li  className="has-sub active expand" >
                      <Link className="sidenav-item-link" to="/elections">
                        <i className="mdi mdi-view-dashboard-outline"></i>
                        <span className="nav-text">Elections</span> 
                        {/* <b className="caret"></b> */}
                      </Link>
                    </li>
                    
                    {/* <li  className="has-sub active expand">
                      <Link className="sidenav-item-link" to="/vote">
                        <i className="mdi mdi-folder-multiple-outline"></i>
                        <span className="nav-text">Vote</span> 
                      </Link>
                    </li> */}
                    <li  className="has-sub active expand">
                      <Link className="sidenav-item-link" to="/profile">
                        <i className="mdi mdi-chart-pie"></i>
                        <span className="nav-text">Profile</span> 
                        {/* <b className="caret"></b> */}
                      </Link>
                    </li>    
                    {/* <li  className="has-sub" >
                      <Link className="sidenav-item-link" to="/persons">
                        <i className="mdi mdi-chart-pie"></i>
                        <span className="nav-text">Persons</span> 
                      </Link>
                    </li> */}                            
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
                email ={this.state.loggedInMail}
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
              {/* <Route path="/score">
                  <Score 
                            // candidate_lists={this.state.candidate_lists} 
                            ElectionDapp={this.state.ElectionDapp}
                            // liveScoreCandidates={this.state.liveScoreCandidates}
                            account={this.state.account}
                            // liveScoreCandidatesCount={this.state.liveScoreCandidatesCount}
                    />
              </Route> */}
              <Route path="/elections">
                  <Elections 
                   elections={this.state.elections} 
                   ElectionDapp={this.state.ElectionDapp}
                   account={this.state.account}
                   electionAuthority={this.state.electionAuthority}
                   candidateCount = {this.state.candidateCount}
                   />
              </Route>
              <Route path="/profile">
                  <CardProfile  email = {this.state.email}
                  account={this.state.account} />
              </Route>
              {/* <Route path="/vote">
                  <Vote 
                      // candidate_lists={this.state.candidate_lists} 
                      ElectionDapp={this.state.ElectionDapp}
                      account={this.state.account}
                      voters={this.state.voters}
                  />
              </Route> */}
              {/* <Route path="/persons">
                  <PersonList 
                      candidate_lists={this.state.candidate_lists} 
                      ElectionDapp={this.state.ElectionDapp}
                      account={this.state.account}
                      voters={this.state.voters}
                  />
              </Route> */}
              <Route path="/">
                  <Home 
                      ElectionDapp={this.state.ElectionDapp}
                      email = {this.state.email}
                      account={this.state.account}    
                      voters={this.state.voters}   
                      ShowLoader={this.ShowLoader}     
                      HideLoader={this.HideLoader} 
                      persons ={this.state.persons}    
                      // email={}      
                    />
              </Route>              
            </Switch>
            </div>
          </div>


        </div>
      </div>

} 
  </div>
  
  </Router>


    );
 
  }
}