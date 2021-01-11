#### DEV

[![Build Status Dev](https://github.com/SadheeraMahanama/Thirdfort-Coding-Challenge/workflows/Note-App%20CI/badge.svg?branch=dev)](https://github.com/SadheeraMahanama/Thirdfort-Coding-Challenge/actions)
[![API Doc Dev](https://img.shields.io/badge/API-Doc-brightgreen)](https://documenter.getpostman.com/view/5662193/TVzREH4b)

#### PROD

[![Build Status Prod](https://github.com/SadheeraMahanama/Thirdfort-Coding-Challenge/workflows/Note-App%20CI/badge.svg?branch=master)](https://github.com/SadheeraMahanama/Thirdfort-Coding-Challenge/actions)
[![API Doc Prod](https://img.shields.io/badge/API-Doc-brightgreen)](https://documenter.getpostman.com/view/5662193/TVzREH4b)

# Personal Notes App API RESTFUL

This project is to build a REST API backend application that can be used to manage personal notes in a multi-user environment.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Dependencies](#dependencies)
- [Dev Dependencies](#dev_dependencies)
- [Choose of Technology](#technologies)
- [Implementation](#implementation)

<a name="installation"></a>

## Installation

### Prerequisites

- Node.js with ESM Support (**v14+**)
- MongoDB

### Start App

- Clone this repo: `git clone https://github.com/SadheeraMahanama/Thirdfort-Coding-Challenge.git`
- Install dependencies: `npm install`
- Start this application: `npm start`

<a name="testing"></a>

## Testing

- `npm run test`

<a name="usage"></a>

## Usage

Published API Doc: [https://documenter.getpostman.com/view/5662193/TVzREH4b](https://documenter.getpostman.com/view/5662193/TVzREH4b)

### Resources

**Example**

```
curl --header "Authorization: Bearer <ACCESS_TOKEN>" --location --request GET 'http://localhost:3000/api/note/unarchived?page=1'
```

**Response**

```json
{
    "payload": {
        "docs": [
            {
                "_id": "5ffb242e25dbad1728c2e3e6",
                "title": "Reminders",
                "content": "Go to School tomorrow",
                "archived": false,
                "userId": "5ffae14e6193ef1614c6f1c7",
                "createdAt": "2021-01-10T15:58:38.474Z",
                "updatedAt": "2021-01-10T15:58:38.474Z",
                "__v": 0
            }
            ...
        ],
        "totalDocs": 3,
        "limit": 10,
        "totalPages": 1,
        "page": 1,
        "pagingCounter": 1,
        "hasPrevPage": false,
        "hasNextPage": false,
        "prevPage": null,
        "nextPage": null
    },
    "message": "Get All Unarchived Notes Success",
    "success": true
}
```

<a name="dependencies"></a>

## Dependencies

- [archiver](https://www.npmjs.com/package/archiver)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [express](https://www.npmjs.com/package/express)
- [joi](https://www.npmjs.com/package/joi)
- [express-joi-validation](https://www.npmjs.com/package/express-joi-validation)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [mongoose-paginate-v2](https://www.npmjs.com/package/mongoose-paginate-v2)

<a name="dev_dependencies"></a>

## Dev Dependencies

- [@shelf/jest-mongodb](https://www.npmjs.com/package/@shelf/jest-mongodb)
- [env-cmd](https://www.npmjs.com/package/env-cmd)
- [jest](https://www.npmjs.com/package/jest)
- [mongodb-memory-server](https://www.npmjs.com/package/mongodb-memory-server)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [prettier](https://www.npmjs.com/package/prettier)

<a name="technologies"></a>

## Choose of Technology

- **Node.js** - It has an open source community which has produced many excellent modules to add additional capabilities to the application, runs on various platforms (Windows, Linux, Unix, Mac OS X, etc.) and extremely fast.

- **Express.js** - It is a fast, assertive, essential and moderate web framework of Node.js.

- **MongoDB** - Stores files of any size easily without complicating the stack, JSON data model with dynamic schemas, auto-sharding for horizontal scalability, built in replication for high availability, can run over multiple servers.

<a name="key_features"></a>

## Implementation

- Save a new note
- Update a previously saved note
- Delete a saved note
- Archive a note
- Unarchive a previously archived note
- List saved notes that aren't archived
- List notes that are archived
- Authentication
- Pagination
- Full Text Searching
- Configured Continuous Integration(CI)
- Written Unit tests
- Configured Dev & Prod Environments
