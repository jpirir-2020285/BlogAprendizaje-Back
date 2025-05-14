'use strict'

import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'El título es obligatorio']
    },
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    course: {
        type: String,
        required: [true, 'El curso asociado es obligatorio'],
        enum: ['TALLER', 'PRACTICA', 'TECNOLOGIA']
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Post', postSchema)