# HTTP NOTIFICATION SYSTEM

## Description
A simple API to subscribe and publish datas

## Local Setup

### Requirements

- Ensure you have Node.JS and Mongo DB installed on your system

### Getting Started
- Clone the repository `git clone  https://github.com/harmydiano/node_http_notification.git `
- Change into the directory `cd node_http_notification`
- Install all required dependencies with `npm install`
- Start the application with `npm run dev`

### Routes
- Subscribe `http://localhost:3010/api/v1/subscribe/topic1`

##payload
    `{
        url: http://localhost:3010/api/v1/test1
    }`
-  Publish `http://localhost:3010/api/v1/publish/topic1`
##payload
    `{
    "data":{
        "message": "hello boy"
    }
}`

- Test `http://localhost:3010/api/v1/test1`