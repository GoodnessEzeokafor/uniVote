import React, { Component } from 'react';
import FormModal from "./Modal/FormModal";
import ViewCandidatesModal from "./Modal/ViewCandidatesModal"

import "./modal.css"
// import VoteImg from "./"

export default class Elections extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // single_project: "",
            // // addModalShow: false,
            show: false,
            show2: false,
            loader: false,
            getcandidates:""
          };
    }
    showModal = () => {
        this.setState({show : true})
      }

      hideModal = () => {
        this.setState({ show: false });
      }
      showModal2 = () => {
        this.setState({show2 : true})
      }
      hideModal2 = () => {
        this.setState({ show2: false });
      }
      async getCandidates(id) {
        const getCandidate = await this.props.ElectionDapp.methods
          .getElectionCandidates(id)
          .call();
        console.log("Writing To The Blockchain");
        console.log(getCandidate);
        return getCandidate;
      }
      
    render() {
        return (
            <div>
                <div className="card card-default">
                    <div className="card-header card-header-border-bottom">
                        {/* <h2>Card with Deck </h2>
                         */}
                    </div>
                    <div className="card-body">
                        {/* <p className="mb-5">Need a set of equal width and height cards that aren’t attached to one another? Use card decks. Read bootstrap documentaion for <a href="https://getbootstrap.com/docs/4.1/components/card/#card-decks" target="_blank"> More Details	</a></p> */}
                        <div className="card-deck">
                           {this.props.elections.map((election,key) => {
                               return(
                                <div className="card" key={key}>
                                <FormModal
                                show={this.state.show}
                                handleClose={this.hideModal}
                                id={parseInt(election.id,10)}
                                // single_project={this.state.single_project}
                                ElectionDapp = {this.props.ElectionDapp}
                                account={this.props.account}
                            />
                            <ViewCandidatesModal 
                                 show={this.state.show2}
                                 handleClose={this.hideModal2}
                                 id={parseInt(election.id,10)}
                                 // single_project={this.state.single_project}
                                 ElectionDapp = {this.props.ElectionDapp}
                                 account={this.props.account}
                                 getCandidates ={this.state.getcandidates}
                            />
                                <img 
                                    className="card-img-top" 
                                    src="/assets/img/elements/cc3a.jpg" alt="Card image cap" />
                                <div className="card-body">
                               <h5 className="card-title text-primary">{election.name_of_election}</h5>
                                    <p className="card-text pb-3">
                                        {election.description_of_election}
                                    </p>
                                    <p className="card-text">
                                        {/* <small className="text-muted">Last updated 3 mins ago</small> */}
                                        {/* BUTTON 2 */}
                                        <button
                                        className="btn btn-primary"
                                        id={election.id}
                                        data-target="#exampleModal"
                                        style={{marginRight:"20px"}}
                                        //  to={`/project/${project.id}`}
                                        onClick={async(event) => {
                                            this.showModal();
                                        //     const id = parseInt(event.target.id, 10);
                                        //     // console.log(id, typeof id);
                                        //     const single_project = await this.getSingleProject(id);
                                        // console.log("Content:",single_project["name"])
                                        //     this.setState({ single_project });
                                            event.persist();
                                        }
                                            // console.log("Hello WOrld")
                                            // window.alert("Hello")
                                            
                                            // {this.showModal()}
                                        }
                                        > Add Candidate
                                        </button>
                                        <button 
                                        className="btn btn-success"
                                        id={election.id}
                                        data-target="#exampleModal"
                                        style={{marginRight:"20px"}}
                                        //  to={`/project/${project.id}`}
                                        onClick={async(event) => {
                                            this.showModal2();
                                            const id = parseInt(event.target.id, 10);
                                            console.log(id, typeof id);
                                            console.log(id)
                                            const getcandidates = await this.getCandidates(id);
                                        console.log("Content:",getcandidates["0"])
                                            this.setState({ getcandidates });
                                            event.persist();
                                        }}
                                        >
                                            View Candidates
                                        </button>
                                    </p>
                                </div>
                            </div>
                               );
                           })} 

                            
                        </div>
                    </div>
                </div>
    </div>
    );
    }
}

{/* <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}
