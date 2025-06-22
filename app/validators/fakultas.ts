import vine from '@vinejs/vine'
export const fakultasValidator = vine.compile(
  vine.object({
    nama_fakultas: vine
      .string()
      .trim()
      .minLength(5)
      .unique(async (db, value, field) => {
        const fakultas = await db
          .from('fakultas')
          .where('nama_fakultas', value)
          .whereNot('id', field.meta.id)
          .first()
        return !fakultas
      }),
  })
)
