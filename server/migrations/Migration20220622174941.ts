import { Migration } from '@mikro-orm/migrations';

export class Migration20220622174941 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "prescription" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "patient_id" int not null);');

    this.addSql('create table "medicine_prescription" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "medicine" varchar(255) not null, "quantity" int not null, "time" timestamptz(0) not null, "prescription_id" int not null);');

    this.addSql('alter table "prescription" add constraint "prescription_patient_id_foreign" foreign key ("patient_id") references "patient" ("id") on update cascade;');

    this.addSql('alter table "medicine_prescription" add constraint "medicine_prescription_prescription_id_foreign" foreign key ("prescription_id") references "prescription" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "medicine_prescription" drop constraint "medicine_prescription_prescription_id_foreign";');

    this.addSql('drop table if exists "prescription" cascade;');

    this.addSql('drop table if exists "medicine_prescription" cascade;');
  }

}
