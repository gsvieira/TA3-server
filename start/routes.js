'use strict'

const UserController = require('../app/Controllers/Http/UserController')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/users', 'UserController.create')
Route.post('/sessions', 'SessionController.store')

Route.resource('medicine', 'MedicineController')
  .apiOnly()
  .middleware('auth')

Route.post('medicine/:id/images', 'ImageController.store').middleware('auth')
Route.get('images/:path', 'ImageController.show')
