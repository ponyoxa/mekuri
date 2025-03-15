export interface Env {
	WEBHOOK_URL: string
}

export default {
	async scheduled (controller: ScheduledController, env: Env, ctx: ExecutionContext) {
		switch (controller.cron) {
			case "0 11 * * tue":
				await startMessage(env)
				break
			case "45 11 * * tue":
				await summaryMessage(env)
				break
			case "0 12 * * tue":
				await finishMessage(env)
				break
			default:
				await helloMessage(env)
				break
		}
		console.log("cron processed")
	},
	async fetch (request: Request) {
		return new Response("This worker is for scheduled events only", { status: 200 })
	},
}
async function sendDiscordMessage(message: string, env: Env) {
	const url = env.WEBHOOK_URL
	const payload = {
		content: message,
	}
	await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	})
}

async function startMessage(env: Env) {
	const message = "🌟Tuesday Mokumoku Reading Time Start🌟\nEnjoy reading until 20:45..."
	await sendDiscordMessage(message, env)
}

async function summaryMessage(env: Env) {
	const message = "Finish mokumoku reading time!!\nLet's share what you read or learn🐤"
	await sendDiscordMessage(message, env)
}

async function finishMessage(env: Env) {
	const message = "Well done!!\nContinuity is the father of success...\nSee you next Tuesday👋"
	await sendDiscordMessage(message, env)
}

async function helloMessage(env: Env) {
	const message = "Hello, World!\nHello, Joshi.ts!"
	await sendDiscordMessage(message, env)
}
