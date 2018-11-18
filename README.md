# Magnificent Monitor

> An app that monitors the health of the Magnificent server and allows access to get the recorded status history of a website through its API

---

## Table of Contents

- [Installation](#installation)
- [Documentation](#documentation)

---

## Installation

### Prerequisites

> Install Node and NPM
> [Click Here](https://nodejs.org/en/download/package-manager/) for installation instructions

> This application was developed and tested using a Mac device running MacOS Mojave (10.14)

### Setup

> Install all npm modules

```shell
npm install
```

> Copy the sample .env.sample file to .env

```shell
cp .env.sample .env
```

> Modify the .env file so the variable reflect valid credentials

```env
SERVER_PORT=3000
# DB_HOST can also include credentials eg. <user>:<password>@example.com (do not include and forward slashes ('/'))
DB_HOST=localhost
DB_NAME=magnificent_monitor
```

## Automated Build, Test and Run

> Run the following command to build, test, and run the server

```shell
npm run automate
```

## Manual

> Compile React JSX to ES5 (bundle.js)

```shell
npm run build
```

> To build automatically as changes are made to the source code, run the following command

```shell
npm run build:dev
```

> Test the source code for errors

```shell
npm test
```

> Start the server

```shell
npm start
```

> To automatically restart the server everytime changes are made to the source code, run the following command

```shell
npm run start:dev
```

---

## Documentation

To get the status history of the Magnificent server, use the following api route:

GET `/api/status`
Queries:

- `url`: The url of the website whose history is being looked up (Required)
- `limit`: The number of status reports recorded ordered descendingly by time. (Optional, default is 10)

Example API Call: `localhost:3000/api/status?limit=4&url=http://localhost:12345`
Return data:

```json
[
  {
    "timestamp": 1542497070324,
    "code": 200
  },
  {
    "timestamp": 1542481424628,
    "code": 200
  },
  {
    "timestamp": 1542481391315,
    "code": 500,
    "response": "<html><head><title>web.Server Traceback (most recent call last)</title></head><body><b>web.Server Traceback (most recent call last):</b>\n\n<div>\n  <style type=\"text/css\">\n    div.error {\n      color: red;" // The response has been truncated for this example
  },
  {
    "timestamp": 1542481371312,
    "code": 200
  }
]
```

As seen in the example above, the returned data contains the timestamp of the recorded status, the http code, and a response string.
The response string is only found in entries with a status code of 500, and contain the data that the server being recorded returned.
The timestamp returned is in Unix / Epoch time, counted in seconds from January 1st, 1970 at 12:00 AM (UTC). This can be easily converted in most programming languages

The server backend can be configured to record status history of any url, not just the magnificent server url. Hence, the API requires the URL that is being searched as a parameter.
