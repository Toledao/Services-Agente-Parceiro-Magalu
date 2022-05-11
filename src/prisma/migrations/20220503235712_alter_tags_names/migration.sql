/*
  Warnings:

  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TagParceiro` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TagRoteiro` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Tag` DROP FOREIGN KEY `Tag_agenteId_fkey`;

-- DropForeignKey
ALTER TABLE `TagParceiro` DROP FOREIGN KEY `TagParceiro_parceiroId_fkey`;

-- DropForeignKey
ALTER TABLE `TagParceiro` DROP FOREIGN KEY `TagParceiro_tagId_fkey`;

-- DropForeignKey
ALTER TABLE `TagRoteiro` DROP FOREIGN KEY `TagRoteiro_roteiroId_fkey`;

-- DropForeignKey
ALTER TABLE `TagRoteiro` DROP FOREIGN KEY `TagRoteiro_tagId_fkey`;

-- DropTable
DROP TABLE `Tag`;

-- DropTable
DROP TABLE `TagParceiro`;

-- DropTable
DROP TABLE `TagRoteiro`;

-- CreateTable
CREATE TABLE `tags` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `cor` VARCHAR(191) NOT NULL,
    `agenteId` VARCHAR(191) NULL,
    `exibe_padrao` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tags_roteiros` (
    `roteiroId` VARCHAR(191) NOT NULL,
    `tagId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`roteiroId`, `tagId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tags_parceiro` (
    `parceiroId` VARCHAR(191) NOT NULL,
    `tagId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`parceiroId`, `tagId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tags` ADD CONSTRAINT `tags_agenteId_fkey` FOREIGN KEY (`agenteId`) REFERENCES `agentes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tags_roteiros` ADD CONSTRAINT `tags_roteiros_roteiroId_fkey` FOREIGN KEY (`roteiroId`) REFERENCES `roteiros`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tags_roteiros` ADD CONSTRAINT `tags_roteiros_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `tags`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tags_parceiro` ADD CONSTRAINT `tags_parceiro_parceiroId_fkey` FOREIGN KEY (`parceiroId`) REFERENCES `Parceiro`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tags_parceiro` ADD CONSTRAINT `tags_parceiro_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `tags`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
