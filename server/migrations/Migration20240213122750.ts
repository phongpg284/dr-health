import { Migration } from '@mikro-orm/migrations';

export class Migration20240213122750 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "device_record" add column "heart_beat_bpm" int not null, add column "oxygen_percent" int not null;');
    this.addSql('alter table "device_record" drop column "heart_rate_bpm";');
    this.addSql('alter table "device_record" drop column "spo2_percentage";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "device_record" add column "heart_rate_bpm" int not null, add column "spo2_percentage" int not null;');
    this.addSql('alter table "device_record" drop column "heart_beat_bpm";');
    this.addSql('alter table "device_record" drop column "oxygen_percent";');
  }

}
