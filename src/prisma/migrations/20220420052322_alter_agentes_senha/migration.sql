/*
  Warnings:

  - Added the required column `senha` to the `agentes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `agentes` ADD COLUMN `senha` VARCHAR(191) NOT NULL;
