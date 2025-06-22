import Mahasiswa from '#models/mahasiswa'
import { mahasiswaValidator, mahasiswaUpdateValidator } from '#validators/mahasiswa'
export default class MahasiswasController {
  async index({ view, request }: HttpContext) {
    const { fakultas, semester } = request.qs()

    const query = Mahasiswa.query()
      .preload('prodi', (prodiQuery) => {
        prodiQuery.preload('fakultas')
      })
      .preload('krs', (krsQuery) => krsQuery.preload('matakuliah'))

    if (fakultas) {
      query.whereHas('prodi', (builder) => builder.where('fakultas_id', fakultas))
    }
    if (semester) {
      query.whereHas('krs', (builder) => builder.where('semester', semester))
    }

    const mahasiswa_list = await query.orderBy('nama', 'asc')
    const fakultas_list = await Fakultas.all()
    return view.render('pages/mahasiswa/index', { mahasiswa_list, fakultas_list })
  }

  async create({ view }: HttpContext) {
    const prodi_list = await Prodi.all()
    return view.render('pages/mahasiswa/create', { prodi_list })
  }

  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(mahasiswaValidator)
    await Mahasiswa.create(payload)
    session.flash('notification', 'Mahasiswa berhasil ditambahkan!')
    return response.redirect().toRoute('mahasiswa.index')
  }

  async edit({ params, view }: HttpContext) {
    const mahasiswa = await Mahasiswa.findOrFail(params.id)
    const prodi_list = await Prodi.all()
    await mahasiswa.load('prodi')
    return view.render('pages/mahasiswa/edit', { mahasiswa, prodi_list })
  }

  async update({ params, request, response, session }: HttpContext) {
    const payload = await request.validateUsing(mahasiswaUpdateValidator)
    const mahasiswa = await Mahasiswa.findOrFail(params.id)
    mahasiswa.merge(payload)
    await mahasiswa.save()
    session.flash('notification', 'Data mahasiswa berhasil diperbarui!')
    return response.redirect().toRoute('mahasiswa.index')
  }

  async destroy({ params, response, session }: HttpContext) {
    const mahasiswa = await Mahasiswa.findOrFail(params.id)
    await mahasiswa.delete()
    session.flash('notification', 'Data mahasiswa berhasil dihapus!')
    return response.redirect().back()
  }
}
