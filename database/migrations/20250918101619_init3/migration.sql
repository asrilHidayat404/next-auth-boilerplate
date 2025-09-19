/*
  Warnings:

  - You are about to drop the column `role_id` on the `User` table. All the data in the column will be lost.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_role_id_fkey`;

-- DropIndex
DROP INDEX `User_role_id_fkey` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `role_id`,
    ADD COLUMN `role` VARCHAR(191) NOT NULL;
