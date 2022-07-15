import { Migration } from '@mikro-orm/migrations';

export class Migration20220614083709 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "medical_stat" drop constraint "medical_stat_patient_id_foreign";');

    this.addSql('alter table "medical_stat" alter column "id" type int using ("id"::int);');
    this.addSql('alter table "medical_stat" alter column "value" type int using ("value"::int);');
    this.addSql('alter table "medical_stat" drop constraint "medical_stat_pkey";');
    this.addSql('alter table "medical_stat" alter column "id" drop default;');
    this.addSql('alter table "medical_stat" add constraint "medical_stat_patient_id_foreign" foreign key ("patient_id") references "patient" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "medical_stat" add constraint "medical_stat_pkey" primary key ("id", "patient_id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "medical_stat" drop constraint "medical_stat_patient_id_foreign";');

    this.addSql('alter table "medical_stat" alter column "id" type int using ("id"::int);');
    this.addSql('alter table "medical_stat" alter column "value" type varchar(255) using ("value"::varchar(255));');
    this.addSql('alter table "medical_stat" drop constraint "medical_stat_pkey";');
    this.addSql('create sequence if not exists "medical_stat_id_seq";');
    this.addSql('select setval(\'medical_stat_id_seq\', (select max("id") from "medical_stat"));');
    this.addSql('alter table "medical_stat" alter column "id" set default nextval(\'medical_stat_id_seq\');');
    this.addSql('alter table "medical_stat" add constraint "medical_stat_patient_id_foreign" foreign key ("patient_id") references "patient" ("id") on update cascade;');
    this.addSql('alter table "medical_stat" add constraint "medical_stat_pkey" primary key ("id");');
  }

}
