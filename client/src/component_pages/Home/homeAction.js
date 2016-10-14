const Dexie = require("dexie")

var db = new Dexie("news_VD");
// db.delete();
db.version(1).stores({
  news: "++id,title",
  articles: "++id, title"
});

var fetchLoop;
var url = "http://localhost:8000/news";     

const Action = (dispatch) => ({
    _fetchLoop: undefined,
    stopFetching(){
       clearInterval(fetchLoop)
    },
    fetchNewsLoop(){
      fetchLoop = setInterval( () => {
        this.fetchNewsOnce(url, dispatch, this.stopFetching)
      },4000)
    },
    fetchNewsOnce(){
      fetchNews(url, dispatch, this.stopFetching)
    }
})

module.exports = Action;



function fetchNews(url, dispatch, stopFetching){
  //open database
  fetch(url)
    .then(res => res.json() )
    .then(news => {
        //put into indexedDB with dexied,
        return db.news.count()
        .then(count => {
          if(count === 0){
              //if no database, just put it
              return Dexie.Promise.all(
                news.map(n => db.news.put({
                  title: n.title,
                  url: n.url,
                  img: n.img,
                  description: n.description
                }))
              ).then(news => {
                  //dispatch news from server
                  dispatch({type:"GET_NEWS", payload: news});
              });
          } 
          
          //if database.news.count is more than 0, continue to next then
          else {
            return Promise.resolve(news)
          }
        })
    })
    .then(news => {
        db.transaction("rw", db.news, () =>{

        return Dexie.Promise.all(
           news.map(n => {
              var obj = {
                  title: n.title,
                  url: n.url,
                  img: n.img,
                  description: n.description
              };

              //check if news already in database
              db.news.each(db_oneNews => {
                  if(db_oneNews.title === n.title) {
                    //do nothing or update
                    obj = undefined;
                  } else {
                    // delete obj.id
                    db.news.put(obj);
                  }
              })
            })
          );//Promise.all
        })
        .then(arr => {
          
          //dispatch news from server
          dispatch({type:"GET_NEWS", payload: news});

        })
    })
    .catch(err => {
      //stop fetching
      stopFetching();

      var cacheNews = [];//cache, to be sent to reducers
      Dexie.getDatabaseNames( (databaseNames) => {
          if (databaseNames.length === 0) {
              // No databases at this origin as we know of.
              return console.log("There are no databases at current origin. Try loading another sample and then go back to this page.");
          }

          //open dexie
          db.open();
          return db.news.each(n => cacheNews.push(n))
      }).then(() => {
          if(Array.isArray(cacheNews) && cacheNews.length > 0){
              dispatch({type:"GET_NEWS", payload: cacheNews})
          }

          db.close();
      })  
    });
}