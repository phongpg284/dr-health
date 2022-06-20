import { Migration } from '@mikro-orm/migrations';

export class Migration20220620144711 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "full_name" varchar(255) not null default \'Demo Full Name\';');
    this.addSql('alter table "user" drop column "first_name";');
    this.addSql('alter table "user" drop column "last_name";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" add column "first_name" varchar(255) not null, add column "last_name" varchar(255) not null;');
    this.addSql('alter table "user" drop column "full_name";');
  }

}
