import React, { Component } from "react";

import SecondCountDown from './SecondCountDown.js'
import '../../../css/countdown.css'

import vote from '../../../vote.png'

export default class Elections extends Component {
  constructor(props) {
    super(props);
  }

  render() {
   

   


  

    return (
      <div>
        <div className="card card-default">
          <div className="card-header card-header-border-bottom">
            <h2>Elections</h2>
          </div>
          <div className="card-body">
            <p className="mb-5">
              List of Recent Elections
              <a  
              
                href="https://getbootstrap.com/docs/4.1/components/card/#card-decks"
                target="_blank"
              >
                {" "}
                More Details{" "}
              </a>
            </p>
            <div className="card-deck">
              {this.props.elections.map((election, key) => {
                return (
                  <div className="card">
                    <img
                     style={{height : '50%', width : "50%" }}
                      className="card-img-top"
                      src={vote}
                      alt="Card image cap"
                    />
                    <div className="card-body">
                      <h5 className="card-title text-primary">
                        {election.name_of_election}
                      </h5>
                      <p className="card-text pb-3">
                        {election.description_of_election}
                      </p>
                      <p className="card-text">
                        <small className="text-muted">
                          Last updated 3 mins ago
                        </small>
                      </p>  

                      {/* CountDown */}

              
                
                      <SecondCountDown targetDate="Jan 10, 2020" targetTime="18:00:00" />
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
