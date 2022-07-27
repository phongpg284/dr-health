import { Migration } from '@mikro-orm/migrations';

export class Migration20220727172939 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "notification" drop constraint "notification_appointment_id_unique";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "notification" add constraint "notification_appointment_id_unique" unique ("appointment_id");');
  }

}
