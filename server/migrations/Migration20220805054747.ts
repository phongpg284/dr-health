import { Migration } from '@mikro-orm/migrations';

export class Migration20220805054747 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "medical_stat" alter column "value" type varchar(255) using ("value"::varchar(255));');
    this.addSql('alter table "medical_stat" alter column "second_value" type varchar(255) using ("second_value"::varchar(255));');
  }

  async down(): Promise<void> {
    this.addSql('alter table "medical_stat" alter column "value" type int using ("value"::int);');
    this.addSql('alter table "medical_stat" alter column "second_value" type int using ("second_value"::int);');
  }

}
