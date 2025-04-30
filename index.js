import 'dotenv/config'
import linebot from 'linebot'
import flexText from './commands/flexText.js'
import flexLocation from './commands/flexLocation.js'
import flexTextDay from './commands/flexTextDay.js'

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', event => {
  if (event.message.type === 'text') {
    if (event.message.text.match(/..[市,縣].*[鄉,鎮,市,區]!..月..日/)) {
      flexTextDay(event)
    } else {
      flexText(event)
    }
  } else if (event.message.type === 'location') {
    flexLocation(event)
  }
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('啟動')
})
