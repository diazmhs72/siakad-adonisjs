import Matakuliah from '#models/matakuliah'
import { matakuliahValidator, matakuliahUpdateValidator } from '#validators/matakuliah'
export default class MatakuliahsController {
  async index({ view }: HttpContext) {
    const matakuliah_list = await Matakuliah.query().preload('prodi')
    return view.render('pages/matakuliah/index', { matakuliah_list })
  }
  async create({ view }: HttpContext) {
    const prodis = await Prodi.all()
    return view.render('pages/matakuliah/create', { prodis })
  }
  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(matakuliahValidator)

    // Generate kode otomatis
    const { prodi_id, semester_matakuliah } = payload
    const baseCode = `${prodi_id}${semester_matakuliah}`
    const count = await Matakuliah.query().where('kode', 'like', `${baseCode}%`).count('* as total')
    const nextNumber = String(Number(count[0].$extras.total) + 1).padStart(2, '0')
    const generatedCode = `${baseCode}${nextNumber}`

    await Matakuliah.create({ ...payload, kode: generatedCode })
    session.flash('notification', `Matakuliah berhasil dibuat dengan kode ${generatedCode}`)
    return response.redirect().toRoute('matakuliah.index')
  }

  async edit({ params, view }: HttpContext) {
    const matakuliah = await Matakuliah.findOrFail(params.id)
    return view.render('pages/matakuliah/edit', { matakuliah })
  }
  async update({ params, request, response, session }: HttpContext) {
    const payload = await request.validateUsing(matakuliahUpdateValidator)
    const matakuliah = await Matakuliah.findOrFail(params.id)
    matakuliah.merge(payload)
    await matakuliah.save()
    session.flash('notification', 'Matakuliah berhasil diperbarui!')
    return response.redirect().toRoute('matakuliah.index')
  }
  async destroy({ params, response, session }: HttpContext) {
    const matakuliah = await Matakuliah.findOrFail(params.id)
    await matakuliah.delete()
    session.flash('notification', 'Matakuliah berhasil dihapus!')
    return response.redirect().back()
  }
}
