pragma solidity 0.5.0;

contract Elections {

    // Maps candidates to an int
    mapping(uint=>Candidate) public candidates;

    mapping(address=>bool) public voters;




    uint public candidateCount;
    // constructor
    constructor() public {

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

    // function to create a candidate which will be restricted to the deployer only in the future

    function createCandidate(string memory _name, string memory  _department, uint _level) public {
        candidateCount ++;

        candidates[candidateCount] = Candidate(candidateCount,_name,_department,_level, 0);
        emit NewCandidate(candidateCount,_name,_department,_level, 0);
    }

    // Function to enable users vote

    function voteCandidate(uint _candidateId) public {

        // require that they haven't voted before
        require(!voters[msg.sender]);

            // Ensures the candidate exists
        require(_candidateId > 0 && _candidateId <= candidateCount);

        // record that voter has voted
        voters[msg.sender] = true;

        // update candidate vote Count
        candidates[_candidateId].voteCount ++;

        emit Voted(msg.sender,true);


    }
}