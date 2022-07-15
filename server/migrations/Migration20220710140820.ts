import { Migration } from '@mikro-orm/migrations';

export class Migration20220710140820 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "appointment" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "patient_id" int not null, "doctor_id" int not null, "name" varchar(255) not null default \'Meeting\', "date" timestamptz(0) not null, "link" varchar(255) not null, "duration" int not null);');

    this.addSql('alter table "appointment" add constraint "appointment_patient_id_foreign" foreign key ("patient_id") references "patient" ("id") on update cascade;');
    this.addSql('alter table "appointment" add constraint "appointment_doctor_id_foreign" foreign key ("doctor_id") references "doctor" ("id") on update cascade;');

    this.addSql('alter table "medical_stat" add column "second_value" varchar(255) null;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "appointment" cascade;');

    this.addSql('alter table "medical_stat" drop column "second_value";');
  }

}
