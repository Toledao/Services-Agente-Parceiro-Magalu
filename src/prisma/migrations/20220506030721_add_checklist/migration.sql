-- CreateTable
CREATE TABLE `checklist` (
    `id` VARCHAR(191) NOT NULL,
    `pergunta` VARCHAR(191) NOT NULL,
    `resposta` VARCHAR(191) NOT NULL,
    `tipo` ENUM('checklist', 'text', 'image') NOT NULL,
    `agenteId` VARCHAR(191) NOT NULL,
    `parceiroId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `checklist` ADD CONSTRAINT `checklist_agenteId_fkey` FOREIGN KEY (`agenteId`) REFERENCES `agentes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checklist` ADD CONSTRAINT `checklist_parceiroId_fkey` FOREIGN KEY (`parceiroId`) REFERENCES `Parceiro`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
