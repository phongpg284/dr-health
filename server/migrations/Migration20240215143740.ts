import { Migration } from '@mikro-orm/migrations';

export class Migration20240215143740 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "role" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "description" varchar(255) not null);');

    this.addSql('create table "permission" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "code" varchar(255) not null, "description" varchar(255) not null, "role_id" int not null);');

    this.addSql('create table "medicine" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null);');

    this.addSql('create table "medical_threshold" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "sp_o2threshold" int not null default 0, "heart_rate_threshold" int not null default 0, "body_temp_threshold" int not null default 0, "dias_high_threshold" int not null default 0, "dias_low_threshold" int not null default 0, "sys_high_threshold" int not null default 0, "sys_low_threshold" int not null default 0);');

    this.addSql('create table "device" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "type" varchar(255) not null, "code" varchar(255) not null, "is_connect" boolean not null default false);');

    this.addSql('create table "blood_test_stat" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "value" int not null);');

    this.addSql('create table "blood_stat" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "unit" varchar(255) not null, "blood_test_stat_id" int not null);');

    this.addSql('create table "address" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "location" varchar(255) null, "ward" varchar(255) null, "ward_code" int null, "district" varchar(255) null, "district_code" int null, "province" varchar(255) null, "province_code" int null);');

    this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "full_name" varchar(255) not null default \'Demo Full Name\', "email" varchar(255) not null, "password" varchar(255) not null, "role" varchar(255) not null, "phone" varchar(255) null, "gender" varchar(255) null, "avatar" varchar(255) null, "dob" timestamptz(0) null, "job" varchar(255) null, "ethnic" varchar(255) null, "address_id" int null, "nationality" varchar(255) null, "identity" varchar(255) null);');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
    this.addSql('alter table "user" add constraint "user_address_id_unique" unique ("address_id");');

    this.addSql('create table "doctor" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "account_id" int not null, "department" varchar(255) null, "degree" varchar(255) null);');
    this.addSql('alter table "doctor" add constraint "doctor_account_id_unique" unique ("account_id");');

    this.addSql('create table "patient" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "code" varchar(255) null default \'9wksoqks\', "account_id" int not null, "doctor_id" int null, "device_id" int null, "medical_threshold_id" int null);');
    this.addSql('alter table "patient" add constraint "patient_account_id_unique" unique ("account_id");');
    this.addSql('alter table "patient" add constraint "patient_device_id_unique" unique ("device_id");');
    this.addSql('alter table "patient" add constraint "patient_medical_threshold_id_unique" unique ("medical_threshold_id");');

    this.addSql('create table "appointment" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "patient_id" int not null, "doctor_id" int not null, "name" varchar(255) not null default \'Meeting\', "time" timestamptz(0) not null, "link" varchar(255) not null, "duration" int not null);');

    this.addSql('create table "notification" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" varchar(255) not null, "content" varchar(255) not null, "status" varchar(255) not null, "type" varchar(255) not null, "user_id" int not null, "appointment_id" int null);');

    this.addSql('create table "medical_stat" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "type" varchar(255) not null, "value" varchar(255) not null, "second_value" varchar(255) null, "unit" varchar(255) null, "patient_id" int not null);');

    this.addSql('create table "medical_record" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "patient_id" int not null, "blood_test_id" int null, "supersonic_test_id" int null, "urine_test_id" int null);');
    this.addSql('alter table "medical_record" add constraint "medical_record_blood_test_id_unique" unique ("blood_test_id");');
    this.addSql('alter table "medical_record" add constraint "medical_record_supersonic_test_id_unique" unique ("supersonic_test_id");');
    this.addSql('alter table "medical_record" add constraint "medical_record_urine_test_id_unique" unique ("urine_test_id");');

    this.addSql('create table "blood_test" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "medical_record_id" int not null, "blood_test_stat_id" int not null);');
    this.addSql('alter table "blood_test" add constraint "blood_test_medical_record_id_unique" unique ("medical_record_id");');

    this.addSql('create table "supersonic_test" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "medical_record_id" int not null);');
    this.addSql('alter table "supersonic_test" add constraint "supersonic_test_medical_record_id_unique" unique ("medical_record_id");');

    this.addSql('create table "urine_test" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "medical_record_id" int not null, "patient_id_on_urine_device" varchar(255) not null, "glu_value" varchar(255) not null, "leu_value" varchar(255) not null, "nit_value" varchar(255) not null, "uro_value" varchar(255) not null, "pro_value" varchar(255) not null, "ph_value" varchar(255) not null, "bd_value" varchar(255) not null, "sg_value" varchar(255) not null, "ket_value" varchar(255) not null, "bill_value" varchar(255) not null);');
    this.addSql('alter table "urine_test" add constraint "urine_test_medical_record_id_unique" unique ("medical_record_id");');

    this.addSql('create table "prescription" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "patient_id" int not null);');

    this.addSql('create table "medicine_prescription" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "medicine" varchar(255) not null, "quantity" int not null, "note" varchar(255) null, "start_date_range" timestamptz(0) not null, "end_date_range" timestamptz(0) not null, "time" timestamptz(0) not null, "prescription_id" int not null);');

    this.addSql('create table "schedule" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "time" timestamptz(0) not null, "user_id" int not null, "type" varchar(255) not null, "appointment_id" int null, "medicine_prescription_id" int null);');

    this.addSql('create table "device_record" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "patient_id" int not null, "heart_beat_bpm" int not null, "oxygen_percent" int not null, "temperature" int not null);');

    this.addSql('alter table "permission" add constraint "permission_role_id_foreign" foreign key ("role_id") references "role" ("id") on update cascade;');

    this.addSql('alter table "blood_stat" add constraint "blood_stat_blood_test_stat_id_foreign" foreign key ("blood_test_stat_id") references "blood_test_stat" ("id") on update cascade;');

    this.addSql('alter table "user" add constraint "user_address_id_foreign" foreign key ("address_id") references "address" ("id") on update cascade on delete set null;');

    this.addSql('alter table "doctor" add constraint "doctor_account_id_foreign" foreign key ("account_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "patient" add constraint "patient_account_id_foreign" foreign key ("account_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "patient" add constraint "patient_doctor_id_foreign" foreign key ("doctor_id") references "doctor" ("id") on update cascade on delete set null;');
    this.addSql('alter table "patient" add constraint "patient_device_id_foreign" foreign key ("device_id") references "device" ("id") on update cascade on delete set null;');
    this.addSql('alter table "patient" add constraint "patient_medical_threshold_id_foreign" foreign key ("medical_threshold_id") references "medical_threshold" ("id") on update cascade on delete set null;');

    this.addSql('alter table "appointment" add constraint "appointment_patient_id_foreign" foreign key ("patient_id") references "patient" ("id") on update cascade;');
    this.addSql('alter table "appointment" add constraint "appointment_doctor_id_foreign" foreign key ("doctor_id") references "doctor" ("id") on update cascade;');

    this.addSql('alter table "notification" add constraint "notification_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "notification" add constraint "notification_appointment_id_foreign" foreign key ("appointment_id") references "appointment" ("id") on update cascade on delete set null;');

    this.addSql('alter table "medical_stat" add constraint "medical_stat_patient_id_foreign" foreign key ("patient_id") references "patient" ("id") on update cascade;');

    this.addSql('alter table "medical_record" add constraint "medical_record_patient_id_foreign" foreign key ("patient_id") references "patient" ("id") on update cascade;');
    this.addSql('alter table "medical_record" add constraint "medical_record_blood_test_id_foreign" foreign key ("blood_test_id") references "blood_test" ("id") on update cascade on delete set null;');
    this.addSql('alter table "medical_record" add constraint "medical_record_supersonic_test_id_foreign" foreign key ("supersonic_test_id") references "supersonic_test" ("id") on update cascade on delete set null;');
    this.addSql('alter table "medical_record" add constraint "medical_record_urine_test_id_foreign" foreign key ("urine_test_id") references "urine_test" ("id") on update cascade on delete set null;');

    this.addSql('alter table "blood_test" add constraint "blood_test_medical_record_id_foreign" foreign key ("medical_record_id") references "medical_record" ("id") on update cascade;');
    this.addSql('alter table "blood_test" add constraint "blood_test_blood_test_stat_id_foreign" foreign key ("blood_test_stat_id") references "blood_test_stat" ("id") on update cascade;');

    this.addSql('alter table "supersonic_test" add constraint "supersonic_test_medical_record_id_foreign" foreign key ("medical_record_id") references "medical_record" ("id") on update cascade;');

    this.addSql('alter table "urine_test" add constraint "urine_test_medical_record_id_foreign" foreign key ("medical_record_id") references "medical_record" ("id") on update cascade;');

    this.addSql('alter table "prescription" add constraint "prescription_patient_id_foreign" foreign key ("patient_id") references "patient" ("id") on update cascade;');

    this.addSql('alter table "medicine_prescription" add constraint "medicine_prescription_prescription_id_foreign" foreign key ("prescription_id") references "prescription" ("id") on update cascade;');

    this.addSql('alter table "schedule" add constraint "schedule_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "schedule" add constraint "schedule_appointment_id_foreign" foreign key ("appointment_id") references "appointment" ("id") on update cascade on delete set null;');
    this.addSql('alter table "schedule" add constraint "schedule_medicine_prescription_id_foreign" foreign key ("medicine_prescription_id") references "medicine_prescription" ("id") on update cascade on delete set null;');

    this.addSql('alter table "device_record" add constraint "device_record_patient_id_foreign" foreign key ("patient_id") references "patient" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "permission" drop constraint "permission_role_id_foreign";');

    this.addSql('alter table "patient" drop constraint "patient_medical_threshold_id_foreign";');

    this.addSql('alter table "patient" drop constraint "patient_device_id_foreign";');

    this.addSql('alter table "blood_stat" drop constraint "blood_stat_blood_test_stat_id_foreign";');

    this.addSql('alter table "blood_test" drop constraint "blood_test_blood_test_stat_id_foreign";');

    this.addSql('alter table "user" drop constraint "user_address_id_foreign";');

    this.addSql('alter table "doctor" drop constraint "doctor_account_id_foreign";');

    this.addSql('alter table "patient" drop constraint "patient_account_id_foreign";');

    this.addSql('alter table "notification" drop constraint "notification_user_id_foreign";');

    this.addSql('alter table "schedule" drop constraint "schedule_user_id_foreign";');

    this.addSql('alter table "patient" drop constraint "patient_doctor_id_foreign";');

    this.addSql('alter table "appointment" drop constraint "appointment_doctor_id_foreign";');

    this.addSql('alter table "appointment" drop constraint "appointment_patient_id_foreign";');

    this.addSql('alter table "medical_stat" drop constraint "medical_stat_patient_id_foreign";');

    this.addSql('alter table "medical_record" drop constraint "medical_record_patient_id_foreign";');

    this.addSql('alter table "prescription" drop constraint "prescription_patient_id_foreign";');

    this.addSql('alter table "device_record" drop constraint "device_record_patient_id_foreign";');

    this.addSql('alter table "notification" drop constraint "notification_appointment_id_foreign";');

    this.addSql('alter table "schedule" drop constraint "schedule_appointment_id_foreign";');

    this.addSql('alter table "blood_test" drop constraint "blood_test_medical_record_id_foreign";');

    this.addSql('alter table "supersonic_test" drop constraint "supersonic_test_medical_record_id_foreign";');

    this.addSql('alter table "urine_test" drop constraint "urine_test_medical_record_id_foreign";');

    this.addSql('alter table "medical_record" drop constraint "medical_record_blood_test_id_foreign";');

    this.addSql('alter table "medical_record" drop constraint "medical_record_supersonic_test_id_foreign";');

    this.addSql('alter table "medical_record" drop constraint "medical_record_urine_test_id_foreign";');

    this.addSql('alter table "medicine_prescription" drop constraint "medicine_prescription_prescription_id_foreign";');

    this.addSql('alter table "schedule" drop constraint "schedule_medicine_prescription_id_foreign";');

    this.addSql('drop table if exists "role" cascade;');

    this.addSql('drop table if exists "permission" cascade;');

    this.addSql('drop table if exists "medicine" cascade;');

    this.addSql('drop table if exists "medical_threshold" cascade;');

    this.addSql('drop table if exists "device" cascade;');

    this.addSql('drop table if exists "blood_test_stat" cascade;');

    this.addSql('drop table if exists "blood_stat" cascade;');

    this.addSql('drop table if exists "address" cascade;');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "doctor" cascade;');

    this.addSql('drop table if exists "patient" cascade;');

    this.addSql('drop table if exists "appointment" cascade;');

    this.addSql('drop table if exists "notification" cascade;');

    this.addSql('drop table if exists "medical_stat" cascade;');

    this.addSql('drop table if exists "medical_record" cascade;');

    this.addSql('drop table if exists "blood_test" cascade;');

    this.addSql('drop table if exists "supersonic_test" cascade;');

    this.addSql('drop table if exists "urine_test" cascade;');

    this.addSql('drop table if exists "prescription" cascade;');

    this.addSql('drop table if exists "medicine_prescription" cascade;');

    this.addSql('drop table if exists "schedule" cascade;');

    this.addSql('drop table if exists "device_record" cascade;');
  }

}
