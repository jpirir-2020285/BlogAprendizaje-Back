import { Router } from 'express'
import { save, getAll, getById, update, eliminate } from './comment.controller.js'
import { addCommentary, updateCommentary } from '../../helpers/validators.js'

const router = Router()

router.post(
    '/',
    [addCommentary], // Puedes agregar tus validaciones personalizadas aquí
    save
)

router.get(
    '/', 
    getAll
)

router.get(
    '/:id', 
    getById
)

router.put(
    '/:id',
    [updateCommentary], // Validación para actualizar el comentario
    update
)

router.delete(
    '/:id',
    eliminate
)

export default router
