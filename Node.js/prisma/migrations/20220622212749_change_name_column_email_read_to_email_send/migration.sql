/*
  Warnings:

  - You are about to drop the column `emailRead` on the `files` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "files" DROP COLUMN "emailRead",
ADD COLUMN     "emailSend" BOOLEAN NOT NULL DEFAULT false;
