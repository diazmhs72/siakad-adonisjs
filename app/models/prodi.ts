import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, belongsTo } from '@adonisjs/lucid/orm'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'
import Fakultas from '#models/fakultas'
import Mahasiswa from '#models/mahasiswa'
import Matakuliah from '#models/matakuliah'

export default class Prodi extends BaseModel {
  // Memberitahu AdonisJS bahwa primary key adalah string dan tidak auto-increment
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string // Primary key berupa string ('IF', 'EL', dll)

  @column()
  declare namaProdi: string

  @column()
  declare fakultasId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Fakultas)
  declare fakultas: BelongsTo<typeof Fakultas>

  @hasMany(() => Mahasiswa)
  declare mahasiswas: HasMany<typeof Mahasiswa>

  @hasMany(() => Matakuliah)
  declare matakuliahs: HasMany<typeof Matakuliah>
}
