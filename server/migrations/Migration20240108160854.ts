import { Migration } from '@mikro-orm/migrations';

export class Migration20240108160854 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "device_record" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "medical_record_id" int not null, "heart_rate_bpm" int not null, "spo2_percentage" int not null, "temperature" int not null);');
    this.addSql('alter table "device_record" add constraint "device_record_medical_record_id_unique" unique ("medical_record_id");');

    this.addSql('create table "urine_test" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "medical_record_id" int not null, "patient_id_on_urine_device" varchar(255) not null, "glu_value" varchar(255) not null, "leu_value" varchar(255) not null, "nit_value" varchar(255) not null, "uro_value" varchar(255) not null, "pro_value" varchar(255) not null, "ph_value" varchar(255) not null, "bd_value" varchar(255) not null, "sg_value" varchar(255) not null, "ket_value" varchar(255) not null, "bill_value" varchar(255) not null);');
    this.addSql('alter table "urine_test" add constraint "urine_test_medical_record_id_unique" unique ("medical_record_id");');

    this.addSql('alter table "device_record" add constraint "device_record_medical_record_id_foreign" foreign key ("medical_record_id") references "medical_record" ("id") on update cascade;');

    this.addSql('alter table "urine_test" add constraint "urine_test_medical_record_id_foreign" foreign key ("medical_record_id") references "medical_record" ("id") on update cascade;');

    this.addSql('drop table if exists "FeedItem" cascade;');

    this.addSql('alter table "user" add column "avatar" varchar(255) null;');

    this.addSql('alter table "patient" alter column "code" type varchar(255) using ("code"::varchar(255));');
    this.addSql('alter table "patient" alter column "code" set default \'djfn9gbk\';');

    this.addSql('alter table "medical_record" add column "urine_test_id" int not null, add column "device_record_id" int not null;');
    this.addSql('alter table "medical_record" add constraint "medical_record_urine_test_id_foreign" foreign key ("urine_test_id") references "urine_test" ("id") on update cascade;');
    this.addSql('alter table "medical_record" add constraint "medical_record_device_record_id_foreign" foreign key ("device_record_id") references "device_record" ("id") on update cascade;');
    this.addSql('alter table "medical_record" add constraint "medical_record_urine_test_id_unique" unique ("urine_test_id");');
    this.addSql('alter table "medical_record" add constraint "medical_record_device_record_id_unique" unique ("device_record_id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "medical_record" drop constraint "medical_record_device_record_id_foreign";');

    this.addSql('alter table "medical_record" drop constraint "medical_record_urine_test_id_foreign";');

    this.addSql('create table "FeedItem" ("id" serial primary key, "caption" varchar null default null, "url" varchar null default null, "createdAt" timestamptz null default null, "updatedAt" timestamptz null default null);');

    this.addSql('drop table if exists "device_record" cascade;');

    this.addSql('drop table if exists "urine_test" cascade;');

    this.addSql('alter table "medical_record" drop constraint "medical_record_urine_test_id_unique";');
    this.addSql('alter table "medical_record" drop constraint "medical_record_device_record_id_unique";');
    this.addSql('alter table "medical_record" drop column "urine_test_id";');
    this.addSql('alter table "medical_record" drop column "device_record_id";');

    this.addSql('alter table "patient" alter column "code" type varchar using ("code"::varchar);');
    this.addSql('alter table "patient" alter column "code" set default \'iieqzs2e\';');

    this.addSql('alter table "user" drop column "avatar";');
  }

}
