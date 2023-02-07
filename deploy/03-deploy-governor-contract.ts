import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import {
    VOTING_DELAY,
    VOTING_PERIOD,
    QUORUM_PERCENTAGE,
    networkConfig,
    developmentChains,
} from "../helper-hardhat-config"
import verify from "../helper-functions"

const deployGovernorContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { getNamedAccounts, deployments, network } = hre
    const { deploy, log, get } = deployments
    const { deployer } = await getNamedAccounts()
    const governanceToken = await get("GovernanceToken")
    const timeLock = await get("TimeLock")
    const args = [
        governanceToken.address,
        timeLock.address,
        VOTING_DELAY,
        VOTING_PERIOD,
        QUORUM_PERCENTAGE,
    ]

    log("Deploying Governor...")

    const governorContract = await deploy("GovernorContract", {
        from: deployer,
        args,
        log: true,
        waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
    })
    log(`GovernorContract at ${governorContract.address}`)
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(governorContract.address, args)
    }
}

export default deployGovernorContract
deployGovernorContract.tags = ["all", "governor"]
