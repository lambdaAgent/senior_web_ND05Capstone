# Project05 - JakartaPost with Speech ###[the link here](https://jpost.herokuapp.com/)
This app is created for the project 05Capstone for udacity senior Web FrontEnd Nanodegree.
This app will scrap news from <a href="http://www.jakartapost.com">jakartapost</a> , it is a simple news viewer with extra features like: 
  1. ability for computer to read the articles
  2. if online, user is able to instruct simple voice commands,
  3. if offline, the app will still be functional without voice Recognizer

<img src="https://github.com/vdj4y/senior_web_ND05Capstone/blob/master/github%20images/Screen%20Shot%202016-10-18%20at%2010.32.04%20AM.png" />

# HOW TO RUN:
1. `$ git clone`
2. the project is divided into 2 main folders: /client, /server
3. To run server:
   * `$ cd server`
   * `$ npm install`
   * `$ node server.js`
4. To run client: 
   * `$ cd client/build`
   * `$ python -m SimpleHTTPServer *port*`

# Speech Dialog 
1. This web app accepts voice commands,
2. Press the microfone to open speechDialog
3. Press "?" to show available voice commands
4. Press "x" to close
5. Press "microfone" again to start listening, 
6. After the button turn red, try to speak any word, or follow the commands in "?"

<img src="https://github.com/vdj4y/senior_web_ND05Capstone/blob/master/github%20images/Screen%20Shot%202016-10-18%20at%2010.32.36%20AM.png"/>

# LifeCycle of the app:
1. When the app is launched, the app will begin to cache all the basic files (exclude database) using serviceWorker.
2. After app is ready to mount (willMount), react-redux will tell the server to scrap the data from <a href="http://www.jakartapost.com">jakartapost</a>, and serve it to client.
3. When these data are in client side, they will be stored to indexedDb.
4. React will begin querying the data from indexedDb database instead of relying on server. 
5. For every 4 seconds, client will try to update indexedDb database by repeating step 2-4.
6. If client is offline, client will stop trying to update indexedDb from server. 


# Notes for client folder :
1. `cd client`
2. `npm install`
3. `npm start` to run development mode
4. `npm run build` to compile to build folder
5. directory: 
```
   /client
    /build    # compiled files are stored here, for production only
    /public   # index.html, serviceWorker, and media assets
    package.json
    /node_modules
    /src
      /components_pages  # main pages
      /components_utils  # utility components
      /reducers          # reducers 
      index.css       
      index.js           # routes, the starting point of app
      logo.svg
```

# Notes for server folder:
1. server will scrap data from <a href="http://www.jakartapost.com">jakartapost</a> and serve json file to client(indexedDb).
2. to run:
   ```
       1. cd server
       2. npm install
       3. node server.js
   ```
3. `node data_wrangling.js` to re-produce the raw data to useable data, inside database folder
