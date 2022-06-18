import { Migration } from '@mikro-orm/migrations';

export class Migration20220618125900 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "device" drop constraint "device_patient_id_foreign";');

    this.addSql('alter table "device" alter column "patient_id" type int using ("patient_id"::int);');
    this.addSql('alter table "device" alter column "patient_id" drop not null;');
    this.addSql('alter table "device" add constraint "device_patient_id_foreign" foreign key ("patient_id") references "patient" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "device" drop constraint "device_patient_id_foreign";');

    this.addSql('alter table "device" alter column "patient_id" type int using ("patient_id"::int);');
    this.addSql('alter table "device" alter column "patient_id" set not null;');
    this.addSql('alter table "device" add constraint "device_patient_id_foreign" foreign key ("patient_id") references "patient" ("id") on update cascade;');
  }

}
