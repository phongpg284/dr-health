import { Migration } from '@mikro-orm/migrations';

export class Migration20240213122217 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "medical_record" drop constraint "medical_record_device_record_id_foreign";');

    this.addSql('alter table "device_record" drop constraint "device_record_medical_record_id_foreign";');

    this.addSql('alter table "patient" alter column "code" type varchar(255) using ("code"::varchar(255));');
    this.addSql('alter table "patient" alter column "code" set default \'g0ylg7pq\';');

    this.addSql('alter table "medical_record" drop constraint "medical_record_device_record_id_unique";');
    this.addSql('alter table "medical_record" drop column "device_record_id";');

    this.addSql('alter table "device_record" drop constraint "device_record_medical_record_id_unique";');
    this.addSql('alter table "device_record" rename column "medical_record_id" to "patient_id";');
    this.addSql('alter table "device_record" add constraint "device_record_patient_id_foreign" foreign key ("patient_id") references "patient" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "device_record" drop constraint "device_record_patient_id_foreign";');

    this.addSql('alter table "device_record" rename column "patient_id" to "medical_record_id";');
    this.addSql('alter table "device_record" add constraint "device_record_medical_record_id_foreign" foreign key ("medical_record_id") references "medical_record" ("id") on update cascade on delete no action;');
    this.addSql('alter table "device_record" add constraint "device_record_medical_record_id_unique" unique ("medical_record_id");');

    this.addSql('alter table "medical_record" add column "device_record_id" int4 null default null;');
    this.addSql('alter table "medical_record" add constraint "medical_record_device_record_id_foreign" foreign key ("device_record_id") references "device_record" ("id") on update cascade on delete set null;');
    this.addSql('alter table "medical_record" add constraint "medical_record_device_record_id_unique" unique ("device_record_id");');

    this.addSql('alter table "patient" alter column "code" type varchar using ("code"::varchar);');
    this.addSql('alter table "patient" alter column "code" set default \'jje3h32e\';');
  }

}
