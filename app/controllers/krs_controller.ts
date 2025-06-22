import Krs from '#models/krs'
export default class KrsController {
  async index({ view, auth }: HttpContext) {
    // Logika untuk menampilkan halaman utama KRS
    let mahasiswa_list = []
    if (auth.user?.role !== 'mahasiswa') {
      mahasiswa_list = await Mahasiswa.all()
    }
    return view.render('pages/krs/index', { mahasiswa_list })
  }

  // Endpoint API untuk mengambil matakuliah secara dinamis
  async getMatakuliah({ request, response }: HttpContext) {
    const { mahasiswaId, semester } = request.qs()
    if (!mahasiswaId || !semester) return response.badRequest('mahasiswaId dan semester diperlukan')

    const mahasiswa = await Mahasiswa.find(mahasiswaId)
    if (!mahasiswa) return response.notFound('Mahasiswa tidak ditemukan')

    const isGenap = Number(semester) % 2 === 0
    const query = Matakuliah.query()

    if (isGenap) {
      query.whereRaw('semester_matakuliah % 2 = 0')
    } else {
      query.whereRaw('semester_matakuliah % 2 != 0')
    }

    const existingMatakuliahIds = await Krs.query()
      .where('mahasiswa_id', mahasiswaId)
      .where('semester', semester)
      .select('matakuliah_id')
    const ids = existingMatakuliahIds.map((k) => k.matakuliahId)

    const matakuliahs = await query.where('prodi_id', mahasiswa.prodiId).whereNotIn('id', ids)
    const currentKrs = await Krs.query()
      .where('mahasiswa_id', mahasiswaId)
      .where('semester', semester)
      .preload('matakuliah')

    return response.ok({ matakuliahs, currentKrs })
  }

  // Menyimpan banyak KRS sekaligus
  async bulkStore({ request, response, session }: HttpContext) {
    const { mahasiswa_id, semester, selectedMatakuliahs } = request.only([
      'mahasiswa_id',
      'semester',
      'selectedMatakuliahs',
    ])

    const matakuliahsToTake = await Matakuliah.query().whereIn('id', selectedMatakuliahs)
    const sksAkanDiambil = matakuliahsToTake.reduce((sum, mk) => sum + mk.sks, 0)

    const krsSaatIni = await Krs.query()
      .where('mahasiswa_id', mahasiswa_id)
      .where('semester', semester)
      .preload('matakuliah')
    const totalSksSaatIni = krsSaatIni.reduce((sum, krs) => sum + krs.matakuliah.sks, 0)

    if (totalSksSaatIni + sksAkanDiambil > 24) {
      session.flash('error', 'Gagal! Total SKS akan melebihi 24.')
      return response.redirect().back()
    }

    const payload = selectedMatakuliahs.map((mkId: number) => ({
      mahasiswaId: mahasiswa_id,
      matakuliahId: mkId,
      semester: semester,
    }))
    await Krs.createMany(payload)

    session.flash('notification', `${payload.length} matakuliah berhasil ditambahkan.`)
    return response.redirect().back()
  }

  // Menghapus satu item KRS
  async destroy({ params, response, session }: HttpContext) {
    const krs = await Krs.findOrFail(params.id)
    await krs.delete()
    session.flash('notification', 'Matakuliah berhasil dihapus dari KRS.')
    return response.redirect().back()
  }
}
