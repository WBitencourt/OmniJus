-- CreateTable
CREATE TABLE "files" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(255) NOT NULL,
    "size" DECIMAL(65,30) NOT NULL,
    "key" VARCHAR(255) NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "userID" INTEGER NOT NULL,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);
