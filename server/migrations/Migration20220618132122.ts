import { Migration } from '@mikro-orm/migrations';

export class Migration20220618132122 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "device" drop constraint "device_patient_id_foreign";');

    this.addSql('alter table "device" drop constraint "device_patient_id_unique";');
    this.addSql('alter table "device" drop column "patient_id";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "device" add column "patient_id" int null;');
    this.addSql('alter table "device" add constraint "device_patient_id_foreign" foreign key ("patient_id") references "patient" ("id") on update cascade on delete set null;');
    this.addSql('alter table "device" add constraint "device_patient_id_unique" unique ("patient_id");');
  }

}
