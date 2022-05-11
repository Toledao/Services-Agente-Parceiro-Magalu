-- CreateTable
CREATE TABLE `roteiros` (
    `id` VARCHAR(191) NOT NULL,
    `data_visita` DATETIME(3) NOT NULL,
    `data_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `agenteId` VARCHAR(191) NOT NULL,
    `parceiroId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Parceiro` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `cpnj` VARCHAR(191) NOT NULL,
    `endereco` VARCHAR(191) NOT NULL,
    `enderecoNumero` VARCHAR(191) NOT NULL,
    `enderecoBairro` VARCHAR(191) NOT NULL,
    `enderecoReferencia` VARCHAR(191) NOT NULL,
    `enderecoCep` VARCHAR(191) NOT NULL,
    `enderecoCidade` VARCHAR(191) NOT NULL,
    `enderecoEstado` VARCHAR(191) NOT NULL,
    `enderecoPais` VARCHAR(191) NOT NULL,
    `ativo` BOOLEAN NOT NULL,
    `reponsavel` VARCHAR(191) NOT NULL,
    `agenteId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Parceiro_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `roteiros` ADD CONSTRAINT `roteiros_agenteId_fkey` FOREIGN KEY (`agenteId`) REFERENCES `agentes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `roteiros` ADD CONSTRAINT `roteiros_parceiroId_fkey` FOREIGN KEY (`parceiroId`) REFERENCES `Parceiro`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Parceiro` ADD CONSTRAINT `Parceiro_agenteId_fkey` FOREIGN KEY (`agenteId`) REFERENCES `agentes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
