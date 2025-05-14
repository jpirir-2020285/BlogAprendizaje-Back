import { body } from 'express-validator'
import { objectIdValid } from './db.validators.js'

export const addPost = [
    body('title', 'Title cannot be empty').notEmpty(),
    body('description', 'Description cannot be empty').notEmpty(),
    body('course', 'Course is required and must be one of the following: "TALLER", "PRACTICA", "TECNOLOGIA"').notEmpty()
]

export const updatePost = [
    body('title', 'Title cannot be empty').optional().notEmpty(),
    body('description', 'Description cannot be empty').optional().notEmpty(),
    body('course', 'Course is required and must be one of the following: "TALLER", "PRACTICA", "TECNOLOGIA"')
        .optional()
        .isIn(['Taller III', 'Practica Supervisada', 'Tecnologia III'])
]

export const addCommentary = [
    body('name', 'Name cannot be empty').notEmpty(),
    body('content', 'Content cannot be empty').notEmpty(),
    body('post', 'Post ID must be valid').notEmpty().custom(objectIdValid)
]

export const updateCommentary = [
    body('name', 'Name cannot be empty').optional().notEmpty(),
    body('content', 'Content cannot be empty').optional().notEmpty(),
    body('post', 'Post ID must be valid').optional().custom(objectIdValid)
]