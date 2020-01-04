pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;


contract Voting{
    string public dapp_name="UniVote";  // name of dapp
    string public dapp_developer="@GoodnessEzeokafor and @EmmanuelUmeh"; // smart contract developer
    uint public electionEndTime; // electionENdTIme
    uint public electionCount; //total number of election
    uint public candidateCount; // totalnumber of candidates
    address public electionAuthority;  // election creator
    mapping(uint => Election) public elections;  //GET ELECTION LIST
    // mapping (uint => Candidate) public candidates; // Candidate ID to number of votes
    mapping (address => bool) public voters; // Registered voters
    mapping (address => bool) public hasVoted; // If a registered voter has voted or not
    Candidate[] public candidates;
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
    modifier vote_only_once() {
        if (hasVoted[msg.sender]) revert();
        _;
    }   

    // // Only Vote during election time and We make cash

      modifier only_during_election_time() {
        if (electionEndTime == 0 || electionEndTime > block.timestamp) revert();
        _;
    }
    constructor() public {
        electionAuthority = msg.sender;
    }


    /*  CANDIDATE STRUCT */
    struct Candidate {
        uint id;
        string name;
        string department;
        string level;
        uint voteCount;
    }
    /* END CANDIDATE STRUCT */


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
        uint timestamp,
        Candidate candidates // Candidate ID to number of votes
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
        bool voted
    );




    // methods

    function createElection(
                string memory _name_of_election, 
                string memory  _description_of_election,
                 uint _duration,
                 uint _startTime
                 ) public only_election_authority {
        
        electionCount ++;
        Candidate memory new_candidate = Candidate(0,"Not A Candidate","Not A Candidate", "Not A Candidate",0);
        elections[electionCount].id = electionCount;
        elections[electionCount].name_of_election = _name_of_election;
        elections[electionCount].description_of_election = _description_of_election;
        elections[electionCount].duration = _duration;
        elections[electionCount].startTime = _startTime;
        elections[electionCount].timestamp = now;
        elections[electionCount].candidates.push(new_candidate);
        emit NewElection(
            electionCount,
            _name_of_election,
            _description_of_election,
            _duration,
            _startTime,
            now,
            new_candidate        
        );
    }


    function createCandidate(
                            uint _id,
                            string memory  _name,
                            string memory _department,
                            string memory  _level
                            ) public only_election_authority{
        Election memory e = elections[_id];
        candidateCount++;
        Candidate memory new_candidate = Candidate(candidateCount,_name,_department,_level, 0);
        elections[_id].candidates.push(new_candidate);
        emit NewCandidate(
                e.name_of_election,
                e.description_of_election,
                candidateCount,
                _name,
                _department,
                _level, 0);
    }

// Register a voter for when we using the UJ API to register voters
    function register_voter(address addr) public only_election_authority{
        voters[addr] = true;
    }

      function start_election(uint duration) public only_election_authority{
        electionEndTime =   block.timestamp + duration;
    }
  

      function voteCandidate(uint _electionId, uint _candidateId) public only_registered_voters

        // Remember to check why time fails in tests!!
        // only_during_election_time
        vote_only_once
        {
        // // require that they haven't voted before
        // require(!voters[msg.sender]);

            // Ensures the candidate exists
        require(_candidateId > 0 && _candidateId <= candidateCount);

        // record that voter has voted
        hasVoted[msg.sender] = true;

        // update candidate vote Count
        elections[_electionId].candidates[_candidateId].voteCount ++;

        emit Voted(msg.sender,true);
    }

    function getElectionCandidates(uint _id) public view returns(Candidate[] memory){
        return elections[_id].candidates;
    }

}



    