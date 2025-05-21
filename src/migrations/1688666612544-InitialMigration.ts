import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1688666612544 implements MigrationInterface {
    name = 'InitialMigration1688666612544'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Ajustes para MySQL
        await queryRunner.query(`CREATE TABLE \`addresses\` (\`id\` INT NOT NULL AUTO_INCREMENT, \`street\` varchar(45) NOT NULL, \`zipCode\` varchar(8) NOT NULL, \`number\` varchar(7), \`city\` varchar(20) NOT NULL, \`state\` varchar(2) NOT NULL, PRIMARY KEY (\`id\`))`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` INT NOT NULL AUTO_INCREMENT, \`name\` varchar(45) NOT NULL, \`email\` varchar(45) NOT NULL, \`admin\` boolean NOT NULL DEFAULT false, \`password\` varchar(120) NOT NULL, \`createdAt\` date NOT NULL DEFAULT (CURRENT_DATE), \`updatedAt\` date NOT NULL DEFAULT (CURRENT_DATE), \`deletedAt\` date, UNIQUE INDEX \`IDX_users_email\` (\`email\`), PRIMARY KEY (\`id\`))`);
        await queryRunner.query(`CREATE TABLE \`schedules\` (\`id\` INT NOT NULL AUTO_INCREMENT, \`date\` date NOT NULL, \`hour\` TIME NOT NULL, \`realEstateId\` INT, \`userId\` INT, PRIMARY KEY (\`id\`))`);
        await queryRunner.query(`CREATE TABLE \`real_estate\` (\`id\` INT NOT NULL AUTO_INCREMENT, \`sold\` boolean NOT NULL DEFAULT false, \`value\` decimal(12,2) NOT NULL DEFAULT 0, \`size\` int NOT NULL, \`createdAt\` date NOT NULL DEFAULT (CURRENT_DATE), \`updatedAt\` date NOT NULL DEFAULT (CURRENT_DATE), \`addressId\` INT, \`categoryId\` INT, UNIQUE INDEX \`IDX_real_estate_addressId\` (\`addressId\`), PRIMARY KEY (\`id\`))`);
        await queryRunner.query(`CREATE TABLE \`categories\` (\`id\` INT NOT NULL AUTO_INCREMENT, \`name\` varchar(45) NOT NULL, UNIQUE INDEX \`IDX_categories_name\` (\`name\`), PRIMARY KEY (\`id\`))`);
        await queryRunner.query(`ALTER TABLE \`schedules\` ADD CONSTRAINT \`FK_schedules_realEstateId\` FOREIGN KEY (\`realEstateId\`) REFERENCES \`real_estate\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`schedules\` ADD CONSTRAINT \`FK_schedules_userId\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`real_estate\` ADD CONSTRAINT \`FK_real_estate_addressId\` FOREIGN KEY (\`addressId\`) REFERENCES \`addresses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`real_estate\` ADD CONSTRAINT \`FK_real_estate_categoryId\` FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`real_estate\` DROP FOREIGN KEY \`FK_real_estate_categoryId\``);
        await queryRunner.query(`ALTER TABLE \`real_estate\` DROP FOREIGN KEY \`FK_real_estate_addressId\``);
        await queryRunner.query(`ALTER TABLE \`schedules\` DROP FOREIGN KEY \`FK_schedules_userId\``);
        await queryRunner.query(`ALTER TABLE \`schedules\` DROP FOREIGN KEY \`FK_schedules_realEstateId\``);
        await queryRunner.query(`DROP INDEX \`IDX_categories_name\` ON \`categories\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_real_estate_addressId\` ON \`real_estate\``);
        await queryRunner.query(`DROP TABLE \`real_estate\``);
        await queryRunner.query(`DROP TABLE \`schedules\``);
        await queryRunner.query(`DROP INDEX \`IDX_users_email\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`addresses\``);
    }
}
