- create a repository
- Initialize a repository
- nodemodules package.json package-lock.json
- Install express
- create a Server
- Listen to  port 7777
- Write request handlers for /test ,  /hello
- Install nodemon and update scripts inside package.json
- What are dependencies
- what is use of -g while npm install nodemon 
- Differnce between caret and tilde (^ & ~);


-  initialize git
- .gitignore
-  create  a  remote repo on github
-  Push all code to remote origin
- play with routes and routes extension eg. /hello , /hello/2
- order of routes matters a lot
- install a postman 
- make a test api call in your workspace
- Write logic to handle GET, POST, PATCH, PUT, DELETE API calls and test them on postman
- explore routing and use  of  ?, + , (),  * in the routes
- explore regex /a/ , /.*fly$/


  -Multiple Route Handlers - play with the code
  -next()
  -next function and errors along with res.send()
  -Read about middleware & how expressjs handle behind the scene
  -Differnce between app.use and app.all
  -write  a dummy  auth middleware for admin
  -write a dummy auth middleware for all user route except user/login


  -create a userSchema
  -creare a post/signup API to to add data to database
  -Push some documents using API calls from postman


  -JS objet vs JSON diffrence
  - add the express.json() middleware to your app
  -make your signup API dynamic to recieve data from the enduser


  -API get user by email
  -API - FEED API -GET/FEED get all the users from database
  -get users by find by id
  

  -difference between patch and put
  -API update  a user 
  -Explore the mongoose documentation for model exploration. explore more about it.


  -explore schema types options from the documentation
  -add require, unique, lowerCase, min, minLength, trim
  -add default value 
  -create a custom validate functions for genders
  -Improve the DB schema
  -add timestamps to the schema
  -add API level validation on patch request signup post api.
  -add API validation for each field. 


  -install validator
  -explore vlidator library functions and use for email, password and URL


  -validate data in signup API
  -Install bcrypt package
  -Create PasswordHash using bcrypt.hash 7 save user is excrupted password
  -create login API
  -compare password and throw error if password is invalid;



  -install cookie-parser
  -just send a dummy cookie to  user
  -create GET/profile API and check if you get the cookie back
  -install jsonwebtoken
  -In login API after email & password validation, create a JWT token and send it to user n cookies
  -read the cookie inside your profile API and find the loggedIn user

  -create userAuth middleware
  -Add userAuth middleware in profile API an send newconnetionrequest API.
  -set the expiry of JWT token and cookies to 7 days. 


  -create userSchema method to get jwt();
  -create userSchema method to compare password(passsword)



  -explore tinder API
  -create a list of  all API you can think of in tinder  API
  -Group multiple routes under respective routers



  -read documentation for express.router()
  -creates route folder for managing auth profile, request routers
  -create authRouter , profileRouter,  requestRouter
  -import these router in app.js
   


  -create POST/logout API 
  -create PATCH/ profile/ edit
  -creat PATCH / profile / password
  -make you validate all API data in every POST, PATCH API.
