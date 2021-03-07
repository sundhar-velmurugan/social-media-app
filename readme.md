## About
- This is a social media application
- The app includes authentication, profiles and forum posts

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
