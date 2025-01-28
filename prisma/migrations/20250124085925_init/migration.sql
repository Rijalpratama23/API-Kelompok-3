-- CreateTable
CREATE TABLE `User` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Member` (
    `member_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Member_email_key`(`email`),
    PRIMARY KEY (`member_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Buku` (
    `buku_id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `publisher` VARCHAR(191) NOT NULL,
    `year_published` INTEGER NOT NULL,
    `stock` INTEGER NOT NULL,

    PRIMARY KEY (`buku_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaksi` (
    `transaksi_id` INTEGER NOT NULL AUTO_INCREMENT,
    `borrow_date` DATETIME(3) NOT NULL,
    `return_date` DATETIME(3) NULL,
    `status` VARCHAR(191) NOT NULL,
    `member_id` INTEGER NOT NULL,
    `buku_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`transaksi_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Transaksi` ADD CONSTRAINT `Transaksi_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `Member`(`member_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaksi` ADD CONSTRAINT `Transaksi_buku_id_fkey` FOREIGN KEY (`buku_id`) REFERENCES `Buku`(`buku_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaksi` ADD CONSTRAINT `Transaksi_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
