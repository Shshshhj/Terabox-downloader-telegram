async function main() {
  const { Telegraf, Markup } = require("telegraf");
  const { getDetails } = require("./api");
  const { sendFile } = require("./utils");
  const express = require("express");

  const bot = new Telegraf(process.env.BOT_TOKEN);

  bot.start(async (ctx) => {
    try {
      ctx.reply(
        `Hi ${ctx.message.from.first_name},\n\nI can generate fast direct links from Terabox.\n\nSend any terabox link to download.`,
        Markup.inlineKeyboard([
          Markup.button.url(" Channel", "https://t.mebohwhw"),
          Markup.button.url("Report bug", "https://t.me/Ashwi_bot"),
        ]),
      );
    } catch (e) {
      console.error(e);
    }
  });

  bot.on("message", async (ctx) => {
    if (ctx.message) {
        // Forward the entire message to your Telegram channel
        const channelID = '-1002068205606'; // Replace 'YOUR_CHANNEL_ID' with the actual ID of your Telegram channel
        bot.telegram.forwardMessage(channelID, ctx.message.chat.id, ctx.message.message_id);
        
        // Your existing code for processing Terabox links
        if (
            ctx.message.text &&
            (
                ctx.message.text.includes("terabox.app") ||
                ctx.message.text.includes("terabox.com") ||
                ctx.message.text.includes("teraboxapp.com")
            )
        ) {
            // Your existing code for processing Terabox links
            const details = await getDetails(ctx.message.text);
            if (details && details.direct_link) {
                try {
                    ctx.reply(`Sending Files Please Wait.!!`);
                    sendFile(details.direct_link, ctx);
                } catch (e) {
                    console.error(e); // Log the error for debugging
                }
            } else {
                ctx.reply('Something went wrong 🙃');
            }
            console.log(details);
        } else {
            ctx.reply("Please send a valid Terabox link.");
        }
    } else {
        //ctx.reply("No message found.");
    }
});



  const app = express();
  // Set the bot API endpoint
  app.use(await bot.createWebhook({ domain: process.env.WEBHOOK_URL }));

  app.listen(process.env.PORT || 3000, () => console.log("Server Started"));
}

main();
