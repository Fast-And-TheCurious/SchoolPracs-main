const { select } = require("./database");

async function getAllImages() {
  try {
    const query = "SELECT * FROM Image_Urls";
    const images = await select(query);
    return images;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllImages,
};
