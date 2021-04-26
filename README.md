# Med-Minded

A medicine tracker application that tracks medications taken, with dosages, and a journal where a user to track how they're feeling while taking these meds.

## Features
Allows users to create an account and store information about their medications, dosages, and journal entries

## Tech Used
### Frontend
* React.js 
* Redux 
* React Bootstrap
* React Router

### Backend 
* Ruby [2.6.1]
* Rails [5.2.3] - MVC framework used as an API
* Bcrypt - gem used for encryption and securing user passwords
* Postgreql -  database

## Installing

### Backend Installation
* Clone this repo to local machine `git clone <backend-repo-url>`.
* Run `bundle install` to instal dependencies.
* Ensure that Postgresql is running.
* Run `rails db:create` to create database locally.
* Run `rails db:migrate` to create tables into the database.
* Run `rails db:seed` to create seed data.
* Run `rails s` to run server

### Frontend Installation
* Clone frontend repo to local machine `git clone <this-repo-url>`.
* Ensure Backend API is running at `http://localhost:4000/`
* Run `npm install` to install all dependencies.
* Run `npm start` to start server.
