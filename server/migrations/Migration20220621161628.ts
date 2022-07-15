import { Migration } from '@mikro-orm/migrations';

export class Migration20220621161628 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "medical_threshold" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "sp_o2threshold" int not null default 0, "heart_rate_threshold" int not null default 0, "body_temp_threshold" int not null default 0, "dias_high_threshold" int not null default 0, "dias_low_threshold" int not null default 0, "sys_high_threshold" int not null default 0, "sys_low_threshold" int not null default 0);');

    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');

    this.addSql('alter table "patient" add column "medical_threshold_id" int null;');
    this.addSql('alter table "patient" add constraint "patient_medical_threshold_id_foreign" foreign key ("medical_threshold_id") references "medical_threshold" ("id") on update cascade on delete set null;');
    this.addSql('alter table "patient" add constraint "patient_medical_threshold_id_unique" unique ("medical_threshold_id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "patient" drop constraint "patient_medical_threshold_id_foreign";');

    this.addSql('drop table if exists "medical_threshold" cascade;');

    this.addSql('alter table "user" drop constraint "user_email_unique";');

    this.addSql('alter table "patient" drop constraint "patient_medical_threshold_id_unique";');
    this.addSql('alter table "patient" drop column "medical_threshold_id";');
  }

}
