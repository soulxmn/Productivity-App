# Planner's Paradice

## Motivation

A gamified productivity chrome extension provides users with a robust environment to keep them engaged in their workflow. Many productivity apps lack the necessary engagement, resulting in users’ stopping using the app. This application aims to change this by introducing a gamified aspect: keeping the user engaged for more extended periods than other apps do.

## Installation

## Required tools

We will use the MERN stack for this project, consisting of MongoDB, ExpressJS, React.JS and Node.JS.

### **NodeJs**

For Windows, download the setup here: [NodeJs Download Link](https://nodejs.org/en/download).

For Linux and WSL2 on Windows, you must run the following commands:

```
$ sudo apt update && sudo apt upgrade
```

Install cURL using:

```
$ sudo apt-get install curl
```

As recommended by Microsoft, install nvm as the node version manager tool. To install that tool, run:

```
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

Install the latest LTS version of NodeJs using this command:

```
$ nvm install --lts
```

To check that you have the correct versions installed on your computer, run:

```
$ node -v
v16.6.2
$ npm -v
7.20.3
```

Set up the NodeJS server and install expressJS to the project:

```
$ cd server
$ nodemon index.js
```

#### **Note**

Having git pull-ed the repo, run `npm install` on the directory that `server` was created to ensure you install all the packages on your local machine.

### **Client - React App**

**Cross-platform**: These instructions are the same for all platforms

```
$ cd client
$ npm install
$ npm run start
```

By default, `npm run start` will run on `http://localhost:3000`

`npm start` will run a development server so you can preview the application. `^C` to end it.

### Server

```
$ cd server
$ npm install
$ npm run dev
```

This will start the server which will listen on port 3001. The server is connected to our MongoDB database using mongoose as the middleware.

#### **MongoDB Login Details**

**[redacted]**

## Version Control

Used git-flow protocol in 3 parts:

1. Release branch
2. Development branch
3. Feature branches.

### Pull Requests

Group members will submit a pull request for each feature/subtask. After, at least two team members can review the code, approve it, and push it to the main and release branches. Before testing, new feature branches must contain the latest codebase from the development branch.

## Ticketing System

Handled on Jira.
