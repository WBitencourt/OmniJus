# OmniJus

This repository is intended to show my habilites and definition with a test proposed by OmniJus. 
<br/>
Each folder is named with the technical requirements (React.js | Node.js)
<br/>
<br/>
## 💻 Project
- The screen should have authentication control;
- User can drag multiple files to an upload area;
- The user can only upload .pdf files; .png and .jpg/jpeg;
- It must be validated if the files are corrupted;
- Files must be saved to some cloud service;
- The user should receive an email with the files attached.

## 🔖 Layout

- The front-end can be access by [this link](https://omni-jus.vercel.app/). 
<br />
- The back-end can be access by [this link](https://omnijus-production.up.railway.app/). 
<br />
<br />

## ✨ Tecnologias

# Front-end
- Vite
- Javascript
- Typescript
- Styled-components
- Drop-Zone
- Axios
- React icons
- Context API
- React Hooks

# Back-end
- Express
- Javascript
- Typescript
- TS node dev
- TSC
- Prisma
- Jest
- PostgreSQL
- Migrations
- SWC
- Cors
- Morgan
- Multer
- Multer S3
- AWS SDK
- Nodemailer
- Node-Schedule
- Dotenv

## :hammer_and_wrench: Features 

# Front-end
-   [ ] The screen has authentication control, but not implemented yet to user interact;
-   [ ] User can drag multiple files to an upload area;
-   [ ] The user can only upload .pdf files; .png and .jpg/jpeg;
-   [ ] When component upload receive the files, automatically it try to send to server;
-   [ ] When file is uploading to server there are a icon of progress that starts in 0% up to 100%;
-   [ ] If response is error, then icon error is showed;
-   [ ] If response is ok, then icon link and ok is showed;
-   [ ] Limit file is 2MB;
-   [ ] Once uploaded, it's possible to delete file, it remove to server and database
-   [ ] Once uploaded, if you close the page, or refresh it. it will possible to see your files again.

# Back-end
-   [ ] The user can only upload .pdf files; .png and .jpg/jpeg;
-   [ ] It must be validated if the files are corrupted;
-   [ ] Files will be save to local or AWS S3;
-   [ ] The user should receive an email with the files attached by every 5min;
-   [ ] GET check if server is running (www.yourUrlServer/);
-   [ ] GET all files (www.yourUrlServer/files/);
-   [ ] POST file sended (www.yourUrlServer/files/) Body: {key: 'file', value: 'your_file.png'};
-   [ ] DELETE file by id, local or AWS S3(www.yourUrlServer/files/:id);
-   [ ] Back-end build with REST;
-   [ ] There are unit tests, command (npm run test);
-   [ ] Transpile typescript to javascript, command (npm build);
-   [ ] SOLID's Principles;

## Running project

# Front-end
To the step below work is necessary that all developer environment be correctly configured.
Then, fill the values ​​inside the ".env.local" file at the project root.

```cl
VITE_API_URL=<address your server here>
```

Use **yarn** or **npm install** to install the dependencies of the project.

Step 1:
```cl
npm install
```
ou

```cl
yarn install
```

Step 2:
```cl
npm run dev
```
ou

```cl
yarn dev
```

# Back-end
To the step below work is necessary that all developer environment be correctly configured.
Then, fill the values ​​inside the ".env" file at the project root.

```cl
DATABASE_URL='postgresql://<username>:<password>@localhost:<your port, i'm using 5433>/<mydb>?schema=<myschema>'

# Keys of IAM user:
# Access key ID 
AWS_ACCESS_KEY_ID=<Put your access key ID here>

# Secret access key
AWS_SECRET_ACCESS_KEY=<Put your secret access key here>

# Region that your bucket was created, in the S3 storage service AWS
AWS_DEFAULT_REGION=<region example: us-east-1>

# Bucket created at your S3 AWS service
BUCKET_NAME=<put your bucket name here>

STORAGE_TYPE=<choose 'local' to upload/delete files at server or 's3' to upload/delete files in the s3 AWS>

TIME_SEND_EMAIL=<your time at format "node-schedule", EX: '*/5 * * * *', its run in interval of 5 minutes">
```

Use **yarn** or **npm install** to install the dependencies of the project.

Step 1:
```cl
npm install
```
ou

```cl
yarn install
```

Step 2:
```cl
npx prisma migrate dev 
```

Step 3:
```cl
npm run dev
```
ou

```cl
yarn dev
```

## 📄 License

This project is kept by Wendell Bitencourt.

<br />
