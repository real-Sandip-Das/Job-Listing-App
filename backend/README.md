### Installing Dependencies

```bash
cd backend #Switch to this directory
npm install
```

### Setting up environment variables

`backend/.env`:
```bash
MONGO_URI=mongodb://localhost:27017/jobListingApp
CLIENT_URL=http://localhost:3000
JWT_SECRET=my_secret_key_that_needs_to_be_changed
```

### Start MongoDB

(Instructions may vary depending on the Operating System)

Install MongoDB from the instructions given in the [official website](https://www.mongodb.com/) \
Start MongoDB:
```bash
sudo systemctl start mongod
```

### Create a MongoDB Database for the App

Open the MongoDB shell (`mongosh`)
```bash
mongosh
```

then, create and use a new database for the app:
```plaintext
use jobListingApp
```

### Run the Back-End server

```bash
npm start
```

Let's assume the server is running on `http://localhost:5000`

### Registering a new user

Jobs are posted by users, and only the user who posted the job can edit or delete it. \
To post a job, you need to register a new user. \
You can register a new user by sending a `POST` request to `http://localhost:5000/api/auth/register` \
e.g. using `curl`:
```bash
curl -X POST http://localhost:5000/api/auth/register \
-H "Content-Type: application/json" \
-d '{
  "username": "John_Doe",
  "password": "password1234"
}'
```

The server checks whether the username is already taken and prevents duplicate usernames.

### Logging in

```bash
curl -X POST http://localhost:5000/api/auth/login \
-H "Content-Type: application/json" \
-d '{
  "username": "John_Doe",
  "password": "password1234"
}'
```

The server responds with a JSON object containing a JWT token. It will be valid for a limited amount of time (e.g. 1 hour).

### Posting a job

To post a job, you need to send a `POST` request to `http://localhost:5000/api/jobs` \
```bash
curl -X POST http://localhost:5000/api/jobs \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_JWT_TOKEN" \
-d '{
  "title": "Software Engineer",
  "company": "Tech Corp",
  "location": "New York, NY",
  "type": "Full-time",
  "description": "We are looking for a skilled software engineer..."
}'
```
Replace `YOUR_JWT_TOKEN` with the JWT token you received after logging in.

### Editing a job

The server verifies that the user who is trying to edit the job is the same user who posted the job. \
(If not, then the server responds with a `403 Forbidden` status code.)

```bash
curl -X PUT http://localhost:5000/api/jobs/ID \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_JWT_TOKEN" \
-d '{
  "title": "Updated Job Title",
  "company": "Updated Company Name",
  "location": "Updated Location",
  "type": "Updated Job Type",
  "description": "Updated job description..."
}'
```
Replace `ID` with the ID of the job you want to edit. \
Replace `YOUR_JWT_TOKEN` with the JWT token you received after logging in.

### Deleting a job

The server verifies that the user who is trying to delete the job is the same user who posted the job.
(If not, then the server responds with a `403 Forbidden` status code.)

```bash
curl -X DELETE http://localhost:5000/api/jobs/ID \
-H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Viewing a job by ID

No logging in required to view a job by ID.

```bash
curl -X GET http://localhost:5000/api/jobs/ID
```
Replace `ID` with the ID of the job you want to view.

### Viewing all jobs

No logging in required to view all jobs.
```bash
curl -X GET http://localhost:5000/api/jobs
```
