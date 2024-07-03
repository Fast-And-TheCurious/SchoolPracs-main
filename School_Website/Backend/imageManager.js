const { select } = require("./database");

async function getAllImages() {
  try {
    const query = "SELECT * FROM image_urls";
    const images = await select(query);

    console.log("Images from database:", images);
    return images;
  } catch (error) {
    console.error("Error in getAllImages:", error);
    throw error;
  }
}

module.exports = {
  getAllImages,
};
