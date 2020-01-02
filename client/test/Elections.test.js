const Elections = artifacts.require('./Elections.sol')

require('chai')
    .use(require('chai-as-promised'))
    .should()


contract('Elections', ([deployer,another]) => {
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
        })
        
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
      
    })


    describe('Voting', async() => {
        it("Votes successfully", async()=>{

            candidateCount = await contract.candidateCount()

            // 2 votes from different accounts
            voting = await contract.voteCandidate(candidateCount)
            await contract.voteCandidate(candidateCount, {from : another})
            

            candidate = await contract.candidates(candidateCount)

            console.log(candidate)

            assert.equal(candidate.voteCount, 2, "Vote Count increased successfully")
            console.log(voting)
        })

        it("Sets state of voter to true", async()=>{
            candidateCount = await contract.candidateCount()
            // await contract.voteCandidate(candidateCount)
            addedVoter = await contract.voters(deployer)
            addedVoter2 = await contract.voters(another)

            assert.equal(addedVoter, true, "Voter state was updated to true")
            assert.equal(addedVoter2, true, "Voter2 state was updated to true")
            

        })

        it("SHould be Rejected", async()=>{
            // Cant vote on a particular election more than once
            await contract.voteCandidate(candidateCount, {from : another}).should.be.rejected
            await contract.voteCandidate(candidateCount).should.be.rejected
            // Rejects the user voting on another candidate after voting initially
            await contract.voteCandidate(1).should.be.rejected


            // Asserts that the event was reverted and the vote count wasnt updated
            candidate1 = await contract.candidates(1)


            assert.equal(candidate1.voteCount, 0)

        })
      
    })
    


    
    
})