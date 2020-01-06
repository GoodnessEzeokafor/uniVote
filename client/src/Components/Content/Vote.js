import React, { Component } from 'react';

export default class Vote extends Component {
    constructor(props) {
        super(props);
        
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
                       {this.props.candidate_lists.map((candidate,key) => {
                           return(
                            <div className="col-md-6 mb-3" key={key}>
                            <div className="card" >
                          
                            <img 
                                className="card-img-top" 
                                src="" 
                                alt="Card image cap" />
                            <div className="card-body">
                           <h5 className="card-title text-primary">{candidate.name}</h5>
                                <small className="card-text pb-3 font-weight-bold mb-2">
                                    {/* {election.description_of_election} */}
                                   FOR {candidate.post}
                                </small>
                                <p className="card-text">
                                    {/* <small className="text-muted">Last updated 3 mins ago</small> */}
                                    {/* BUTTON 2 */}
                                    
                                    <button 
                                    className="btn btn-success"
                                    id={candidate.id}
                                    data-target="#exampleModal"
                                    style={{marginRight:"20px"}}
                                    
                                    >
                                        Vote Candidates
                                    </button>
                                </p>
                            </div>
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