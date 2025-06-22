import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

// Import semua controller yang kita butuhkan
const AuthController = () => import('#controllers/auth_controller')
const FakultasController = () => import('#controllers/fakultas_controller')
const ProdisController = () => import('#controllers/prodis_controller')
const MatakuliahsController = () => import('#controllers/matakuliahs_controller')
const MahasiswasController = () => import('#controllers/mahasiswas_controller')
const KrsController = () => import('#controllers/krs_controller')
const DashboardController = () => import('#controllers/dashboard_controller')

// --- Rute untuk Tamu (Guest) ---
// Pengguna yang sudah login akan otomatis diarahkan ke dashboard
router
  .group(() => {
    // Rute untuk menampilkan halaman
    router.get('/register', [AuthController, 'showRegister']).as('auth.showRegister')
    router.get('/login', [AuthController, 'showLogin']).as('auth.showLogin')

    // Rute untuk memproses data form
    router.post('/register', [AuthController, 'register']).as('auth.register')
    router.post('/login', [AuthController, 'login']).as('auth.login')
  })
  .use(middleware.guest())

// --- Rute untuk Pengguna yang Sudah Login ---
router
  .group(() => {
    // Rute Logout
    router.post('/logout', [AuthController, 'logout']).as('auth.logout')

    // Rute Dashboard
    router.get('/dashboard', [DashboardController, 'index']).as('dashboard')

    // Rute CRUD menggunakan `router.resource`. Ini akan otomatis membuat
    // rute untuk index, create, store, show, edit, update, dan destroy.
    router.resource('fakultas', FakultasController)
    router.resource('prodi', ProdisController)
    router.resource('matakuliah', MatakuliahsController)
    router.resource('mahasiswa', MahasiswasController)

    // Rute Khusus untuk KRS
    router.get('/krs', [KrsController, 'index']).as('krs.index')
    router.post('/krs', [KrsController, 'bulkStore']).as('krs.store')
    router.delete('/krs/:id', [KrsController, 'destroy']).as('krs.destroy')

    // Rute API untuk mengambil data matakuliah secara dinamis
    router
      .get('/api/krs/get-matakuliah', [KrsController, 'getMatakuliah'])
      .as('api.krs.getMatakuliah')
  })
  .use(middleware.auth()) // Melindungi semua rute di dalam grup ini

// Rute halaman awal akan mengarahkan ke dashboard
router.on('/').redirect('/dashboard')
