import { Migration } from '@mikro-orm/migrations';

export class Migration20220729123832 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "blood_type" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');

    this.addSql('create table "blood_test" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "medical_record_id" int not null);');
    this.addSql('alter table "blood_test" add constraint "blood_test_medical_record_id_unique" unique ("medical_record_id");');

    this.addSql('create table "blood_test_blood_stats" ("blood_test_id" int not null, "blood_type_id" int not null);');
    this.addSql('alter table "blood_test_blood_stats" add constraint "blood_test_blood_stats_pkey" primary key ("blood_test_id", "blood_type_id");');

    this.addSql('create table "supersonic_test" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "medical_record_id" int not null);');
    this.addSql('alter table "supersonic_test" add constraint "supersonic_test_medical_record_id_unique" unique ("medical_record_id");');

    this.addSql('alter table "blood_test" add constraint "blood_test_medical_record_id_foreign" foreign key ("medical_record_id") references "medical_record" ("id") on update cascade;');

    this.addSql('alter table "blood_test_blood_stats" add constraint "blood_test_blood_stats_blood_test_id_foreign" foreign key ("blood_test_id") references "blood_test" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "blood_test_blood_stats" add constraint "blood_test_blood_stats_blood_type_id_foreign" foreign key ("blood_type_id") references "blood_type" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "supersonic_test" add constraint "supersonic_test_medical_record_id_foreign" foreign key ("medical_record_id") references "medical_record" ("id") on update cascade;');

    this.addSql('alter table "medical_record" add column "blood_test_id" int not null, add column "supersonic_test_id" int not null;');
    this.addSql('alter table "medical_record" add constraint "medical_record_blood_test_id_foreign" foreign key ("blood_test_id") references "blood_test" ("id") on update cascade;');
    this.addSql('alter table "medical_record" add constraint "medical_record_supersonic_test_id_foreign" foreign key ("supersonic_test_id") references "supersonic_test" ("id") on update cascade;');
    this.addSql('alter table "medical_record" add constraint "medical_record_blood_test_id_unique" unique ("blood_test_id");');
    this.addSql('alter table "medical_record" add constraint "medical_record_supersonic_test_id_unique" unique ("supersonic_test_id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "blood_test_blood_stats" drop constraint "blood_test_blood_stats_blood_type_id_foreign";');

    this.addSql('alter table "medical_record" drop constraint "medical_record_blood_test_id_foreign";');

    this.addSql('alter table "blood_test_blood_stats" drop constraint "blood_test_blood_stats_blood_test_id_foreign";');

    this.addSql('alter table "medical_record" drop constraint "medical_record_supersonic_test_id_foreign";');

    this.addSql('drop table if exists "blood_type" cascade;');

    this.addSql('drop table if exists "blood_test" cascade;');

    this.addSql('drop table if exists "blood_test_blood_stats" cascade;');

    this.addSql('drop table if exists "supersonic_test" cascade;');

    this.addSql('alter table "medical_record" drop constraint "medical_record_blood_test_id_unique";');
    this.addSql('alter table "medical_record" drop constraint "medical_record_supersonic_test_id_unique";');
    this.addSql('alter table "medical_record" drop column "blood_test_id";');
    this.addSql('alter table "medical_record" drop column "supersonic_test_id";');
  }

}
