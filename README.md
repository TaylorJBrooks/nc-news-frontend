# Northcoders News Frontend

Northcoders News is a front-end application designed to showcase news articles, comments, and user interactions. Users can view articles, read comments, post comments and upvote/downvote articles, as well as log in to their account.

This project was built using React.js for the front-end framework, and it consumes data from the Northcoders News API, which provides access to various endpoints for articles, comments, users, and topics.

The Northcoders News API can be accessed [here](https://github.com/TaylorJBrooks/nc-news-backend)

## Live Demo

You can access the live demo of the project [here](https://northcodersnewsproject.netlify.app/).

## Features

- View a list of articles, sorted by date posted, number of votes or comments.
- Filter articles by topic.
- View detailed information about an article, including its comments.
- Post comments on articles (authentication required).
- Upvote or downvote articles.
- Log in to an existing user account.
- Error handling for various scenarios, including invalid routes and failed API requests.

### Planned Features to be implemented
- Post new article
- Upvote or downvote comments
- Upvote or downvotes to require authentication
- Create a new user account

## Getting Started
### Prerequisites
* Node.js (v21)

## Installation

To run this project locally, follow these steps:

1. Clone the repo:
```
git clone https://github.com/TaylorJBrooks/nc-news-frontend.git
```
2. Navigate to the project directory:
```
cd nc-news-frontend
```
3. Install all dependencies using npm:
```
npm install
```
4. Start the devlopment server
```
npm run dev
```
5. Open your web browser and navigate to the local host link provided in the terminal to view the application.

## Dependencies

This project utilizes the following major dependencies:

- React.js: A JavaScript library for building user interfaces.
- React Router: Declarative routing for React applications.
- Axios: Promise-based HTTP client for making API requests.
