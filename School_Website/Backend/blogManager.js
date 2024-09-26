const {select} = require("./database");

class blogManager {
    async getArticleInformation(){
        try{
            const query = "SELECT * FROM bryantmdb.blog";
            const result = await select(query);
            if (!result || result.length === 0) {
                return { error: "No articles found", statusCode: 404 };
              }
              return result; 
        }catch (error) {
      console.error("An error occurred while fetching article images:", error);
      return { error: "An error occurred while processing the request", statusCode: 500 };
    }
    }
}

module.exports = blogManager;