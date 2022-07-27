import { Migration } from '@mikro-orm/migrations';

export class Migration20220727165800 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "notification" add column "type" varchar(255) not null, add column "appointment_id" int null;');
    this.addSql('alter table "notification" add constraint "notification_appointment_id_foreign" foreign key ("appointment_id") references "appointment" ("id") on update cascade on delete set null;');
    this.addSql('alter table "notification" add constraint "notification_appointment_id_unique" unique ("appointment_id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "notification" drop constraint "notification_appointment_id_foreign";');

    this.addSql('alter table "notification" drop constraint "notification_appointment_id_unique";');
    this.addSql('alter table "notification" drop column "type";');
    this.addSql('alter table "notification" drop column "appointment_id";');
  }

}
