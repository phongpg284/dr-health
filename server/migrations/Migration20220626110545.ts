import { Migration } from '@mikro-orm/migrations';

export class Migration20220626110545 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "identity" varchar(255) null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop column "identity";');
  }

}
