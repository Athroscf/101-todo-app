
# Todos and Notes

A simple ToDo and notes app created for skills demonstration for CODE Exitos.

## Live project

https://master.d2jlvsqcwyp717.amplifyapp.com/

This project is being hosted in Amplify both Frontend and Backend which means it has CI/CD.

## Tech Stack

**Client:** React, Redux Toolkit, CSS

**Server:** Amplify, GraphQL, AppSync, Cognito, DynamoDB

**SCM**: Git, Github
## Run Locally

Clone the project

```bash
  git clone https://github.com/Athroscf/101-todo-app.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  ionic serve
```

## Run Backend

Create an Amplify project and copy the graphql schema in

```
/amplify/backend/api/101todoapp/schema.graphql
```

Learn to create an amplify project:

https://docs.amplify.aws/


## Project Structure

```bash
-amplify
-public
-src
  -components
  -graphql
  -pages
  -redux
  -theme
```