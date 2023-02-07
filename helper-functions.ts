import { run } from "hardhat"
import { TASK_ETHERSCAN_VERIFY } from "hardhat-deploy"

const verify = async (contractAddress: string, args: any[]) => {
    console.log("Verifying conract")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e: any) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified!")
        } else {
            console.log(e)
        }
    }
}

export default verify
