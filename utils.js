const axios = require('axios');

const sendFile = async (item, ctx) => {
  if (item) {
    try {
      console.log('Attempting to fetch file from URL:', item);
      
      const response = await axios.get(item, { responseType: 'stream' });
      
      console.log('File fetched successfully');
      
      await ctx.replyWithDocument(item);
    } catch (e) {
      console.error('Error fetching file:', e);
      
      ctx.replyWithMarkdown(
        `⚠️ ${e.message}\n\n👉 Try manually downloading from [here](${item})\n\n👉 *Maybe This File Is Too Large Or Cannot Accessible From Terabox*`,
      );
    }
  }
};

module.exports = {
  sendFile,
};
