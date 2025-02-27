export interface Env {
	WEBHOOK_URL: string
}

export default {
	async scheduled (controller: ScheduledController, env: Env, ctx: ExecutionContext) {
		switch (controller.cron) {
			case "0 20 * * *":
				await startMessage(env)
				break
			case "45 20 * * *":
				await summaryMessage(env)
				break
			case "0 21 * * *":
				await finishMessage(env)
				break
		}
		console.log("cron processed")
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
	const message = "開始メッセージです"
	await sendDiscordMessage(message, env)
}

async function summaryMessage(env: Env) {
	const message = "中間まとめメッセージです"
	await sendDiscordMessage(message, env)
}

async function finishMessage(env: Env) {
	const message = "終了メッセージです"
	await sendDiscordMessage(message, env)
}
