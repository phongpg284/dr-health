import { Migration } from '@mikro-orm/migrations';

export class Migration20220614063519 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "device" add column "code" varchar(255) not null;');

    this.addSql('alter table "medical_stat" add column "value" varchar(255) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "device" drop column "code";');

    this.addSql('alter table "medical_stat" drop column "value";');
  }

}
