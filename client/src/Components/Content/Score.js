import React, { Component } from 'react';
    // import Web3 from "web3";
    // import Fortmatic from "fortmatic";
    // import ElectionAbi from "../../abis/Voting.json";


export default class Score extends Component {

//    async componentDidMount(){
//         await this.loadBlockchainData();
//     }
    //    async getCandidates(id) {
    //     const getCandidate = await this.state.ElectionDapp.methods
    //       .getElectionCandidates(id)
    //       .call();
    //     console.log("Writing To The Blockchain");
    //     console.log(getCandidate);
    //     this.setState({
    //         candidate_lists:getCandidate
    //     })
    //     return getCandidate;
    //   }
      
    // renderTables(id){
    //     const result = ''
    //     // const temp = ``
    //         // return{
    //         //     result: this.props.getCandidates
    //         // }
    // }
    
      constructor(props) {
        super(props);
        // this.state = {
        //     // candidate_lists:this.loadBlockchainData,
        //     // candidateCount:0,
        //     // electionCount:0,
        //     // ElectionDapp:null,
        //     // elections:[],
        //     // election_id:0
        // }
        // // this.loadBlockchainData = this.loadBlockchainData.bind(this)
        // console.log("Data:",this.loadBlockchainData())
        // const data = this.loadBlockchainData()
        // this.loadBlockchainData().map((candidate, key) => {
        //     console.log("CANDIDATE:",candidate)
        // })
        // this.setState({
        //     candidate_lists:this.loadBlockchainData()
        // })
    }

//  loadBlockchainData(){
//           // Load ELECTIONS
//         //   for(var j=1; j <= this.props.candidateCount; j++){
//         //     const candidate = await this.props.ElectionDapp.methods
//         //     .getElectionCandidates(j)
//         //     .call()            
//         //     this.setState({
//         //         // candidate_lists:[...this.state.candidate_lists, candidate],  
//         //         candidate_lists:candidate
//         //     })
//         //   }
//         var candidates=[];
//         this.props.elections.map(async (election, key)=> {
//             // // console.log(election.id)
//             // const candidate = await this.props.ElectionDapp.methods
//             //     .getElectionCandidates(election.id)
//             //     .call()  
//                 // for(var j=1; j <= this.props.candidateCount; j++){
//                     const candidate = await this.props.ElectionDapp.methods
//                     .getElectionCandidates(election.id)
//                     .call()  
//                     // this.setState({
//                     //     candidate_lists:candidate
//                     // })                     
//                 // }
//                 // candidates = candidate
//                 candidates.push(candidate)

//         })
//         this.setState({
//             candidate_lists:candidates
//         })
//         return {
//             result:candidates
//         } 
//     }

    // async getCandidates(id) {
    //     const getCandidate = await this.props.ElectionDapp.methods
    //       .getElectionCandidates(id)
    //       .call();
    //     console.log("Writing To The Blockchain");
    //     // console.log(getCandidate);
    //     // for(var j=1; j <= this.props.candidateCount; j++){
    //     //     const election = await ElectionDapp.methods.elections(j).call()
    //     //     this.setState({
    //     //       elections:[...this.state.elections, election],
              
    //     //     })
    //     //   }
    //     // this.setState({
    //     //     candidate_lists:[...this.state.candidate_lists, getCandidate],
    //     //   })
    //     return getCandidate
    //   }
      
    // loadBlockchainData()
    // this.loadBlockchainData()

    render() {
        // console.log(this.state.candidate_lists)
        // if(this.state.election_id === 0){
        //     console.log("Still Loading")
        // } else{
        //     this.getCandidates(this.state.election_id)

        // // }           
        //         if(this.state.election_id){

        //             const candidates =  this.getCandidates(this.state.election_id)
        //         } else{
        //             console.log(null);
        //         }
                //   console.log({candidates:this.state.candidate_lists})
        return (
            <div>
                <h3 className="text-center mb-2">LIVE SCORE</h3>
                    {/* // console.log(election.name_of_election)
                    // // console.log("This is the election", election)
                    // const getCandidate = ''
                    // const candidates =  this.getCandidates(election.id)
                    // console
                            // .then((res) => 
                            //         // this.setState({
                            //         // candidate_lists:res,
                            //         //     })
                            // res
                            
                    // console.log("CANDIDATES:",getCandidate)
                    // console.log("Candidate List:",candidates)
                    return(
 */}
                        <table className="table">
                        <thead className="thead-dark">
                    <h3 className="mb-3">CANDIDATES</h3>
                                <tr>
                                {/* <th scope="col">#</th> */}
                                <th scope="col">FULL NAME</th>
                                <th scope="col">DEPARTMENT</th>
                                <th scope="col">LEVEL</th>
                                <th scope="col">POST</th>
                                <th scope="col">SCORE</th>
                                </tr>
                        </thead>
                            <tbody>
                                {this.props.liveScoreCandidates 
                                    ? this.props.liveScoreCandidates.map((candidate, key) => {
                                    return(

                                        <tr key={key}>
                                        <td>{candidate.name}</td>                                        
                                        <td>{candidate.department}</td>
                                        <td>{candidate.level}</td>
                                        <td>{candidate.post}</td>
                                        <td>{candidate.score}</td>
                                        <td>{candidate.voteCount}</td>
                                    </tr>
                                    )
                                }) :<span></span> }
                            </tbody> 
                            
                        </table>


            </div>
        );
    }
}