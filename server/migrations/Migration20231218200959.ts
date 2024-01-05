import { Migration } from '@mikro-orm/migrations';

export class Migration20231218200959 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "patient" alter column "code" type varchar(255) using ("code"::varchar(255));');
    this.addSql('alter table "patient" alter column "code" set default \'djfn9gbk\';');

    this.addSql('alter table "medical_record" add column "urine_test_id" int not null;');
    this.addSql('alter table "medical_record" add constraint "medical_record_urine_test_id_foreign" foreign key ("urine_test_id") references "urine_test" ("id") on update cascade;');
    this.addSql('alter table "medical_record" add constraint "medical_record_urine_test_id_unique" unique ("urine_test_id");');

    this.addSql('alter table "urine_test" add column "medical_record_id" int not null, add column "patient_id_on_urine_device" varchar(255) not null, add column "glu_value" varchar(255) not null, add column "leu_value" varchar(255) not null, add column "nit_value" varchar(255) not null, add column "uro_value" varchar(255) not null, add column "pro_value" varchar(255) not null, add column "ph_value" varchar(255) not null, add column "bd_value" varchar(255) not null, add column "sg_value" varchar(255) not null, add column "ket_value" varchar(255) not null, add column "bill_value" varchar(255) not null;');
    this.addSql('alter table "urine_test" add constraint "urine_test_medical_record_id_foreign" foreign key ("medical_record_id") references "medical_record" ("id") on update cascade;');
    this.addSql('alter table "urine_test" drop column "identity";');
    this.addSql('alter table "urine_test" add constraint "urine_test_medical_record_id_unique" unique ("medical_record_id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "medical_record" drop constraint "medical_record_urine_test_id_foreign";');

    this.addSql('alter table "urine_test" drop constraint "urine_test_medical_record_id_foreign";');

    this.addSql('alter table "medical_record" drop constraint "medical_record_urine_test_id_unique";');
    this.addSql('alter table "medical_record" drop column "urine_test_id";');

    this.addSql('alter table "patient" alter column "code" type varchar using ("code"::varchar);');
    this.addSql('alter table "patient" alter column "code" set default \'xmcvihta\';');

    this.addSql('alter table "urine_test" add column "identity" varchar null default null;');
    this.addSql('alter table "urine_test" drop constraint "urine_test_medical_record_id_unique";');
    this.addSql('alter table "urine_test" drop column "medical_record_id";');
    this.addSql('alter table "urine_test" drop column "patient_id_on_urine_device";');
    this.addSql('alter table "urine_test" drop column "glu_value";');
    this.addSql('alter table "urine_test" drop column "leu_value";');
    this.addSql('alter table "urine_test" drop column "nit_value";');
    this.addSql('alter table "urine_test" drop column "uro_value";');
    this.addSql('alter table "urine_test" drop column "pro_value";');
    this.addSql('alter table "urine_test" drop column "ph_value";');
    this.addSql('alter table "urine_test" drop column "bd_value";');
    this.addSql('alter table "urine_test" drop column "sg_value";');
    this.addSql('alter table "urine_test" drop column "ket_value";');
    this.addSql('alter table "urine_test" drop column "bill_value";');
  }

}
