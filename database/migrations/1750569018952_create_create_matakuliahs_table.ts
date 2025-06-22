import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'matakuliahs'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('prodi_id', 10).references('id').inTable('prodis').onDelete('CASCADE')
      table.string('kode', 20).notNullable().unique()
      table.string('nama_matakuliah').notNullable()
      table.integer('sks').notNullable()
      table.integer('semester_matakuliah').notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }
  async down() {
    this.schema.dropTable(this.tableName)
  }
}
