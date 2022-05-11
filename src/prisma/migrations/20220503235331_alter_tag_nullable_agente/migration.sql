-- DropForeignKey
ALTER TABLE `Tag` DROP FOREIGN KEY `Tag_agenteId_fkey`;

-- AlterTable
ALTER TABLE `Tag` MODIFY `agenteId` VARCHAR(191) NULL,
    MODIFY `exibePadrao` BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE `Tag` ADD CONSTRAINT `Tag_agenteId_fkey` FOREIGN KEY (`agenteId`) REFERENCES `agentes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
