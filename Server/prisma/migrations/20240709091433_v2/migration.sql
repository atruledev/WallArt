/*
  Warnings:

  - You are about to drop the column `walpaper_title` on the `wallpaper` table. All the data in the column will be lost.
  - You are about to drop the column `walpapper_image_url` on the `wallpaper` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `wallpaper` DROP COLUMN `walpaper_title`,
    DROP COLUMN `walpapper_image_url`,
    ADD COLUMN `wallpaper_image_url` VARCHAR(191) NULL,
    ADD COLUMN `wallpaper_title` VARCHAR(191) NULL;
