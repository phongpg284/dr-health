import { Migration } from '@mikro-orm/migrations';

export class Migration20240213065943 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "patient" alter column "code" type varchar(255) using ("code"::varchar(255));');
    this.addSql('alter table "patient" alter column "code" set default \'jje3h32e\';');
  }

  async down(): Promise<void> {
    this.addSql('alter table "patient" alter column "code" type varchar using ("code"::varchar);');
    this.addSql('alter table "patient" alter column "code" set default \'djfn9gbk\';');
  }

}
