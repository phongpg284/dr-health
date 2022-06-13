import { Migration } from '@mikro-orm/migrations';

export class Migration20220613081504 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "patient" drop constraint "patient_doctor_id_foreign";');
    this.addSql('alter table "patient" drop constraint "patient_device_id_foreign";');

    this.addSql('alter table "patient" alter column "doctor_id" type int using ("doctor_id"::int);');
    this.addSql('alter table "patient" alter column "doctor_id" drop not null;');
    this.addSql('alter table "patient" alter column "device_id" type int using ("device_id"::int);');
    this.addSql('alter table "patient" alter column "device_id" drop not null;');
    this.addSql('alter table "patient" add constraint "patient_doctor_id_foreign" foreign key ("doctor_id") references "doctor" ("id") on update cascade on delete set null;');
    this.addSql('alter table "patient" add constraint "patient_device_id_foreign" foreign key ("device_id") references "device" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "patient" drop constraint "patient_doctor_id_foreign";');
    this.addSql('alter table "patient" drop constraint "patient_device_id_foreign";');

    this.addSql('alter table "patient" alter column "doctor_id" type int using ("doctor_id"::int);');
    this.addSql('alter table "patient" alter column "doctor_id" set not null;');
    this.addSql('alter table "patient" alter column "device_id" type int using ("device_id"::int);');
    this.addSql('alter table "patient" alter column "device_id" set not null;');
    this.addSql('alter table "patient" add constraint "patient_doctor_id_foreign" foreign key ("doctor_id") references "doctor" ("id") on update cascade;');
    this.addSql('alter table "patient" add constraint "patient_device_id_foreign" foreign key ("device_id") references "device" ("id") on update cascade;');
  }

}
