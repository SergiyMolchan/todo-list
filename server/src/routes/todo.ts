import {Router} from "express";
import express = require('express');
import {get, create, update, remove} from '../controllers/todo';

const router = Router();

router.use(express.json());
router.use(express.urlencoded({extended: false}));

//get list tasks
router.get('/', get);

// create new task
router.post('/', create);

// update task
router.put('/:id', update);

// delete task
router.delete('/:id', remove);

export default router;
