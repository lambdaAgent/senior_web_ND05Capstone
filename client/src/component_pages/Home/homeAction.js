const Dexie = require("dexie")

var db = new Dexie("news_VD");
db.version(1).stores({
  news: "id"
});

// db.delete();
var fetchLoop;
var url = "http://localhost:8000/news";     


const Action = (dispatch) => ({
    _fetchLoop: undefined,
    filterNews(news, word){
      var result;
      result = news.filter(n => n.title.toLowerCase().indexOf(word) > -1 || n.description.toLowerCase().indexOf(word) > -1);
      if(word === "") result = news;
      dispatch({type: "FILTER_NEWS", payload: result})
    },

    //fetching
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
    },
    unmountNews(){
      dispatch({type:"UNMOUNT"})
    }
})

module.exports = Action;

// ---------
//  HELPER 
// ---------

function convertImageSrcToBit64(url){

}

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

             db.news.bulkPut(news)
             .then(news => {
                  //dispatch news from server
                  dispatch({type:"GET_NEWS", payload: news});
              })
             
          } 
          
          //if database.news.count is more than 0, continue to next then
          else {
            return Dexie.Promise.resolve(news)
          }
        })
    })
    .then(news => {
        db.transaction("rw", db.news, () => db.news.bulkPut(news))
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
      }).then((news) => {
          if(Array.isArray(cacheNews) && cacheNews.length > 0){
              dispatch({type:"GET_NEWS", payload: cacheNews})
          }

          db.close();
      })  
    });
}