import { Migration } from '@mikro-orm/migrations';

export class Migration20220814173045 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "patient" add column "code" varchar(255) null default \'iieqzs2e\';');
  }

  async down(): Promise<void> {
    this.addSql('alter table "patient" drop column "code";');
  }

}
