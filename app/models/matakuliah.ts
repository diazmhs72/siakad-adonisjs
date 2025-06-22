import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Prodi from '#models/prodi'

export default class Matakuliah extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare prodiId: string

  @column()
  declare kode: string

  @column()
  declare namaMatakuliah: string

  @column()
  declare sks: number

  @column()
  declare semesterMatakuliah: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Prodi)
  declare prodi: BelongsTo<typeof Prodi>
}
