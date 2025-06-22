import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany, computed } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Prodi from '#models/prodi'
import Krs from '#models/krs'

export default class Mahasiswa extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nim: string

  @column()
  declare nama: string

  @column()
  declare prodiId: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Prodi)
  declare prodi: BelongsTo<typeof Prodi>

  @hasMany(() => Krs)
  declare krs: HasMany<typeof Krs>

  // Computed property untuk menghitung total SKS
  // Pastikan relasi krs dan matakuliah sudah di-preload sebelum mengakses ini
  @computed()
  get totalSks() {
    if (!this.krs) return 0
    return this.krs.reduce((total, krsItem) => {
      return total + (krsItem.matakuliah ? krsItem.matakuliah.sks : 0)
    }, 0)
  }
}
