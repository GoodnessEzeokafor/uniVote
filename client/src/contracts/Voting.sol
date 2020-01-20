pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;


contract Voting{
    string public dapp_name="UniVote";  // name of dapp
    string public dapp_developer="@GoodnessEzeokafor and @EmmanuelUmeh"; // smart contract developer
    uint public electionEndTime; // electionENdTIme
    uint public electionCount; //total number of election
    uint public candidateCount; // totalnumber of candidates

    // Live Score
    uint public liveScoreCandidateCount; // totalnumber of candidates
    mapping(uint => LiveScoreCandidate) public liveScoreCandidates;  //GET ELECTION LIST
    
    uint public registerVoterCount; // totalnumber of candidates
    
    address public electionAuthority;  // election creator
    mapping(uint => Election) public elections;  //GET ELECTION LIST
    // mapping (uint => Candidate) public candidates; // Candidate ID to number of votes
     mapping (address => Voter) public votedStruct; // Elections one has Voted on
    mapping (address => bool) public voters; // Registered voters
    // mapping (address => []) public hasVoted; // If a registered voter has voted or not
    // mapping(uint => Candidate) public candidates;  //GET ELECTION LIST

    bool found;

    // Candidate[] public candidates;
    /* MODIFIERS */
        // Modifiers

    // Ensures only owners can call a function
    modifier only_election_authority() {
        if (msg.sender != electionAuthority) revert();
        _;
    }

    // // Ensures only registered voters can vote
     modifier only_registered_voters() {
        if (!voters[msg.sender]) revert();
        _;
    }

    // // Ensures voters can vote just once!!! Their fada
    // modifier vote_only_once() {
    //     if (hasVoted[msg.sender]) revert();
    //     _;
    // }   

    // // Only Vote during election time and We make cash

      modifier only_during_election_time() {
        if (electionEndTime == 0 || electionEndTime > block.timestamp) revert();
        _;
    }
    constructor() public {
        
        // electionAuthority =  msg.sender;
        
        electionAuthority =  0x6415d68373647F99270E24eB145be4d6E0141Ab2;

    }


    /*  CANDIDATE STRUCT */
    struct Candidate {
        uint id;
        string name;
        string department;
        string level;
        string post;
        uint voteCount;
    }

struct LiveScoreCandidate {
        uint id;
        string name;
        string department;
        string level;
        string post;
        uint voteCount;
    }


    /* END CANDIDATE STRUCT */


    // Voter Struct

    struct Voter{
        uint id;
        uint[] votedElections;
        // mapping (uint => Candidate)  candidates; // Candidate ID to number of votes
        // Candidate[] candidates;
    }


    /*  ELECTION STRUCT */
    struct Election{
        uint id;
        string name_of_election;
        string description_of_election;
        uint duration; // in minutes
        uint startTime; // 
        uint timestamp; 
        // mapping (uint => Candidate)  candidates; // Candidate ID to number of votes
        Candidate[] candidates;
    }
    /* END ELECTION STRUCT */


    event NewElection(
        uint id,
        string name_of_election,
        string description_of_election,
        uint duration,
        uint startTime,
        uint timestamp
        // Candidate candidates // Candidate ID to number of votes
    );

    event NewCandidate(
        string election_name,
        string election_description,
        uint id,
        string name,
        string department,
        string level,
        uint voteCount
    );

    event Voted(
        address voter,
        bool voted,
        uint timestamp
    );




    // methods

    function createElection(
                string memory _name_of_election, 
                string memory  _description_of_election,
                 uint _duration,
                 uint _startTime
                 ) public only_election_authority {
        
        electionCount ++;
        // Candidate memory new_candidate = Candidate(0,"Not A Candidate","Not A Candidate", "Not A Candidate","NOT A CANDIDATE",0);
        elections[electionCount].id = electionCount;
        elections[electionCount].name_of_election = _name_of_election;
        elections[electionCount].description_of_election = _description_of_election;
        elections[electionCount].duration = _duration;
        elections[electionCount].startTime = _startTime;
        elections[electionCount].timestamp = now;
        // elections[electionCount].candidates.push(new_candidate);
        emit NewElection(
            electionCount,
            _name_of_election,
            _description_of_election,
            _duration,
            _startTime,
            now
            // new_candidate        
        );
    }


    function createCandidate(
                        
                            uint _electionId,
                            string memory  _name,
                            string memory _department,
                            string memory  _level,
                            string memory _post
                            ) public only_election_authority{
        Election memory e = elections[_electionId];
        
        candidateCount++;
        // // liveScoreCandidateCount++;
        // uint _id = 0;
        // uint _id = elections[_electionId].candidates.length ++;
        Candidate memory new_candidate = Candidate(elections[_electionId].candidates.length + 1,_name,_department,_level,_post, 0);
        elections[_electionId].candidates.push(new_candidate);
        // liveScoreCandidates[liveScoreCandidateCount] = LiveScoreCandidate(liveScoreCandidateCount,_name,_department,_level,_post, 0);
        // elections[_id].candidates.push(new_candidate);
        // candidates[candidateCount] = new_candidate;
        emit NewCandidate(
                e.name_of_election,
                e.description_of_election,
                candidateCount,
                _name,
                _department,
                _level,
                0);
    }

// Register a voter for when we using the UJ API to register voters
    function register_voter(address addr) public {
        voters[addr] = true;
        registerVoterCount++;
    }

      function start_election(uint duration) public only_election_authority{
        electionEndTime =   block.timestamp + duration; 
    }
  

      function voteCandidate(uint _electionId, uint _candidateId) public only_registered_voters

        // Remember to check why time fails in tests!!
        // only_during_election_time
        // vote_only_once
        {
        // // require that they haven't voted before
        // require(!voters[msg.sender]);

            // Ensures the candidate exists
        require(_candidateId > 0 && _candidateId <= candidateCount);
        // require(_electionId > 0 && _electionId <= electionCount);

        // record that voter has voted

        // require(hasVoted[])
        // hasVoted[msg.sender] = _electionId;

        // update candidate vote Count
        // elections[_electionId].candidates[_candidateId].voteCount ++;
         uint[] memory votersElections = votedStruct[msg.sender].votedElections;

        uint arrayLength = votersElections.length;
        if(arrayLength == 0){
            elections[_electionId].candidates[_candidateId - 1].voteCount ++;
            // liveScoreCandidates[_candidateId].voteCount ++;
            votedStruct[msg.sender].votedElections.push(_electionId);
            emit Voted(msg.sender,true,now);
        }
        else if(arrayLength !=0 ){
        for(uint i=0; i<arrayLength; i++){
            if(votersElections[i]==_electionId){
                found=true;
                // break;
                revert();
            }
            else {

                elections[_electionId].candidates[_candidateId - 1].voteCount ++;
                votedStruct[msg.sender].votedElections.push(_electionId);
                // liveScoreCandidates[_candidateId].voteCount ++;
                emit Voted(msg.sender,true,now);
            }
         
            
        }
        // if(!found){
           
        //     elections[_electionId].candidates[_candidateId - 1].voteCount ++;
        //      votedStruct[msg.sender].votedElections.push(_electionId);
        //     emit Voted(msg.sender,true);
        // }


        }

        
        
        


         
        
        // singleElection.voteCount ++;
        // emit Voted(msg.sender,true);
    }

    function getElectionCandidates(uint _id) public view returns(
                                uint,
                                // // string memory,
                                Candidate[] memory
                                ){
        // return elections[_id].candidates;  
        Election memory e = elections[_id];

        // return elections[_id];
        return(
            e.id,
            // e.description_of_election,
            e.candidates
        );

    }

}



    