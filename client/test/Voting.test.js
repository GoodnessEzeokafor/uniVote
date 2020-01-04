require('chai')
    .use(require('chai-as-promised'))
    .should()
const Voting = artifacts.require('./Voting.sol')

contract('Voting', ([deployer,voter,voter2]) => {
    before(async() => {
        this.contract =  await Voting.deployed()
    })
    describe('VOTING CONTRACT: DEPLOYED SUCCESSFULLY', () => {
        it("checks deployment", async() => {

            const address = this.contract.address
            assert.notEqual(address, "")
            assert.notEqual(address, null)
            assert.notEqual(address, 0x0)
            assert.notEqual(address, undefined)
        })
        it("checks dapp_name", async()=>{
            const dapp_name = await this.contract.dapp_name()
            assert.equal(dapp_name, "UniVote")
        })
        it("checks Dapp Developers", async()=>{
            const dapp_devs = await this.contract.dapp_developer()
            assert.equal(dapp_devs, "@GoodnessEzeokafor and @EmmanuelUmeh")
        })
        it("checks  ElectionAuthority", async()=>{
            const electionAuthority = await this.contract.electionAuthority()
            assert.equal(electionAuthority, deployer)
        })
        it("checks ElectionCount", async()=> {
            const electionCount = await this.contract.electionCount()
            assert.equal(electionCount,0)
        })
    })

    describe('VOTING CONTRACT: CREATE ELECTION SUCCESSFULLY', () => {
        it("checks the createElection", async() => {
            const date_start_time = new Date("January 17, 2000 03:24:00")
            const startTime = date_start_time.getTime() // getTimestamp
            const duration = parseInt("40", 10)
            const new_election = await this.contract.createElection(
                "Narcoss President Post",
                "Narcoss President Election Post",
                startTime,
                duration,
                {from:deployer}
            )
    
            // console.log(new_election.logs[0].args)
            const electionCount = await this.contract.electionCount()
            const event = new_election.logs[0].args
            assert.equal(event['id'],1)
            assert.equal(electionCount,1)
            
            assert.equal(event['name_of_election'],"Narcoss President Post")
            assert.equal(event['description_of_election'],"Narcoss President Election Post")
            // assert.equal(event['id'],1)
        })

        it("checks if the createCandidate works well",async() =>{
            const electionId = await this.contract.electionCount()
            const new_candidate = await this.contract.createCandidate(
                electionId,
                "Steve Dozie",
                "Computer Science",
                "400 Level",
                {from:deployer}
            )
            // console.log(new_candidate.logs[0].args)
            const event = new_candidate.logs[0].args
            assert.equal(event['name'],"Steve Dozie")
            assert.equal(event['department'],"Computer Science")
            assert.equal(event['level'],"400 Level")
            assert.equal(event['voteCount'],0)
            const date_start_time = new Date("January 17, 2000 03:24:00")
            const startTime = date_start_time.getTime() // getTimestamp
            const duration = parseInt("40", 10)

            // should fail
            // await this.contract.createElection(
            //     "Narcoss Vice President Post",
            //     "Narcoss Vice President Election Post",
            //     startTime,
            //     duration,
            //     {from:voter})            
        })

        it("checks if the createCandidate works well 2",async() =>{
            const electionId = await this.contract.electionCount()
            const new_candidate = await this.contract.createCandidate(
                electionId,
                "Jane Simeon",
                "Computer Science",
                "400 Level",
                {from:deployer}
            )
            const candidateCount = await this.contract.candidateCount()
            // console.log(new_candidate.logs[0].args)
            const event = new_candidate.logs[0].args
            assert.equal(event['name'],"Jane Simeon")
            assert.equal(event['department'],"Computer Science")
            assert.equal(event['level'],"400 Level")
            assert.equal(event['voteCount'],0)
            assert.equal(event['id'].toString(), candidateCount)
        })


        it("creates multiple elections", async() => {
            const date_start_time = new Date("January 17, 2000 03:24:00")
            const startTime = date_start_time.getTime() // getTimestamp
            const duration = parseInt("40", 10)
            let election
            let result = []
            await this.contract.createElection(
                "Narcoss Vice President Post",
                "Narcoss Vice President Election Post",
                startTime,
                duration,
                {from:deployer})
            await this.contract.createElection(
                "Narcoss Director Of Software Post",
                "Narcoss Director Of Software Post",
                startTime,
                duration,
                {from:deployer})
            
            await this.contract.createElection(
                "Narcoss Director Of Sport Post",
                "Narcoss Director Of Sport Post",
                startTime,
                duration,
                {from:deployer})
            const electionCount = await this.contract.electionCount()
            for(var i = 0; i <= electionCount;i++){
                election = await this.contract.elections(i)
                result.push(election)                
            }
            // console.log(result)

        })
        
        // it("checks if the createCandidate works multiple time", async() => {
        //     const result = []
        //     await this.contract.createCandidate(1, "Patra Chineme","Computer Science","300 Level",{from:deployer})
        //     await this.contract.createCandidate(1, "Goodness Ezeokafor","Computer Science","300 Level",{from:deployer})
        //     await this.contract.createCandidate(1, "Emma Nduka","Computer Science","300 Level",{from:deployer})
        //     const election = await this.contract.elections(1)
        //     console.log(election.candidates)
        // })
    });
    
    describe('RETURNING CANDIDATES', () => {
        it("checks if getElectionCandidates works", async() => {
          const candidates = await this.contract.getElectionCandidates(1)
          console.log("It Works")  
          console.log(candidates)
        })
    });





    describe('Voting', async() => {
        it("Votes successfully", async()=>{

            await this.contract.register_voter(voter2)

            candidateCount = await this.contract.candidateCount()
            
            await this.contract.start_election(1000000, {from : deployer})

            // User is not yet registered so voting fails
            voting = await this.contract.voteCandidate(candidateCount).should.be.rejected


          

            registered  = await this.contract.voters(voter2)
            hasVoted  = await this.contract.hasVoted(voter2)

            // console.log(registered)
            // console.log(hasVoted)

              // User is registered so voting passes
            await this.contract.voteCandidate(1,1, {from : voter2})
            

            candidate = await this.contract.getElectionCandidates(1)

            // console.log(candidate)

            // assert.equal(candidate.voteCount, 1, "Vote Count increased successfully")
            console.log(candidate)
        })

        it("Sets state of voter to true", async()=>{
            // candidateCount = await contract.candidateCount()
            // await contract.voteCandidate(candidateCount)
            addedVoter = await this.contract.hasVoted(voter2)
           

            assert.equal(addedVoter, true, "Voter state was updated to true")
            // assert.equal(addedVoter2, true, "Voter2 state was updated to true")
            

        })

        it("SHould be Rejected", async()=>{
            // Cant vote on a particular election more than once
            // await contract.voteCandidate(candidateCount, {from : third}).should.be.rejected
            // Ensures one cannot vote twice
            // await contract.voteCandidate(candidateCount, {from : another})
            await this.contract.voteCandidate(candidateCount, 1, {from : voter2}).should.be.rejected
            // Rejects the user voting on another candidate after voting initially


            // Ensures users cant vote on invalid candidates or elections
            await this.contract.voteCandidate(0,0).should.be.rejected
            await this.contract.voteCandidate(1,0).should.be.rejected
            await this.contract.voteCandidate(0,1).should.be.rejected


            // Asserts that the event was reverted and the vote count wasnt updated
            // candidate1 = await contract.candidates(1)


            // assert.equal(candidate1.voteCount, 0)

        })
      
    })

    
    
})

