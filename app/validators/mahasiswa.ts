import vine from '@vinejs/vine'
export const mahasiswaValidator = vine.compile(
  vine.object({
    nim: vine
      .string()
      .minLength(8)
      .unique(async (db, value) => !(await db.from('mahasiswas').where('nim', value).first())),
    nama: vine.string().minLength(3),
    prodi_id: vine
      .string()
      .exists(async (db, value) => !!(await db.from('prodis').where('id', value).first())),
  })
)
export const mahasiswaUpdateValidator = vine.compile(
  vine.object({
    nama: vine.string().minLength(3),
    prodi_id: vine
      .string()
      .exists(async (db, value) => !!(await db.from('prodis').where('id', value).first())),
  })
)
