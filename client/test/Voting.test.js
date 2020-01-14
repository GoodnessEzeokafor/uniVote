require('chai')
    .use(require('chai-as-promised'))
    .should()


const Voting = artifacts.require('./Voting.sol')

contract('Voting', ([deployer,voter,voter2]) => {
    before(async() => {
        this.contract =  await Voting.deployed()
    })

    describe('Check if the contract deployed successfully', () => {
        it("checks if the contract deploys successfully", async() => {
            const address = this.contract.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
            assert.notEqual(address, '')      
        })

        it("checks the dapp_name", async() => {
            const dapp_name = await this.contract.dapp_name()
            assert.equal(dapp_name, "UniVote") 
            assert.notEqual(dapp_name, '')
        })
        it("checks the dapp_developer", async() => {
            const dapp_developer = await this.contract.dapp_developer()
            assert.equal(dapp_developer, "@GoodnessEzeokafor and @EmmanuelUmeh") 
            assert.notEqual(dapp_developer, '')
        })
        it("checks the election count", async() => {
            const electionCount = await this.contract.electionCount()
            assert.equal(electionCount, 0) 
            assert.notEqual(electionCount, '')
        })
        it("checks the candidate count", async() => {
            const candidateCount = await this.contract.candidateCount()
            assert.equal(candidateCount, 0) 
            assert.notEqual(candidateCount, '')
        })

    })
    
})

