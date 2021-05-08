require('dotenv').config()

const { start: startApi, shutdown: shutdownApi } = require('./api')

async function main() {
  try {
    await startApi()
  } catch (error) {
    console.log(error)
    await shutdown()
  }
}

async function shutdown() {
  await shutdownApi()
  process.exit(0)
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)

process.on('unhandledRejection', (reason, promise) => {
  console.log(`Unhandled Rejection at: promise ${promise}, reason: ${reason}`)
  console.trace()
  return shutdown()
})

main().catch(shutdown)
