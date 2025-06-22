import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { authValidator, loginValidator } from '#validators/auth'

export default class AuthController {
  // Menampilkan halaman register
  public async showRegister({ view }: HttpContext) {
    return view.render('pages/auth/register')
  }

  // Memproses data pendaftaran
  public async register({ request, response, auth, session }: HttpContext) {
    const payload = await request.validateUsing(authValidator)
    const user = await User.create(payload)
    await auth.use('web').login(user)
    session.flash('notification', {
      type: 'success',
      message: 'Registrasi berhasil! Selamat datang.',
    })
    return response.redirect().toRoute('dashboard')
  }

  // Menampilkan halaman login
  public async showLogin({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }

  // Memproses data login
  public async login({ request, response, auth, session }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)
    const user = await User.verifyCredentials(email, password)
    await auth.use('web').login(user)
    return response.redirect().toRoute('dashboard')
  }

  // Memproses logout
  public async logout({ response, auth }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect().toRoute('auth.showLogin')
  }
}
