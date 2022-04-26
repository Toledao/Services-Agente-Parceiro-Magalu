/*
  Warnings:

  - Added the required column `data_criacao` to the `agentes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `agentes` ADD COLUMN `data_criacao` DATETIME(3) NOT NULL;
