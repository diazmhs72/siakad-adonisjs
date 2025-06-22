import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Mahasiswa from '#models/mahasiswa'
import Matakuliah from '#models/matakuliah'

export default class Krs extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare mahasiswaId: number

  @column()
  declare matakuliahId: number

  @column()
  declare semester: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Mahasiswa)
  declare mahasiswa: BelongsTo<typeof Mahasiswa>

  @belongsTo(() => Matakuliah)
  declare matakuliah: BelongsTo<typeof Matakuliah>
}

// app/models/user.ts
// Pastikan model User Anda terlihat seperti ini (dibuat otomatis oleh auth)
import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  // Anda bisa menambahkan kolom role di sini jika diperlukan
  // @column()
  // declare role: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
