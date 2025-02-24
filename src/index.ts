export interface Env {
	DISCORD_TOKEN: string
	DISCORD_GUILD_ID: string
}


export default {
	async scheduled (
		controller:ScheduledController,
		env:Env,
		ctx:ExecutionContext,
	){
		switch(controller.cron){
		case"0 20 * * tue":
			await startMessage()
			break
		case"45 20 * * tue":
			await summaryMessage()
			break
		case"0 21 * * tue":
			await finishMessage()
			break
		}
		console.log("cron processed")
	},
}


function startMessage() {
	throw new Error("Function not implemented.")
}

function summaryMessage() {
	throw new Error("Function not implemented.")
}

function finishMessage() {
	throw new Error("Function not implemented.")
}
