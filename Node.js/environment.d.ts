declare namespace NodeJS { 

  type StorageType = {
    local: multer.StorageEngine,
    s3: multer.StorageEngine,
  }

  export interface ProcessEnv { 
    APP_URL: string;
    STORAGE_TYPE: keyof StorageType; 
    BUCKET_NAME: string;
    STORAGE_TYPE: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_DEFAULT_REGION: string;
  } 
}