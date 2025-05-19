import { Router } from 'express'
import { save, getAll, getById, update, eliminate, getPostsByYear, getPostsByCourse } from './post.controller.js'
import { addPost, updatePost } from '../../helpers/validators.js'

const router = Router()

router.post(
    '/',
    [addPost], 
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
    [updatePost], // Validación para actualizar el post
    update
)

router.delete(
    '/:id',
    eliminate
)

router.get(
    '/course/:course', 
    getPostsByCourse
)

router.get(
    '/year/:year', 
    getPostsByYear
)


export default router
