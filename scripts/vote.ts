import * as fs from "fs"
import { developmentChains, proposalsFile, VOTING_PERIOD } from "../helper-hardhat-config"
import { network, ethers } from "hardhat"
import { moveBlocks } from "../utils/move-blocks"

const index = 0

async function vote() {
    const proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf8"))
    // get the last proposal (need to alter code if need a specific proposal)
    const proposalId = proposals[network.config.chainId!].at(-1)
    // 0 = Against, 1 = For, 2 = Abstain
    const voteWay = 1
    const reason = "I like voting for things and I like the number 7."
    await submitVote(proposalId, voteWay, reason)
}

async function submitVote(proposalId: string, voteWay: number, reason: string) {
    console.log("Submitting vote...")
    const governor = await ethers.getContract("GovernorContract")
    const voteTx = await governor.castVoteWithReason(proposalId, voteWay, reason)
    const voteTxReceipt = await voteTx.wait(1)
    console.log(voteTxReceipt.events[0].args.reason)
    const proposalState = await governor.state(proposalId)
    console.log(`Current proposal state: ${proposalState}`)
    if (developmentChains.includes(network.name)) {
        await moveBlocks(VOTING_PERIOD + 1)
    }
    console.log("Vote submitted. Ready to proceed.")
}

vote()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
