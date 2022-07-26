import { Migration } from '@mikro-orm/migrations';

export class Migration20220725174018 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "medicine" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null);');

    this.addSql('create table "schedule" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "user_id" int not null, "type" varchar(255) not null, "appointment_id" int null, "medicine_prescription_id" int null);');
    this.addSql('alter table "schedule" add constraint "schedule_appointment_id_unique" unique ("appointment_id");');
    this.addSql('alter table "schedule" add constraint "schedule_medicine_prescription_id_unique" unique ("medicine_prescription_id");');

    this.addSql('alter table "schedule" add constraint "schedule_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "schedule" add constraint "schedule_appointment_id_foreign" foreign key ("appointment_id") references "appointment" ("id") on update cascade on delete set null;');
    this.addSql('alter table "schedule" add constraint "schedule_medicine_prescription_id_foreign" foreign key ("medicine_prescription_id") references "medicine_prescription" ("id") on update cascade on delete set null;');

    this.addSql('alter table "appointment" add column "schedule_id" int not null;');
    this.addSql('alter table "appointment" add constraint "appointment_schedule_id_foreign" foreign key ("schedule_id") references "schedule" ("id") on update cascade;');
    this.addSql('alter table "appointment" rename column "date" to "time";');
    this.addSql('alter table "appointment" add constraint "appointment_schedule_id_unique" unique ("schedule_id");');

    this.addSql('alter table "medicine_prescription" add column "schedule_id" int not null;');
    this.addSql('alter table "medicine_prescription" add constraint "medicine_prescription_schedule_id_foreign" foreign key ("schedule_id") references "schedule" ("id") on update cascade;');
    this.addSql('alter table "medicine_prescription" add constraint "medicine_prescription_schedule_id_unique" unique ("schedule_id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "appointment" drop constraint "appointment_schedule_id_foreign";');

    this.addSql('alter table "medicine_prescription" drop constraint "medicine_prescription_schedule_id_foreign";');

    this.addSql('drop table if exists "medicine" cascade;');

    this.addSql('drop table if exists "schedule" cascade;');

    this.addSql('alter table "appointment" drop constraint "appointment_schedule_id_unique";');
    this.addSql('alter table "appointment" drop column "schedule_id";');
    this.addSql('alter table "appointment" rename column "time" to "date";');

    this.addSql('alter table "medicine_prescription" drop constraint "medicine_prescription_schedule_id_unique";');
    this.addSql('alter table "medicine_prescription" drop column "schedule_id";');
  }

}
