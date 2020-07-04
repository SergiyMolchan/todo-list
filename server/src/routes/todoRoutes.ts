import {Router} from "express";
import express = require('express');
import todoController from '../controllers/todoController';

const router = Router();

router.use(express.json());
router.use(express.urlencoded({extended: false}));

//get list tasks
router.get('/', todoController.get);

// create new task
router.post('/', todoController.create);

// update task
router.put('/', todoController.update);

// delete task
router.delete('/', todoController.remove);

export default router;
