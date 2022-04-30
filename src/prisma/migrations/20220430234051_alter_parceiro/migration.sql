/*
  Warnings:

  - You are about to drop the column `enderecoBairro` on the `Parceiro` table. All the data in the column will be lost.
  - You are about to drop the column `enderecoCep` on the `Parceiro` table. All the data in the column will be lost.
  - You are about to drop the column `enderecoCidade` on the `Parceiro` table. All the data in the column will be lost.
  - You are about to drop the column `enderecoEstado` on the `Parceiro` table. All the data in the column will be lost.
  - You are about to drop the column `enderecoPais` on the `Parceiro` table. All the data in the column will be lost.
  - You are about to drop the column `enderecoReferencia` on the `Parceiro` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cpnj]` on the table `Parceiro` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bairro` to the `Parceiro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cep` to the `Parceiro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cidade` to the `Parceiro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Parceiro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enderecoComplemento` to the `Parceiro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `Parceiro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referencia` to the `Parceiro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefone` to the `Parceiro` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Parceiro` DROP COLUMN `enderecoBairro`,
    DROP COLUMN `enderecoCep`,
    DROP COLUMN `enderecoCidade`,
    DROP COLUMN `enderecoEstado`,
    DROP COLUMN `enderecoPais`,
    DROP COLUMN `enderecoReferencia`,
    ADD COLUMN `bairro` VARCHAR(191) NOT NULL,
    ADD COLUMN `cep` VARCHAR(191) NOT NULL,
    ADD COLUMN `cidade` VARCHAR(191) NOT NULL,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `enderecoComplemento` VARCHAR(191) NOT NULL,
    ADD COLUMN `estado` VARCHAR(191) NOT NULL,
    ADD COLUMN `referencia` VARCHAR(191) NOT NULL,
    ADD COLUMN `telefone` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Parceiro_cpnj_key` ON `Parceiro`(`cpnj`);
