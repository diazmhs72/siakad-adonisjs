import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'mahasiswas'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nim').notNullable().unique()
      table.string('nama').notNullable()
      table.string('prodi_id', 10).references('id').inTable('prodis').onDelete('CASCADE')
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }
  async down() {
    this.schema.dropTable(this.tableName)
  }
}
