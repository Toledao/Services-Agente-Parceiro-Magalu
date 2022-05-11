/*
  Warnings:

  - You are about to drop the column `pergunta` on the `checklist` table. All the data in the column will be lost.
  - You are about to drop the column `resposta` on the `checklist` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `checklist` table. All the data in the column will be lost.
  - Added the required column `canais_venda_online` to the `checklist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagens` to the `checklist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `percepcao_geral` to the `checklist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `possui_erp_hub` to the `checklist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preferencia_contato` to the `checklist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qtde_sku` to the `checklist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `redes_sociais_ativas` to the `checklist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo_logistica` to the `checklist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `checklist` DROP COLUMN `pergunta`,
    DROP COLUMN `resposta`,
    DROP COLUMN `tipo`,
    ADD COLUMN `canais_venda_online` VARCHAR(191) NOT NULL,
    ADD COLUMN `imagens` VARCHAR(191) NOT NULL,
    ADD COLUMN `percepcao_geral` VARCHAR(191) NOT NULL,
    ADD COLUMN `possui_erp_hub` VARCHAR(191) NOT NULL,
    ADD COLUMN `preferencia_contato` VARCHAR(191) NOT NULL,
    ADD COLUMN `qtde_sku` VARCHAR(191) NOT NULL,
    ADD COLUMN `redes_sociais_ativas` VARCHAR(191) NOT NULL,
    ADD COLUMN `tipo_logistica` VARCHAR(191) NOT NULL;
