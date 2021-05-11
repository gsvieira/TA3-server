'use strict'

const EagerLoad = require('@adonisjs/lucid/src/Lucid/EagerLoad')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Medicine = use('App/Models/Medicine')


/**
 * Resourceful controller for interacting with medicines
 */
class MedicineController {
  /**
   * Show a list of all medicines.
   * GET medicines
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const medicine = Medicine.query().with('images').fetch()

    return medicine
  }



  /**
   * Create/save a new medicine.
   * POST medicines
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ auth, request, response }) {
    const { id } = auth.user
    const data = request.only([
      'name',
      'posology',
      'frequency'
    ])

    const medicine = await Medicine.create({ ...data, user_id: id })

    return medicine
  }

  /**
   * Display a single medicine.
   * GET medicines/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const medicine = await Medicine.findOrFail(params.id)

    await medicine.load('images')

    return medicine
  }


  /**
   * Update medicine details.
   * PUT or PATCH medicines/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const medicine = await Medicine.findOrFail(params.id)
    const data = request.only([
      'name',
      'posology',
      'frequency'
    ])
    medicine.merge(data)
    await medicine.save()
    return medicine

  }

  /**
   * Delete a medicine with id.
   * DELETE medicines/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const medicine = await Medicine.findOrFail(params)

    if(medicine.user_id !== auth.user_id){
      return response.status(401).send({error: 'Not authorized'})
    }

    await medicine.delete()
  }
}

module.exports = MedicineController
