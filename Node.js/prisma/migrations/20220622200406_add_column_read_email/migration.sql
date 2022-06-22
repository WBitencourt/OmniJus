/*
  Warnings:

  - Added the required column `emailRead` to the `files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "files" ADD COLUMN     "emailRead" BOOLEAN NOT NULL;
