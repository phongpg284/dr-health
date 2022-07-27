import { Migration } from '@mikro-orm/migrations';

export class Migration20220727132148 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "appointment" drop constraint "appointment_schedule_id_foreign";');

    this.addSql('alter table "appointment" drop constraint "appointment_schedule_id_unique";');
    this.addSql('alter table "appointment" drop column "schedule_id";');

    this.addSql('alter table "schedule" drop constraint "schedule_appointment_id_unique";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "schedule" add constraint "schedule_appointment_id_unique" unique ("appointment_id");');

    this.addSql('alter table "appointment" add column "schedule_id" int not null;');
    this.addSql('alter table "appointment" add constraint "appointment_schedule_id_foreign" foreign key ("schedule_id") references "schedule" ("id") on update cascade;');
    this.addSql('alter table "appointment" add constraint "appointment_schedule_id_unique" unique ("schedule_id");');
  }

}
