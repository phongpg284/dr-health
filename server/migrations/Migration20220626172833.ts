import { Migration } from '@mikro-orm/migrations';

export class Migration20220626172833 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "ward" int null, add column "district" int null, add column "province" int null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop column "ward";');
    this.addSql('alter table "user" drop column "district";');
    this.addSql('alter table "user" drop column "province";');
  }

}
