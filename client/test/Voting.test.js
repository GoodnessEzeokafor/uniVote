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
        })
    });
    
    
})

