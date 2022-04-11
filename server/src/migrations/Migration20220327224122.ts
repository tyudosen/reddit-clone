import { Migration } from '@mikro-orm/migrations';

export class Migration20220327224122 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" drop constraint "user_user_name_unique";');
    this.addSql('alter table "user" rename column "user_name" to "username";');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop constraint "user_username_unique";');
    this.addSql('alter table "user" rename column "username" to "user_name";');
    this.addSql('alter table "user" add constraint "user_user_name_unique" unique ("user_name");');
  }

}
