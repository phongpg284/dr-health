import { Migration } from '@mikro-orm/migrations';

export class Migration20220614064629 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "medical_stat" drop constraint "medical_stat_medical_record_id_foreign";');

    this.addSql('alter table "medical_stat" rename column "medical_record_id" to "patient_id";');
    this.addSql('alter table "medical_stat" add constraint "medical_stat_patient_id_foreign" foreign key ("patient_id") references "patient" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "medical_stat" drop constraint "medical_stat_patient_id_foreign";');

    this.addSql('alter table "medical_stat" rename column "patient_id" to "medical_record_id";');
    this.addSql('alter table "medical_stat" add constraint "medical_stat_medical_record_id_foreign" foreign key ("medical_record_id") references "medical_record" ("id") on update cascade;');
  }

}
