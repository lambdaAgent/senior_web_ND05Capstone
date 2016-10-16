const Dexie = require("dexie")

var db = new Dexie("news_VD");
db.version(1).stores({news: "id"})

const Action = (dispatch) => ({
    unmountArticle(){
      dispatch({type: "UNMOUNT"})
    },
    getArticle(id){
      var cacheNews = [];
      console.log("getArticle", id)
      Dexie.getDatabaseNames( (databaseNames) => {
          if (databaseNames.length === 0) {
              // No databases at this origin as we know of.
              return console.log("There are no databases at current origin. Try loading another sample and then go back to this page.");
          }

          //open dexie
          db.open().catch(function(error) {
            alert('Uh oh : ' + error);
          });        
          db.news.count().then(count => console.log("COUNT", count))  
          return db.news.where('id').equals(Number(id)).toArray()
      }).then((article) => {
          if(article.length <= 0) console.error("article not found");
          dispatch({type: "GET_ARTICLE", payload: article[0]})

          // db.close();
      })  
    },
})

module.exports = Action;
