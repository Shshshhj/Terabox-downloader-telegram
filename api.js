const axios = require("axios");
const fs = require('fs');

async function getDetails(id) {
    try {
        const response = await axios.get(
            `https://terabox-dl-arman.vercel.app/api?data=${id}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

async function getFileStream(directLink) {
  try {
    const response = await axios.get(directLink, { responseType: 'stream' });
    return response.data;
  } catch (error) {
    console.error('Error fetching file:', error);
    throw error;
  }
}


module.exports = {
    getDetails,
    
};
