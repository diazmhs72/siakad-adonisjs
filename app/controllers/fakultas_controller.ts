import Fakultas from '#models/fakultas'
import { fakultasValidator } from '#validators/fakultas'
export default class FakultasController {
  async index({ view }: HttpContext) {
    const fakultas_list = await Fakultas.all()
    return view.render('pages/fakultas/index', { fakultas_list })
  }
  async create({ view }: HttpContext) {
    return view.render('pages/fakultas/create')
  }
  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(fakultasValidator)
    await Fakultas.create(payload)
    session.flash('notification', 'Fakultas berhasil dibuat!')
    return response.redirect().toRoute('fakultas.index')
  }
  async edit({ params, view }: HttpContext) {
    const fakultas = await Fakultas.findOrFail(params.id)
    return view.render('pages/fakultas/edit', { fakultas })
  }
  async update({ params, request, response, session }: HttpContext) {
    const payload = await request.validateUsing(fakultasValidator, { meta: { id: params.id } })
    const fakultas = await Fakultas.findOrFail(params.id)
    fakultas.merge(payload)
    await fakultas.save()
    session.flash('notification', 'Fakultas berhasil diperbarui!')
    return response.redirect().toRoute('fakultas.index')
  }
  async destroy({ params, response, session }: HttpContext) {
    const fakultas = await Fakultas.findOrFail(params.id)
    await fakultas.delete()
    session.flash('notification', 'Fakultas berhasil dihapus!')
    return response.redirect().back()
  }
}
