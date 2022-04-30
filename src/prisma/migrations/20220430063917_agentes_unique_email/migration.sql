/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `agentes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `agentes_email_key` ON `agentes`(`email`);
