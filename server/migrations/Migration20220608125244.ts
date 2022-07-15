import { Migration } from '@mikro-orm/migrations';

export class Migration20220608125244 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "role" varchar(255) null);');

    this.addSql('create table "doctor" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "account_id" int not null, "address" varchar(255) null, "dob" timestamptz(0) null);');
    this.addSql('alter table "doctor" add constraint "doctor_account_id_unique" unique ("account_id");');

    this.addSql('create table "device" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "type" varchar(255) not null, "patient_id" int not null, "is_connect" boolean not null default false);');
    this.addSql('alter table "device" add constraint "device_patient_id_unique" unique ("patient_id");');

    this.addSql('create table "patient" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "account_id" int not null, "doctor_id" int not null, "device_id" int not null);');
    this.addSql('alter table "patient" add constraint "patient_account_id_unique" unique ("account_id");');
    this.addSql('alter table "patient" add constraint "patient_device_id_unique" unique ("device_id");');

    this.addSql('create table "medical_record" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "patient_id" int not null);');
    this.addSql('alter table "medical_record" add constraint "medical_record_patient_id_unique" unique ("patient_id");');

    this.addSql('create table "medical_stat" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "type" varchar(255) not null, "unit" varchar(255) not null, "medical_record_id" int not null);');

    this.addSql('alter table "doctor" add constraint "doctor_account_id_foreign" foreign key ("account_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "device" add constraint "device_patient_id_foreign" foreign key ("patient_id") references "patient" ("id") on update cascade;');

    this.addSql('alter table "patient" add constraint "patient_account_id_foreign" foreign key ("account_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "patient" add constraint "patient_doctor_id_foreign" foreign key ("doctor_id") references "doctor" ("id") on update cascade;');
    this.addSql('alter table "patient" add constraint "patient_device_id_foreign" foreign key ("device_id") references "device" ("id") on update cascade;');

    this.addSql('alter table "medical_record" add constraint "medical_record_patient_id_foreign" foreign key ("patient_id") references "patient" ("id") on update cascade;');

    this.addSql('alter table "medical_stat" add constraint "medical_stat_medical_record_id_foreign" foreign key ("medical_record_id") references "medical_record" ("id") on update cascade;');
  }

}
