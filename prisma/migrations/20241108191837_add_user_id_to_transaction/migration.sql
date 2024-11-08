/*
  Warnings:

  - Added the required column `userId` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transaction" ADD COLUMN     "userId" TEXT NOT NULL;
