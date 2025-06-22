import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'krs'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('mahasiswa_id')
        .unsigned()
        .references('id')
        .inTable('mahasiswas')
        .onDelete('CASCADE')
      table
        .integer('matakuliah_id')
        .unsigned()
        .references('id')
        .inTable('matakuliahs')
        .onDelete('CASCADE')
      table.integer('semester').notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }
  async down() {
    this.schema.dropTable(this.tableName)
  }
}
