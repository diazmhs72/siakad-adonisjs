import Prodi from '#models/prodi'
import { prodiValidator, prodiUpdateValidator } from '#validators/prodi'
export default class ProdisController {
  async index({ view }: HttpContext) {
    const prodi_list = await Prodi.query().preload('fakultas')
    return view.render('pages/prodi/index', { prodi_list })
  }
  async create({ view }: HttpContext) {
    const fakultas_list = await Fakultas.all()
    return view.render('pages/prodi/create', { fakultas_list })
  }
  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(prodiValidator)
    await Prodi.create(payload)
    session.flash('notification', 'Prodi berhasil dibuat!')
    return response.redirect().toRoute('prodi.index')
  }
  async edit({ params, view }: HttpContext) {
    const prodi = await Prodi.findOrFail(params.id)
    const fakultas_list = await Fakultas.all()
    return view.render('pages/prodi/edit', { prodi, fakultas_list })
  }
  async update({ params, request, response, session }: HttpContext) {
    const payload = await request.validateUsing(prodiUpdateValidator)
    const prodi = await Prodi.findOrFail(params.id)
    prodi.merge(payload)
    await prodi.save()
    session.flash('notification', 'Prodi berhasil diperbarui!')
    return response.redirect().toRoute('prodi.index')
  }
  async destroy({ params, response, session }: HttpContext) {
    const prodi = await Prodi.findOrFail(params.id)
    await prodi.delete()
    session.flash('notification', 'Prodi berhasil dihapus!')
    return response.redirect().back()
  }
}
