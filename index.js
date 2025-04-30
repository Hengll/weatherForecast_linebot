import 'dotenv/config'
import linebot from 'linebot'
import flexText from './commands/flexText.js'
import flexLocation from './commands/flexLocation.js'
import flexTextDay from './commands/flexTextDay.js'
import axios from 'axios'

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
  testApi()
  console.log('啟動')
})

const testApi = async () => {
  try {
    await axios.get('https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-003?Authorization=CWA-3538B9F3-1190-4861-8523-3E66C9639ED8&ElementName=%E5%A4%A9%E6%B0%A3%E9%A0%90%E5%A0%B1%E7%B6%9C%E5%90%88%E6%8F%8F%E8%BF%B0,%E5%A4%A9%E6%B0%A3%E7%8F%BE%E8%B1%A1')
    console.log('測試api成功')
  } catch (err) {
    console.log('測試api失敗')
    console.log(err)
  }
}
