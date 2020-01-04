import React, { Component } from 'react';

export default class Elections extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                <div className="card card-default">
                    <div className="card-header card-header-border-bottom">
                        <h2>Card with Deck </h2>
                    </div>
                    <div className="card-body">
                        <p className="mb-5">Need a set of equal width and height cards that aren’t attached to one another? Use card decks. Read bootstrap documentaion for <a href="https://getbootstrap.com/docs/4.1/components/card/#card-decks" target="_blank"> More Details	</a></p>
                        <div className="card-deck">
                           {this.props.elections.map((election,key) => {
                               return(
                                <div className="card">
                                <img 
                                    className="card-img-top" 
                                    src="/assets/img/elements/cc3a.jpg" alt="Card image cap" />
                                <div className="card-body">
                               <h5 className="card-title text-primary">{election.name_of_election}</h5>
                                    <p className="card-text pb-3">
                                        {election.description_of_election}
                                    </p>
                                    <p className="card-text">
                                        <small className="text-muted">Last updated 3 mins ago</small>
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