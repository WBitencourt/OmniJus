/*
  Warnings:

  - You are about to alter the column `size` on the `files` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "files" ALTER COLUMN "size" SET DEFAULT 0.0000,
ALTER COLUMN "size" SET DATA TYPE DOUBLE PRECISION;
