import React, { Component } from 'react';
// import "../Modal.css"

export default class ViewCandidatesModal extends Component {
    //  async componentDidMount(){
    //    await  this.renderTables()

    // }
    // async loadBlochainData(){
    //       for(var i=0; i <= this.props.candidateCount; i++){
    //         const candidate =  this.props.getCandidates[i]
    //         this.setState({
    //           candidate_lists:[...this.state.candidate_lists, candidate]
    //         })
    //       }

    // }
 
    renderTables(){
        const temp = ``
        const result =[]
        // console.log("CandidatesProps:",this.props.getCandidates)
        // for(var i=0; i <= this.props.candidateCount; i++){
        //         // result.push(this.props.getCandidates[i])
        //         const candidate = this.props.getCandidates[i]
        //         this.setState({
        //                 // candidate_lists:[...this.state.candidate_lists, this.props.getCandidates[i]]
        //                 candidate_lists:candidate
        //               })
        //         // console.log(candidate)
        //         // console.log(candidate[1].name)
                
        //         // temp = `
        //         // <tr>
        //         //         <th scope="col">${candidate['0']}</th>
        //         //         <th scope="col">${candidate['1']}</th>
        //         //         <th scope="col">${candidate['2']}</th>
        //         //         <th scope="col">${candidate['3']}</th>
        //         //         <th scope="col">VOTE</th>
        //         //         </tr>
        //         // `
        //     }
            // console.log(result[0])
            // let total = result[0]
            // console.log(total.name)
            // return temp
            // console.log(this.state.candidate_lists)
            return{
                result: this.props.getCandidates
            }
    }
    constructor(props) {
        super(props);
        this.state = {
            candidateCount:this.props.candidateCount,
            candidate_lists:[],
            Election:this.props.ElectionDapp,
            message_state:false,
            message:''
 
        }
        // this.getCandidates = this.getCandidates(this)
    }


    // async getCandidates(id){
    //     const result = await this.props.ElectionDapp.methods.getElectionCandidates(id).call();
    //     return result;
    // }
    render() {
        const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
        // const candidates = this.getCandidates()
        // console.log(this.getCandidates())
        // this.renderTables()
        // console.log("Candidates:",this.state.candidate_lists)
        // (console.log(this.renderTables()))
        const results = this.renderTables()
        const results_arr = results.result
        // console.log("Results",results.result)
        return (
            <div
            className={showHideClassName} 
              // class="modal fade" 
              tabIndex="-1" role="dialog">
                  <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                {!this.state.message_state ? 
                    <span></span>                    
                    :
                <div className="col-lg-12">
                    <div class="alert alert-info alert-highlighted" role="alert">
                    <h5 className="modal-title text-center">
                        {this.state.message}
                    </h5>
                    </div>
                    </div>
                }
            <small></small>
                  <button onClick={this.props.handleClose} type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                </div>  
                <div className="modal-body">
                <div class="table-responsive">
                <table class="table">
                <thead class="thead-dark">
                     <tr>
                         <th>#</th>
                         <th>FULL NAME</th>
                         <th>DEPARTMENT</th>
                         <th>LEVEL</th>
                         <th>Vote</th>
                         <th>VoteCount</th>


                    </tr>
                </thead>
                    <tbody>
                    {/* {this.renderTables()} */}
                    {!results_arr ?
                        <tr></tr> 
                    :
                       <tr></tr> 
                    }
                    {results_arr ?

                results_arr.map((result, key) => {
                    return(
                    <tr>

                    <th scope="col">
                        {/* ${result['3']} */}
                        </th>
                    <th scope="col">
                        {/* ${result['0']} */}
                        {result.name}
                    </th>
                    <th scope="col">
                        {/* ${result['1']} */}
                        {result.department}
                    </th>
                    <th scope="col">
                        {/* ${result['2']} */}
                        {result.level}
                    </th>
                    <th scope="col">
                        <button className="btn btn-dark"
                        onClick={async(event) => {
                            // const id = parseInt(parseInt(result.id,10), parseInt(this.props.id, 10)
                            const candidate_id = parseInt(result.id,10)
                            const election_id = parseInt(this.props.id,10)
                            console.log("Election ID",candidate_id, typeof candidate_id)
                            console.log("Canidate ID:",election_id,typeof election_id)
                            // console.log(typeof id)
                            this.props.ElectionDapp.methods.voteCandidate(candidate_id,election_id)                                                                             
                            .send({from:this.props.account})
                            .once('receipt', (receipt) => {
                                console.log(receipt);
                                // this.setState({loading:false})
                                this.setState({message_state:true})
                                this.setState({message:"THANKS FOR VOTING ON OUR PLATFORM"})
                                
                            })
                            event.preventDefault()
                        }}
                        >
                            Vote
                        </button>
                    </th>
                <th>{result.voteCount}</th>
                    </tr>  
                    )
                })
                    :<span></span>}
                    </tbody>
                </table>
                </div>
                </div>
                <div className="modal-footer">             
                  <button 
                    onClick={this.props.handleClose} 
                    data-dismiss="modal" 
                    type="button" 
                    className="btn btn-primary">Close</button>
                </div>
              </div>
            </div> 
            </div>
        );
    }
}