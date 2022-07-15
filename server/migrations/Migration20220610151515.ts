import { Migration } from '@mikro-orm/migrations';

export class Migration20220610151515 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "medical_record" drop constraint "medical_record_patient_id_unique";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "medical_record" add constraint "medical_record_patient_id_unique" unique ("patient_id");');
  }

}
