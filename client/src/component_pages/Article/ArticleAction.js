import fetch from 'isomorphic-fetch'

const Dexie = require("dexie");

const DOMAIN = 'http://localhost:8000' || process.env.DOMAIN;
const url = `${DOMAIN}/article/`

var db = new Dexie("news_VD");
db.version(1).stores({news: "id"})

const Action = (dispatch) => ({
    unmountArticle(){
      dispatch({type: "UNMOUNT"})
    },
    fetchAndUpdateArticle(news){
        const articleUrl = encodeURIComponent(news.url);
        return fetch(url + articleUrl).then(res => res.json())
    },
    getArticle(id){
        const self = this;
      var cacheNews = [];

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
          
          // get description and render;
          const foundArticle = article[0];
          self.fetchAndUpdateArticle(foundArticle)
          .then(fetchArticle => {
              return Promise.resolve(fetchArticle)
          })
          .catch(err => {
              console.log(err);
              dispatch({type: "GET_ARTICLE", payload:foundArticle})
              return Promise.reject();
          })
          .then(fetchArticle => {
            // open indexedDB and update;
            db.news.update(id, fetchArticle)
            .then(function (updated) {
                console.log(updated);
                if (updated)
                  console.log ("Friend number 2 was renamed to Number 2");
                else
                  console.log ("Nothing was updated - there were no friend with primary key:" + id);
                db.close();
            })
            .catch(err => {
                console.log(err);
                db.close();
            })
          })

          

      })  
      .catch(err => console.log(err));
    },
})

module.exports = Action;
