/*
  Warnings:

  - Added the required column `isbn` to the `Buku` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `buku` ADD COLUMN `isbn` VARCHAR(191) NOT NULL;
