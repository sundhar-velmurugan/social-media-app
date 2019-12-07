## About
- This is a social media application developed from "MERN Stack Front To Back" course on Udemy [Course link at the bottom]
- The app includes authentication, profiles and forum posts
- Checkout `log.md` for my full walkthrough of this course

## App link:
https://evening-refuge-82094.herokuapp.com/

## Quick Start

### Adding configurations
* Create a new file `config/default.json`

Add the following:
```
{
  "mongoURI": "MONGODB_URL",
  "jwtSecret": "SOME_RANDOM_SECRET_KEY",
  "githubClientId": "ADD_FROM_GITHUB",
  "githubSecret": "ADD_FROM_GITHUB"
}
```

### Then
```
# Install server dependencies
npm install

# Install client dependencies
cd client
npm install

# Run both Express & React from root
npm run dev

# Build for production
cd client
npm run build
```
---
Course Link: https://www.udemy.com/course/mern-stack-front-to-back/
