const sendFile = async (item, ctx) => {
  if (item) {
    try {
      await ctx.replyWithDocument(item);
    } catch (e) {
      ctx.replyWithMarkdown(
        `⚠️ ${e.message}\n\n👉 [Touch here to get the direct download link](${item}) `,
      );
    }
  }
};

module.exports = {
  sendFile,
};



