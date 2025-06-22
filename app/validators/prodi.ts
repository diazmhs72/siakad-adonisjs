import vine from '@vinejs/vine'
export const prodiValidator = vine.compile(
  vine.object({
    id: vine
      .string()
      .trim()
      .minLength(2)
      .maxLength(10)
      .unique(async (db, value) => {
        const prodi = await db.from('prodis').where('id', value).first()
        return !prodi
      }),
    nama_prodi: vine.string().trim().minLength(5),
    fakultas_id: vine.number().exists(async (db, value) => {
      const fakultas = await db.from('fakultas').where('id', value).first()
      return !!fakultas
    }),
  })
)
export const prodiUpdateValidator = vine.compile(
  vine.object({
    nama_prodi: vine.string().trim().minLength(5),
    fakultas_id: vine.number().exists(async (db, value) => {
      const fakultas = await db.from('fakultas').where('id', value).first()
      return !!fakultas
    }),
  })
)
