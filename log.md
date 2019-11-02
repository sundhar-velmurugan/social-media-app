# Date: 2-11-2019
## Setup of the project
* Created a MongoDB Atlas cluster
* Added `.gitignore` file
* Created `package.json` file using `npm init`
* Installed dependencies and devDependencies
* Connected the MongoDB Atlas cluster with the Express application
    * Connection URI is present in the `config/default.json` file
* Created test routes for all 4 modules - Users, Auth, Profile and Posts
    * All the routes inside the _module_.js file is a relative route to `/api/module` 
    * All test routes are tested using postman and they are working

### Dependencies

* `express` web framework for backend
* `express-validator` for data validation
* `bcryptjs` for password encryption
* `config` for global variables
* `gravatar` for profile avatars
* `jsonwebtoken` for using JWT
* `mongoose` interacts with MongoDB
* `request` allows making HTTP request to other APIs. [Mainly used for calling internal APIs]

### Development Dependencies

* `nodemon` to constantly watch the server for changes
* `concurrently` allows us to run express server and react dev server at the same time with one single command