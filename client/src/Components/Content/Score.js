import React, { Component } from 'react';

export default class Score extends Component {
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
                        {this.props.candidate_lists.map((candidate,key) => {
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