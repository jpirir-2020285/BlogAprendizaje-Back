'use strict'

import mongoose from 'mongoose'

const commentarySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    content: {
        type: String,
        required: [true, 'El contenido es obligatorio']
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: [true, 'El post asociado es obligatorio']
    },
    date: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Commentary', commentarySchema)