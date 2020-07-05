import {Router} from "express";
import express = require('express');
import todoController from '../controllers/todoController';
import passport from "passport";

const router = Router();

router.use(express.json());
router.use(express.urlencoded({extended: false}));

//get list tasks
router.get('/', passport.authenticate('jwt', {session: false}), todoController.get);

// create new task
router.post('/', passport.authenticate('jwt', {session: false}), todoController.create);

// update task
router.put('/', passport.authenticate('jwt', {session: false}), todoController.update);

// delete task
router.delete('/', passport.authenticate('jwt', {session: false}), todoController.remove);

export default router;
