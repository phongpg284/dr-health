import { Migration } from '@mikro-orm/migrations';

export class Migration20240213071335 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "medical_record" drop constraint "medical_record_blood_test_id_foreign";');
    this.addSql('alter table "medical_record" drop constraint "medical_record_supersonic_test_id_foreign";');
    this.addSql('alter table "medical_record" drop constraint "medical_record_urine_test_id_foreign";');
    this.addSql('alter table "medical_record" drop constraint "medical_record_device_record_id_foreign";');

    this.addSql('alter table "medical_record" alter column "blood_test_id" type int using ("blood_test_id"::int);');
    this.addSql('alter table "medical_record" alter column "blood_test_id" drop not null;');
    this.addSql('alter table "medical_record" alter column "supersonic_test_id" type int using ("supersonic_test_id"::int);');
    this.addSql('alter table "medical_record" alter column "supersonic_test_id" drop not null;');
    this.addSql('alter table "medical_record" alter column "urine_test_id" type int using ("urine_test_id"::int);');
    this.addSql('alter table "medical_record" alter column "urine_test_id" drop not null;');
    this.addSql('alter table "medical_record" alter column "device_record_id" type int using ("device_record_id"::int);');
    this.addSql('alter table "medical_record" alter column "device_record_id" drop not null;');
    this.addSql('alter table "medical_record" add constraint "medical_record_blood_test_id_foreign" foreign key ("blood_test_id") references "blood_test" ("id") on update cascade on delete set null;');
    this.addSql('alter table "medical_record" add constraint "medical_record_supersonic_test_id_foreign" foreign key ("supersonic_test_id") references "supersonic_test" ("id") on update cascade on delete set null;');
    this.addSql('alter table "medical_record" add constraint "medical_record_urine_test_id_foreign" foreign key ("urine_test_id") references "urine_test" ("id") on update cascade on delete set null;');
    this.addSql('alter table "medical_record" add constraint "medical_record_device_record_id_foreign" foreign key ("device_record_id") references "device_record" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "medical_record" drop constraint "medical_record_blood_test_id_foreign";');
    this.addSql('alter table "medical_record" drop constraint "medical_record_supersonic_test_id_foreign";');
    this.addSql('alter table "medical_record" drop constraint "medical_record_urine_test_id_foreign";');
    this.addSql('alter table "medical_record" drop constraint "medical_record_device_record_id_foreign";');

    this.addSql('alter table "medical_record" alter column "blood_test_id" type int using ("blood_test_id"::int);');
    this.addSql('alter table "medical_record" alter column "blood_test_id" set not null;');
    this.addSql('alter table "medical_record" alter column "supersonic_test_id" type int using ("supersonic_test_id"::int);');
    this.addSql('alter table "medical_record" alter column "supersonic_test_id" set not null;');
    this.addSql('alter table "medical_record" alter column "urine_test_id" type int using ("urine_test_id"::int);');
    this.addSql('alter table "medical_record" alter column "urine_test_id" set not null;');
    this.addSql('alter table "medical_record" alter column "device_record_id" type int using ("device_record_id"::int);');
    this.addSql('alter table "medical_record" alter column "device_record_id" set not null;');
    this.addSql('alter table "medical_record" add constraint "medical_record_blood_test_id_foreign" foreign key ("blood_test_id") references "blood_test" ("id") on update cascade;');
    this.addSql('alter table "medical_record" add constraint "medical_record_supersonic_test_id_foreign" foreign key ("supersonic_test_id") references "supersonic_test" ("id") on update cascade;');
    this.addSql('alter table "medical_record" add constraint "medical_record_urine_test_id_foreign" foreign key ("urine_test_id") references "urine_test" ("id") on update cascade;');
    this.addSql('alter table "medical_record" add constraint "medical_record_device_record_id_foreign" foreign key ("device_record_id") references "device_record" ("id") on update cascade;');
  }

}