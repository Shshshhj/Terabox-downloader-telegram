const sendFile = async (item, ctx) => {
  if (item) {
    try {
      await ctx.replyWithDocument(item);
    } catch (e) {
      ctx.replyWithMarkdown(
        `⚠️ ${e.message}\n\n👉 Try manually downloading from [here](${item})\n\n👉 *Maybe This File Is Too Large Or Cannot Accessible From Terabox*`,
      );
    }
  }
};

module.exports = {
  sendFile,
};




const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const fs = require('fs');

// Replace 'YOUR_TELEGRAM_BOT_TOKEN' with your actual Telegram bot token
const token = (process.env.BOT_TOKEN);

// Initialize Telegram Bot
const bot = new TelegramBot(token, { polling: true });

// Function to upload video from direct link
async function uploadVideo(videoUrl, caption) {
    try {
        // Get the bot's private chat ID
        const botInfo = await bot.getMe();
        const chatId = botInfo.id;

        const response = await axios.get(videoUrl, { responseType: 'stream' });
        const videoStream = response.data;

        // Generate a unique file name
        const fileName = `${Date.now()}.mp4`;

        // Save the video to a temporary file
        const tempFilePath = `./${fileName}`;
        videoStream.pipe(fs.createWriteStream(tempFilePath));

        // Send the video to Telegram
        bot.sendVideo(chatId, tempFilePath, { caption });

        // Delete the temporary file after sending
        fs.unlinkSync(tempFilePath);
    } catch (error) {
        console.error('Error uploading video:', error);
    }
}

// Example usage:
const videoUrl = '${item}';
const caption = 'Caption for the video';

uploadVideo(videoUrl, caption);
