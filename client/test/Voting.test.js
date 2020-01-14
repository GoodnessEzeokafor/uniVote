require('chai')
    .use(require('chai-as-promised'))
    .should()


const Voting = artifacts.require('./Voting.sol')

contract('Voting', ([deployer,voter1,voter2,voter3,voter4, voter5 ]) => {
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
    })

    describe('VOTING CONTRACT: CREATE ELECTION SUCCESSFULLY', () => {
        it("checks the createElection", async() => {
            const date_start_time = new Date("January 17, 2020 03:24:00")
           


            const startTime = date_start_time.getTime() // getTimestamp
            const duration = parseInt("40", 10)
            const new_election = await this.contract.createElection(
                "Narcoss President Post",
                "Narcoss President Election Post",
                startTime,
                duration,
                {from:deployer}
            )

            const new_election2 = await this.contract.createElection(
                "SUG  Post",
                "SUG President Election Post",
                startTime,
                duration,
                {from:deployer}
            )
            const new_election3 = await this.contract.createElection(
                "DOS ",
                "DOS President Election Post",
                startTime,
                duration,
                {from:deployer}
            )
    
            // console.log(new_election.logs[0].args)
            const electionCount = await this.contract.electionCount()

            const election = await this.contract.elections(electionCount)

            // console.log(election)
            const event = new_election.logs[0].args

            
            // Check if election count increased
            // assert.equal(electionCount, 3)
            // assert.equal(event['id'],1)
            // assert.equal(electionCount,1)
            
            // assert.equal(event['name_of_election'],"Narcoss President Post")
            // assert.equal(event['description_of_election'],"Narcoss President Election Post")
            // assert.equal(event['id'],1)
        })

        it("checks if the createCandidate works well",async() =>{
            // const electionId = await this.contract.electionCount()


            // First election
            const new_candidate = await this.contract.createCandidate(
                1,
                "Steve Dozie",
                "Computer Science",
                "400 Level",
                "Naccoss President",
                {from:deployer}
            )

            const new_candidate2 = await this.contract.createCandidate(
                1,
                "Emma Dozie",
                "Computer Science",
                "400 Level",
                "Naccoss President",
                {from:deployer}
            )

            const new_candidate3 = await this.contract.createCandidate(
                1,
                "Goody Dozie",
                "Computer Science",
                "400 Level",
                "Naccoss President",
                {from:deployer}
            )


            // Second election

            const second_New_candidate1 = await this.contract.createCandidate(
                2,
                "Goody Eze",
                "cs Science",
                "400 Level",
                "Naccoss President",
                {from:deployer}
            )
            const second_New_candidate2 = await this.contract.createCandidate(
                2,
                "Emma Ndu",
                "Geo Science",
                "400 Level",
                "Naccoss President",
                {from:deployer}
            )
            const second_New_candidate3 = await this.contract.createCandidate(
                2,
                "Godfrey Dozie",
                "Plant Science",
                "400 Level",
                "Naccoss President",
                {from:deployer}
            )


            // Third election candidates
            const third_New_candidate1 = await this.contract.createCandidate(
                3,
                "Aza Dozie",
                "Plant Science",
                "300 Level",
                "Naccoss President",
                {from:deployer}
            )

            const third_New_candidate2 = await this.contract.createCandidate(
                3,
                "Deena Dozie",
                "Plant Science",
                "100 Level",
                "Naccoss President",
                {from:deployer}
            )

            const third_New_candidate3 = await this.contract.createCandidate(
                3,
                "Debby Dozie",
                "Plant Science",
                "4200 Level",
                "Naccoss President",
                {from:deployer}
            )


            // console.log(new_candidate)
            // console.log(new_candidate.logs)
            // const eventCandidate = new_candidate.logs[0].args
            // assert.equal(eventCandidate['name'],"Steve Dozie")
            // assert.equal(eventCandidate['department'],"Computer Science")
            // assert.equal(eventCandidate['level'],"400 Level")
            // assert.equal(eventCandidate['voteCount'],0)
            // assert.equal(eventCandidate['post'],"Naccoss President")
            const date_start_time = new Date("January 17, 2000 03:24:00")
            const startTime = date_start_time.getTime() // getTimestamp
            const duration = parseInt("40", 10)

            // should fail
        //     await this.contract.createElection(
        //         "Narcoss Vice President Post",
        //         "Narcoss Vice President Election Post",
        //         startTime,
        //         duration,
        //         {from:deployer})  
                
            
        })
        it("Gets array of candidates", async()=>{
            electionCandidate = await this.contract.getElectionCandidates(3)

            // console.log(electionCandidate)
        })

            
        // it("Returns the candidate created", async() => {

        //     const electionId = await this.contract.electionCount()
        //     const duration = parseInt("40", 10)
        //     const date_start_time = new Date("January 17, 2000 03:24:00")
        //     const startTime = date_start_time.getTime() // getTimestamp
            

        //     await this.contract.createElection(
        //         "Narcoss Vice President Post",
        //         "Narcoss Vice President Election Post",
        //         startTime,
        //         duration,
        //         {from:deployer})  

        //         const new_candidate = await this.contract.createCandidate(
        //             electionId,
        //             "Steve Dozie",
        //             "Computer Science",
        //             "400 Level",
        //             "Naccoss President",
        //             {from:deployer}
        //         )
                

                
        //     CandidateForElection  = await this.contract.getElectionCandidates(0)
        //     // console.log(CandidateForElection)
        // })

        //     it("checks if the createCandidate works well 2",async() =>{
    //         const electionId = await this.contract.electionCount()
    //         const new_candidate = await this.contract.createCandidate(
    //             electionId,
    //             "Jane Simeon",
    //             "Computer Science",
    //             "400 Level",
    //             "Sport President",
    //             {from:deployer}
    //         )
    //         const candidateCount = await this.contract.candidateCount()
    //         // console.log(new_candidate.logs[0].args)
    //         const event = new_candidate.logs[0].args
    //         assert.equal(event['name'],"Jane Simeon")
    //         assert.equal(event['department'],"Computer Science")
    //         assert.equal(event['level'],"400 Level")
    //         assert.equal(event['voteCount'],0)
    //         assert.equal(event['id'].toString(), candidateCount)
    //     })

    //     // Check if candidate was added to listing
    //     it("Checks if the candidate was added to listing",async() =>{
    //         const electionId = await this.contract.electionCount()
    //         // const new_candidate = await this.contract.createCandidate(
    //         //     electionId,
    //         //     "Jane Simeon",
    //         //     "Computer Science",
    //         //     "400 Level",
    //         //     "Sport President",
    //         //     {from:deployer}
    //         // )
    //         const candidateCount = await this.contract.candidateCount()
    //         const candidates = await this.contract.candidates(candidateCount)
    //         console.log(candidates)
    //         // console.log(new_candidate.logs[0].args)
    //         // const event = candidates.logs[0].args
    //         assert.equal(candidates.name,"Jane Simeon")
    //         assert.equal(candidates.department,"Computer Science")
    //         assert.equal(candidates.level,"400 Level")
    //         assert.equal(candidates.voteCount,0)
    //         assert.equal((candidates.id).toString(), candidateCount)
    //     })


    //     it("creates multiple elections", async() => {
    //         const date_start_time = new Date("January 17, 2000 03:24:00")
    //         const startTime = date_start_time.getTime() // getTimestamp
    //         const duration = parseInt("40", 10)
    //         let election
    //         let result = []
    //         await this.contract.createElection(
    //             "Narcoss Vice President Post",
    //             "Narcoss Vice President Election Post",
    //             startTime,
    //             duration,
    //             {from:deployer})
    //         await this.contract.createElection(
    //             "Narcoss Director Of Software Post",
    //             "Narcoss Director Of Software Post",
    //             startTime,
    //             duration,
    //             {from:deployer})
            
    //         await this.contract.createElection(
    //             "Narcoss Director Of Sport Post",
    //             "Narcoss Director Of Sport Post",
    //             startTime,
    //             duration,
    //             {from:deployer})
    //         const electionCount = await this.contract.electionCount()
    //         for(var i = 0; i <= electionCount;i++){
    //             election = await this.contract.elections(i)
    //             result.push(election)                
    //         }
    //         // console.log(result)

    //         it("checks if the createCandidate works well 2",async() =>{
    //             // const electionId = await this.contract.electionCount()
    //             const new_candidate = await this.contract.createCandidate(
    //                 2,
    //                 "Blessing Doe",
    //                 "Computer Science",
    //                 "400 Level",
    //                 {from:deployer}
    //             )
    //             const candidateCount = await this.contract.candidateCount()
    //             // console.log(new_candidate.logs[0].args)
    //             const event = new_candidate.logs[0].args
    //             // assert.equal(event['name'],"Jane Simeon")
    //             // assert.equal(event['department'],"Computer Science")
    //             // assert.equal(event['level'],"400 Level")
    //             // assert.equal(event['voteCount'],0)
    //             // assert.equal(event['id'].toString(), 2)
    //         })
    //     })
        
    //     // it("checks if the createCandidate works multiple time", async() => {
    //     //     const result = []
    //     //     await this.contract.createCandidate(1, "Patra Chineme","Computer Science","300 Level",{from:deployer})
    //     //     await this.contract.createCandidate(1, "Goodness Ezeokafor","Computer Science","300 Level",{from:deployer})
    //     //     await this.contract.createCandidate(1, "Emma Nduka","Computer Science","300 Level",{from:deployer})
    //     //     const election = await this.contract.elections(1)
    //     //     console.log(election.candidates)
    //     // })
    // });
    
    // describe('RETURNING CANDIDATES', () => {
    //     it("checks if getElectionCandidates works", async() => {
    //       const candidates = await this.contract.getElectionCandidates(2)
    //       console.log("It Works")  
    //       console.log(candidates)
    //     })
    // });





   
        it("Votes successfully", async()=>{

            await this.contract.register_voter(voter2)
            await this.contract.register_voter(voter1)
            await this.contract.register_voter(voter3)
            await this.contract.register_voter(voter4)

            // candidateCount = await this.contract.getElectionCandidates(1)

            

            await this.contract.voteCandidate(1,1, {from : voter1})
            await this.contract.voteCandidate(1,1, {from : voter1}).should.be.rejected
            await this.contract.voteCandidate(1,1, {from : voter2})

            await this.contract.voteCandidate(1,2, {from : voter3})
            await this.contract.voteCandidate(1,3, {from : voter4})
            await this.contract.voteCandidate(1,3, {from : voter4}).should.be.rejected

            // candidateScores = await this.contract.getElectionCandidates(1)



            // console.log(candidateScores)

            // console.log(candidateScores[1])

            // firstCandidateVoteCount = candidateScores[0].voteCount
            // secondCandidateVoteCount = candidateScores[1].voteCount
            // thirdCandidateVoteCount = candidateScores[2].voteCount

            // // console.log(secondCandidateVoteCount)
            // // console.log(thirdCandidateVoteCount)


            
            // assert.equal(2, firstCandidateVoteCount)
            // assert.equal(1, secondCandidateVoteCount)
            // assert.equal(1, thirdCandidateVoteCount)


            // Should be rejected
            // await this.contract.voteCandidate(1,1, {from : voter1}).should.be.rejected
            // await this.contract.voteCandidate(1,1, {from : voter2}).should.be.rejected

            // await this.contract.voteCandidate(1,2, {from : voter3}).should.be.rejected
            // await this.contract.voteCandidate(1,3, {from : voter4}).should.be.rejected


            // // For second election @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

            await this.contract.voteCandidate(2,1, {from : voter1})
            await this.contract.voteCandidate(2,1, {from : voter1}).should.be.rejected

            // User is not yet registered
            await this.contract.voteCandidate(2,1, {from : voter5}).should.be.rejected

            // await this.contract.voteCandidate(2,2, {from : voter3})
            // await this.contract.voteCandidate(2,3, {from : voter4})

            // candidateScores2 = await this.contract.getElectionCandidates(2)


           
            // await this.contract.start_election(1000000, {from : deployer})

            // User is not yet registered so voting fails
            // voting = await this.contract.voteCandidate(candidateCount).should.be.rejected


          

        //     registered  = await this.contract.voters(voter2)
        //     hasVoted  = await this.contract.hasVoted(voter2)

        //     // console.log(registered)
        //     // console.log(hasVoted)

        //       // User is registered so voting passes
        //     await this.contract.voteCandidate(1,1, {from : voter2})
            

        //     candidate = await this.contract.getElectionCandidates(1)

        //     // console.log(candidate)

        //     // assert.equal(candidate.voteCount, 1, "Vote Count increased successfully")
        //     // console.log(candidate)
        // })

        // it("Sets state of voter to true", async()=>{
        //     // candidateCount = await contract.candidateCount()
        //     // await contract.voteCandidate(candidateCount)
        //     addedVoter = await this.contract.hasVoted(voter2)
           

        //     assert.equal(addedVoter, true, "Voter state was updated to true")
        //     // assert.equal(addedVoter2, true, "Voter2 state was updated to true")
            

        // })

        // it("SHould be Rejected", async()=>{
        //     // Cant vote on a particular election more than once
        //     // await contract.voteCandidate(candidateCount, {from : third}).should.be.rejected
        //     // Ensures one cannot vote twice
        //     // await contract.voteCandidate(candidateCount, {from : another})
        //     await this.contract.voteCandidate(candidateCount, 1, {from : voter2}).should.be.rejected
        //     // Rejects the user voting on another candidate after voting initially


        //     // Ensures users cant vote on invalid candidates or elections
        //     await this.contract.voteCandidate(0,0).should.be.rejected
        //     await this.contract.voteCandidate(1,0).should.be.rejected
        //     await this.contract.voteCandidate(0,1).should.be.rejected


        //     // Asserts that the event was reverted and the vote count wasnt updated
        //     // candidate1 = await contract.candidates(1)


        //     // assert.equal(candidate1.voteCount, 0)

        })
      
   

    
    


        
    })})
  
