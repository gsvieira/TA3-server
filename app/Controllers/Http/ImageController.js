'use strict'

const Medicine = use('App/Models/Medicine')
const Helpers = use('Helpers')

class ImageController {
    /**
     * Create/save a new image.
     * POST images
     */
     async store ({ params, request }) {
        const medicine = await Medicine.findOrFail(params.id)
      
        const images = request.file('image', {
          types: ['image'],
          size: '2mb'
        })
      
        await images.moveAll(Helpers.tmpPath('uploads'), file => ({
          name: `${Date.now()}-${file.clientName}`
        }))
      
        if (!images.movedAll()) {
          return images.errors()
        }
      
        await Promise.all(
          images
            .movedList()
            .map(image => medicine.images().create({ path: image.fileName }))
        )
      }

      async show ({ params, response }) {
        return response.download(Helpers.tmpPath(`uploads/${params.path}`))

      }



}

module.exports = ImageController
