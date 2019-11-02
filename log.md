# Date: 2-11-2019
## Setup of the project
* Created a MongoDB Atlas cluster
* Added `.gitignore` file
* Created `package.json` file using `npm init`
* Installed dependencies and devDependencies
* Connected the MongoDB Atlas cluster with the Express application
    * Connection URI is present in the `config/default.json` file

### Dependencies
`npm i express express-validator bcryptjs config gravatar jsonwebtoken mongoose request`

* `express` web framework for backend
* `express-validator` for data validation
* `bcryptjs` for password encryption
* `config` for global variables
* `gravatar` for profile avatars
* `jsonwebtoken` for using JWT
* `mongoose` interacts with MongoDB
* `request` allows making HTTP request to other APIs. [Mainly used for calling internal APIs]

### Development Dependencies
`npm i nodemon concurrently`

* `nodemon` to constantly watch the server for changes
* `concurrently` allows us to run express server and react dev server at the same time with one single command