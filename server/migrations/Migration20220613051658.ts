import { Migration } from '@mikro-orm/migrations';

export class Migration20220613051658 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" alter column "role" type varchar(255) using ("role"::varchar(255));');
    this.addSql('alter table "user" alter column "role" set not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" alter column "role" type varchar(255) using ("role"::varchar(255));');
    this.addSql('alter table "user" alter column "role" drop not null;');
  }

}
