**_TODO_** Add API documentation

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

### React router setup
- Enclosed the entire App with `<Router>` component
- Components are mapped to their corresponding routes
- **Link** component from react-router is used in the places where `<a>` must have been used

### Register form and useState hook

### Request example and login form

## Redux setup and Alerts

### Creating a redux store
- Redux store is created in `client/src/store.js`
- `composeWithDevTools` will give nicer output in redux devtools

### Alert reducer, action and types
- Reducers and actions for alerts are created in their corresponding folders
- To create a unique id for each alert _uuid_ package is installed

### Alert component and action call
- Added `connect` to Register component to use **setAlert**
- Created *Alert* component to display alert messages from the *Register* componet
- The alert messages will disappear after a specific time interval

## React User Authentication

### Auth Reducer and Register Action
- JWT is obtained from the browser _localStorage_
- If any error arises during the registration, Alert component is called
- If registration is successful, the JWT is stored in localStorage
  - This JWT will be used to check if the user is authenticated

### Load user and set auth token
- Check if token exists, if exists put it in global header
  - handled by `/client/src/utils/setAuthToken.js`
- User auth is checked for every page

### User Login
- Login and register actions triggers user authentication check
- If the authentication is success, then the user is redirected
- Else tokens are cleared and the user remains in the same page

### Logout and Navbar links
- Navigation bar changes when the user is logged in and logged out accordingly

# Date 3-12-2019 and 4-12-2019
## Dashboard and Profile Management

### Protected route for Dashboard
- The dashboard route `/dashboard` is protected because it should not be accessible by unauthenticated users
- A new component **PrivateRoute** is created such that it redirects to the dashboard page if the user is authenticated else the user is redirected to login page

### Profile reducer and get current profile
- New action for fetching the current user profile is created, if successfully fetched the user profile object is returned else error object is returned
- _Note_: If the login is successful but the user have not created a profile yet then an error will be thrown. Need to redirect to profile creation page for that case

### Starting on the dashboard
- Landing page should not be visible if the user is logged in
- If profile is null, a spinner graphics is rendered
- On logout, the user profile and the repos in the redux store is cleared
- If the user doesnot have a profile, then a link to creating a profile is displayed

### CreateProfile Component
- Social media link fields are displayed only if toggled to view

### Create profile action
- redirect from action is done using `history.push`, redirect from components is done using `Redirect`
- For new profile creation, the user will be redirected to `/dashboards`
- The **history** object is passed from _withRouter_ in react-router

### Edit Profile
- Dashboard actions are added to the top of the dashboard page
- Current user data is fetched from the server and displayed in the form

**_TODO_** Invoke a callback for setState ot reflect state changes immediately in the website

### Add Education and Experience

### List Education and Experience
- Moment package is used to format the display of date

### Delete Experience, Education and Account
- After the account is deleted, the profile is cleared from the redux store and the JWT is removed from the localStorage
- The posts created by the user will also be deleted upon account deletion

# Date 6-12-2019
## Profile display

### Finish profile actions and reducers
- For listing all profiles, the current user profile is cleared and the response from the server is populated on the list of profiles

### Display profiles

# Date: 7-12-2019

### Starting on the profile
- If the user views their own profile edit option will appear
- id in the url can be accessed by _props.match.params_

### ProfileTop and ProfileAbout Components

### Profile Experience and Education display

### Displaying Github repos
- Github repo items are displayed within the github component because that component will not be reused elsewhere

## Posts and Comments

### Post reducer, Action and Initial Component

### Post Item Component
- Delete option for the post id displayed only for the user who created that post

### Like and unlike functionality

### Deleting posts

### Adding posts
**_TODO_** Move the config headers in action files to a common constant file

### Get Single Post

### Adding comments

### Comment Display and Delete

## Prepare and Deploy
### Preparing for deployment
- A new config for production is created in `/config/production,json`
- Build script is added to the server `package.json`, the dependencies will be installed and the static modules will be built by the heroku server
- If the environment is 'production' then every route other then user, auth, post, profile will be redirected to the static index.html file

## Additional features and issue fix

### Not found page and theme workaround
