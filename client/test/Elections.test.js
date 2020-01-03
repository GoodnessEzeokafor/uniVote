const Elections = artifacts.require('./Elections.sol')

require('chai')
    .use(require('chai-as-promised'))
    .should()


contract('Elections', ([deployer,another,third]) => {
    let contract
     
    before(async ()=>{
        contract = await Elections.deployed()
       
    })

    describe('Deployment', async() => {

        it('contract deploys fine', async() => {
        
        const address = contract.address

        assert.notEqual(address, "")
        assert.notEqual(address, null)
        assert.notEqual(address, 0x0)
        assert.notEqual(address, undefined)
        // Ensures we have the right Authority
        contractOwner = await contract.electionAuthority()
        assert.equal(contractOwner, deployer)
        })
        
    })

    describe('Registers a User to Vote', async() => {
        it("Registers a new voter", async()=>{
            await contract.register_voter(another)
            newVoter = await contract.voters(another)

            assert.equal(newVoter,true)
        } )
       
      
    })
    


    describe('Creates a new Candidate', async() => {
        it("successfully creates a new candidate", async()=>{

            // Creates a new Candidate
            anotherCandidate = await contract.createCandidate("Goody", "Computer Science", 300 )
            newCandidate = await contract.createCandidate("Mega", "Computer Science", 300 )

            
            

            // Gets total number of candidates
            candidateCount =  await contract.candidateCount()

            // Gets emitted events
            event  = newCandidate.logs[0].args
            console.log(event)

            id  = event.id

            // Ensure data passed in is correct
            assert.equal(event.name, "Mega")
            assert.equal(event.department, "Computer Science")
            assert.equal(event.level, 300)
            assert.equal(id.toString(), candidateCount.toString())
            assert.equal(event.voteCount, 0)
            
        } )

        it("only contract owner can register a candidate", async()  =>{
            await contract.createCandidate("Goody", "Computer Science", 300, {from : another} ).should.be.rejected

        } )
      
    })


    describe('Voting', async() => {
        it("Votes successfully", async()=>{

            await contract.register_voter(third)

            candidateCount = await contract.candidateCount()
            
            await contract.start_election(1000000, {from : deployer})

            // User is not yet registered so voting fails
            voting = await contract.voteCandidate(candidateCount).should.be.rejected


          

            registered  = await contract.voters(third)
            hasVoted  = await contract.hasVoted(third)

            console.log(registered)
            console.log(hasVoted)

              // User is registered so voting passes
            await contract.voteCandidate(candidateCount, {from : third})
            

            candidate = await contract.candidates(candidateCount)

            console.log(candidate)

            assert.equal(candidate.voteCount, 1, "Vote Count increased successfully")
            console.log(voting)
        })

        it("Sets state of voter to true", async()=>{
            // candidateCount = await contract.candidateCount()
            // await contract.voteCandidate(candidateCount)
            addedVoter = await contract.hasVoted(third)
            // addedVoter2 = await contract.hasVoted(another)

            assert.equal(addedVoter, true, "Voter state was updated to true")
            // assert.equal(addedVoter2, true, "Voter2 state was updated to true")
            

        })

        it("SHould be Rejected", async()=>{
            // Cant vote on a particular election more than once
            await contract.voteCandidate(candidateCount, {from : third}).should.be.rejected
            // Ensures one cannot vote twice
            await contract.voteCandidate(candidateCount, {from : another})
            await contract.voteCandidate(candidateCount, {from : another}).should.be.rejected
            // Rejects the user voting on another candidate after voting initially
            await contract.voteCandidate(0).should.be.rejected


            // Asserts that the event was reverted and the vote count wasnt updated
            // candidate1 = await contract.candidates(1)


            // assert.equal(candidate1.voteCount, 0)

        })
      
    })

    
    
})