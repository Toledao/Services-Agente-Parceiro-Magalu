-- AlterTable
ALTER TABLE `tags` ADD COLUMN `checkListId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `tags_checklist` (
    `checklistId` VARCHAR(191) NOT NULL,
    `tagId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`checklistId`, `tagId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tags` ADD CONSTRAINT `tags_checkListId_fkey` FOREIGN KEY (`checkListId`) REFERENCES `checklist`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tags_checklist` ADD CONSTRAINT `tags_checklist_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `tags`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tags_checklist` ADD CONSTRAINT `tags_checklist_checklistId_fkey` FOREIGN KEY (`checklistId`) REFERENCES `checklist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
