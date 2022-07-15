import { Migration } from '@mikro-orm/migrations';

export class Migration20220622160420 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "phone" varchar(255) null, add column "gender" varchar(255) null, add column "dob" timestamptz(0) null, add column "job" varchar(255) null, add column "address" varchar(255) null, add column "ethnic" varchar(255) null, add column "nationality" varchar(255) null;');

    this.addSql('alter table "doctor" add column "degree" varchar(255) null;');
    this.addSql('alter table "doctor" drop column "dob";');
    this.addSql('alter table "doctor" rename column "address" to "department";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop column "phone";');
    this.addSql('alter table "user" drop column "gender";');
    this.addSql('alter table "user" drop column "dob";');
    this.addSql('alter table "user" drop column "job";');
    this.addSql('alter table "user" drop column "address";');
    this.addSql('alter table "user" drop column "ethnic";');
    this.addSql('alter table "user" drop column "nationality";');

    this.addSql('alter table "doctor" add column "address" varchar(255) null, add column "dob" timestamptz(0) null;');
    this.addSql('alter table "doctor" drop column "department";');
    this.addSql('alter table "doctor" drop column "degree";');
  }

}
