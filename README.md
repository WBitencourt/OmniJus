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

## ✨ Tecnologias

# Front-end
- *** At developer ***

# Back-end
- Express
- Javascript
- Typescript
- TS node dev
- TSC
- Prisma
- Jest
- Postgresql
- Migrations
- SWC
- Cors
- Morgan
- Multer
- Multer S3
- AWS SDK
- Nodemailer
- Dotenv

## :hammer_and_wrench: Features 

# Front-end
-   [ ] The screen should have authentication control;
-   [ ] User can drag multiple files to an upload area;
-   [ ] Realiza o logoff do aplicativo limpando os dados de sessão, necessário realizar login novamente.

# Back-end
-   [ ] The user can only upload .pdf files; .png and .jpg/jpeg;
-   [ ] It must be validated if the files are corrupted;
-   [ ] Files must be saved to some cloud service(AWS S3);
-   [ ] The user should receive an email with the files attached.
-   [ ] GET check if server is running (www.yourUrlServer/)
-   [ ] GET all files (www.yourUrlServer/files/)
-   [ ] POST file sended (www.yourUrlServer/files/) Body: {key: 'file', value: 'your_file.png'}
-   [ ] DELETE file by id, local or AWS S3(www.yourUrlServer/files/:id)
-   [ ] Back-end build with REST.
-   [ ] There are unit tests, command (npm run test).
-   [ ] Transpile typescript to javascript, command (npm build).
-   [ ] SOLID's Principles.

## Running project

# Front-end
*** At developer ***

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
```

Utilize o **yarn** ou o **npm install** para instalar as dependências do projeto.

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
