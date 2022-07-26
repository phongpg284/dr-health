import { Migration } from '@mikro-orm/migrations';

export class Migration20220726180148 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "medicine_prescription" drop constraint "medicine_prescription_schedule_id_foreign";');

    this.addSql('alter table "medicine_prescription" add column "note" varchar(255) null, add column "start_date_range" timestamptz(0) not null, add column "end_date_range" timestamptz(0) not null;');
    this.addSql('alter table "medicine_prescription" drop constraint "medicine_prescription_schedule_id_unique";');
    this.addSql('alter table "medicine_prescription" drop column "schedule_id";');

    this.addSql('alter table "schedule" add column "time" timestamptz(0) not null;');
    this.addSql('alter table "schedule" drop constraint "schedule_medicine_prescription_id_unique";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "schedule" drop column "time";');
    this.addSql('alter table "schedule" add constraint "schedule_medicine_prescription_id_unique" unique ("medicine_prescription_id");');

    this.addSql('alter table "medicine_prescription" add column "schedule_id" int not null;');
    this.addSql('alter table "medicine_prescription" add constraint "medicine_prescription_schedule_id_foreign" foreign key ("schedule_id") references "schedule" ("id") on update cascade;');
    this.addSql('alter table "medicine_prescription" drop column "note";');
    this.addSql('alter table "medicine_prescription" drop column "start_date_range";');
    this.addSql('alter table "medicine_prescription" drop column "end_date_range";');
    this.addSql('alter table "medicine_prescription" add constraint "medicine_prescription_schedule_id_unique" unique ("schedule_id");');
  }

}
