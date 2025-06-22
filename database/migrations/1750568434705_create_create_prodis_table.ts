import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'prodis'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      // Primary Key berupa string, bukan auto-increment
      table.string('id', 10).primary()
      table.string('nama_prodi').notNullable().unique()
      table
        .integer('fakultas_id')
        .unsigned()
        .references('id')
        .inTable('fakultas')
        .onDelete('CASCADE')
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }
  async down() {
    this.schema.dropTable(this.tableName)
  }
}
