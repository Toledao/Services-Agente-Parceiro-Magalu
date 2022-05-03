/*
  Warnings:

  - Added the required column `tipo_visita` to the `roteiros` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `roteiros` ADD COLUMN `tipo_visita` ENUM('Presencial', 'Videoconferencia', 'Ligacao') NOT NULL;
