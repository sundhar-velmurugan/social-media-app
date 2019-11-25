# Date: 2-11-2019

## Setup of the project

- Created a MongoDB Atlas cluster
- Added `.gitignore` file
- Created `package.json` file using `npm init`
- Installed dependencies and devDependencies
- Connected the MongoDB Atlas cluster with the Express application
  - Connection URI is present in the `config/default.json` file
- Created test routes for all 4 modules - Users, Auth, Profile and Posts
  - All the routes inside the _module_.js file is a relative route to `/api/module`
  - All test routes are tested using postman and they are working

### Dependencies

- `express` web framework for backend
- `express-validator` for data validation
- `bcryptjs` for password encryption
- `config` for global variables
- `gravatar` for profile avatars
- `jsonwebtoken` for using JWT
- `mongoose` interacts with MongoDB
- `request` allows making HTTP request to other APIs. [Mainly used for calling internal APIs]

### Development Dependencies

- `nodemon` to constantly watch the server for changes
- `concurrently` allows us to run express server and react dev server at the same time with one single command

# Date: 3-11-2019

## User API routes and JWT Authentication

### User model createion

- Model created using mongoose schema

### Request and body validation

- A **post** request is created for the `/api/users/` route which handles user registration
- According to schema, the name, email and password is required to check if all the necessary data is sent in the api _express validator_ is used
- _check_ method applies the specified rules for the parameter and the _validationResult_ method catches the error thrown by _check_

### User Registration

- Check whether the user already exist or not
- Create a gravatar for the user
- Encrypt the password
- Save the user in the DB

### JWT

- JWT is implemented by `sign` method of **jwt** package
- Custom middleware is implemented because `passport` package is heavy and complicated for simple login. Can be used if third party authentication like google, facebook, github is used
- The custom middleware decodes the JWT and verifies whether it is valid or not. If it is valid the corresponding user id is attached to the _request_ object
- The auth middleware is added to the **GET auth** API which will be used constantly in the application the fill the redux state with the current user details

### User authentication and login

- Same logic as registration, except the `name` property is not necessary
- Check if the user exists and if the password matches, if condition passes then JWT is sent as a response

# Date 11-11-2019

## Profile API Routes

### Creating a Profile model

- Before creating routes and APIs for profile, a model needed to be created
- Profile model created in `/models/Profile.js`

### Get Current User Profile

- To get current user profile, the userid is extracted from the JWT

### Create and Update Profile

- Required fields such as _skills_ and _status_ is checked in the request using **express-validator**
- Only entered values are inserted in the Database
- Build the _profileFields_ object to insert into the database
- If profile exist, update the profile. Otherwise, create a new profile
- Experience and education will be handled in different endpoint

### Get all profiles and profiles by user ID

### Delete profile and User

- Deleting the profile also removes the user data and the posts data

### Add profile experience

- Thought experience and education belong to the same collection i.e profile, they are different resources. That is why a seperate endpoint is created for performing operations on both of them

**_TODO_** Update profile experience

### Delete profile experience

- Found the index of the experience in the profile, removed it and updated it in the DB

### Add and delete profile education

- Same as adding and deleting profile experience

### Get Github repositories for a Profile

- Register the OAuth application in github
- Used `https://localhost:5000/` for both homepage and callback URL
- clientId and clientSecret from github is stored in `default.json` file
- Fetched Latest 5 repositories of a user using the github API

## Posts API Routes

### Creating a Post model

- name and avatar are also included incase the user deletes their account
- Like and unlike option is available not like and dislike option.

### Add a post

- likes and comments will be handled by different endpoints

### Get all posts and a post by id

- Viewing posts is private, requires authentication

### Delete a post

- A post can be deleted only by the user created it

### Post like and unlike

### Comments - add and remove

- similar to posts

**_TODO_** Like and unlike for comments
**_TODO_** Update comments

# Date: 25-11-2019
## React and frontend
### Setting up react and concurrency
- React is setup using `npx create-react-app client` command
- To concurrently run the client and the server, _concurrently_ package is used. In `/package.json` `npm run dev` command is used to concurrently run the client and the server
- Dependencies for the client are installed - `npm i axios react-router-dom redux react-redux redux-thunk redux-devtools-extension moment react-moment`
- Deleted the git repository initialized inside the **client** folder as a result of using CRA, will use a common git for the entire application
- A proxy is added to the `/client/package.json`, to avoid entering the full URL throughout the client app

### Clean up and intial components
- default styles and service workers are removed from the client directory
- Added the _fontawesome_ script in `/client/public/index.html`
- _Navbar_ and _Landing_ components are initialized inside the components directory and they are imported in `App.js`