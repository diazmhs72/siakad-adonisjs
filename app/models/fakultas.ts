import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Prodi from '#models/prodi'

export default class Fakultas extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare namaFakultas: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Prodi)
  declare prodis: HasMany<typeof Prodi>
}
