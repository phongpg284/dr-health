import { Migration } from '@mikro-orm/migrations';

export class Migration20220627165554 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "address" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "location" varchar(255) null, "ward" varchar(255) null, "ward_code" int null, "district" varchar(255) null, "district_code" int null, "province" varchar(255) null, "province_code" int null);');

    this.addSql('alter table "user" add column "address_id" int null;');
    this.addSql('alter table "user" add constraint "user_address_id_foreign" foreign key ("address_id") references "address" ("id") on update cascade on delete set null;');
    this.addSql('alter table "user" drop column "address";');
    this.addSql('alter table "user" drop column "ward";');
    this.addSql('alter table "user" drop column "district";');
    this.addSql('alter table "user" drop column "province";');
    this.addSql('alter table "user" add constraint "user_address_id_unique" unique ("address_id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop constraint "user_address_id_foreign";');

    this.addSql('drop table if exists "address" cascade;');

    this.addSql('alter table "user" add column "address" varchar(255) null, add column "district" int null, add column "province" int null;');
    this.addSql('alter table "user" drop constraint "user_address_id_unique";');
    this.addSql('alter table "user" rename column "address_id" to "ward";');
  }

}
