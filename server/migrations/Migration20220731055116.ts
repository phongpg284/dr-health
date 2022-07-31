import { Migration } from '@mikro-orm/migrations';

export class Migration20220731055116 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "blood_test_blood_stats" drop constraint "blood_test_blood_stats_blood_type_id_foreign";');

    this.addSql('create table "role" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "description" varchar(255) not null);');

    this.addSql('create table "permission" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "code" varchar(255) not null, "description" varchar(255) not null, "role_id" int not null);');

    this.addSql('create table "blood_test_stat" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "value" int not null);');

    this.addSql('create table "blood_stat" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "unit" varchar(255) not null, "blood_test_stat_id" int not null);');

    this.addSql('alter table "permission" add constraint "permission_role_id_foreign" foreign key ("role_id") references "role" ("id") on update cascade;');

    this.addSql('alter table "blood_stat" add constraint "blood_stat_blood_test_stat_id_foreign" foreign key ("blood_test_stat_id") references "blood_test_stat" ("id") on update cascade;');

    this.addSql('drop table if exists "blood_type" cascade;');

    this.addSql('drop table if exists "blood_test_blood_stats" cascade;');

    this.addSql('alter table "blood_test" add column "blood_test_stat_id" int not null;');
    this.addSql('alter table "blood_test" add constraint "blood_test_blood_test_stat_id_foreign" foreign key ("blood_test_stat_id") references "blood_test_stat" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "permission" drop constraint "permission_role_id_foreign";');

    this.addSql('alter table "blood_stat" drop constraint "blood_stat_blood_test_stat_id_foreign";');

    this.addSql('alter table "blood_test" drop constraint "blood_test_blood_test_stat_id_foreign";');

    this.addSql('create table "blood_type" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');

    this.addSql('create table "blood_test_blood_stats" ("blood_test_id" int not null, "blood_type_id" int not null);');
    this.addSql('alter table "blood_test_blood_stats" add constraint "blood_test_blood_stats_pkey" primary key ("blood_test_id", "blood_type_id");');

    this.addSql('alter table "blood_test_blood_stats" add constraint "blood_test_blood_stats_blood_test_id_foreign" foreign key ("blood_test_id") references "blood_test" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "blood_test_blood_stats" add constraint "blood_test_blood_stats_blood_type_id_foreign" foreign key ("blood_type_id") references "blood_type" ("id") on update cascade on delete cascade;');

    this.addSql('drop table if exists "role" cascade;');

    this.addSql('drop table if exists "permission" cascade;');

    this.addSql('drop table if exists "blood_test_stat" cascade;');

    this.addSql('drop table if exists "blood_stat" cascade;');

    this.addSql('alter table "blood_test" drop column "blood_test_stat_id";');
  }

}
