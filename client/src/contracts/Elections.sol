pragma solidity 0.5.0;

contract Elections {

    address public electionAuthority;
    uint electionEndTime;

    // Maps candidates to an int
    //  string[] candidates; // Registered candidates


    mapping (uint => Candidate) candidates; // Candidate ID to number of votes
    // mapping (string => uint) public votes; // Candidate ID to number of votes
    mapping (address => bool) public voters; // Registered voters
    mapping (address => bool) public hasVoted; // If a registered voter has voted or not




    uint public candidateCount;
    // constructor
    constructor() public {
        electionAuthority = msg.sender;
    }

    // Modifiers

    // Ensures only owners can call a function
    modifier only_election_authority() {
        if (msg.sender != electionAuthority) revert();
        _;
    }

    // Ensures only registered voters can vote
     modifier only_registered_voters() {
        if (!voters[msg.sender]) revert();
        _;
    }

    // Ensures voters can vote just once!!! Their fada
    modifier vote_only_once() {
        if (hasVoted[msg.sender]) revert();
        _;
    }   

    // Only Vote during election time and We make cash

      modifier only_during_election_time() {
        if (electionEndTime == 0 || electionEndTime > block.timestamp) revert();
        _;
    }


    struct Candidate {
        uint id;
        string name;
        string department;
        uint level;
        uint voteCount;

    }

    event NewCandidate(
        uint id,
        string name,
        string department,
        uint level,
        uint voteCount
    );

    event Voted(
        address voter,
        bool voted
    );

    // Register a voter for when we using the UJ API to register voters
    function register_voter(address addr) public
        only_election_authority
    {
        voters[addr] = true;
    }
    

    // function to create a candidate which will be restricted to the deployer only in the future

    function createCandidate(string memory _name, string memory  _department, uint _level) public only_election_authority {
        candidateCount ++;

        candidates[candidateCount] = Candidate(candidateCount,_name,_department,_level, 0);
        emit NewCandidate(candidateCount,_name,_department,_level, 0);
    }


    // Function to enable users vote

    function voteCandidate(uint _candidateId) public 
    
        only_registered_voters
        only_during_election_time
        vote_only_once
        {
     


        // // require that they haven't voted before
        // require(!voters[msg.sender]);

            // Ensures the candidate exists
        require(_candidateId > 0 && _candidateId <= candidateCount);

        // record that voter has voted
        hasVoted[msg.sender] = true;

        // update candidate vote Count
        candidates[_candidateId].voteCount ++;

        emit Voted(msg.sender,true);


    }

     

     function start_election(uint duration) public
        only_election_authority
    {
        electionEndTime = block.timestamp + duration;
    }
  
}
