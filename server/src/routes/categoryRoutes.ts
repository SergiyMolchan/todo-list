import {Router} from "express";
import express = require('express');
import passport from "passport";
import categoryController from '../controllers/categoryController'

const router = Router();

router.use(express.json());
router.use(express.urlencoded({extended: false}));

//get list tasks
router.get('/', passport.authenticate('jwt', {session: false}), categoryController.get);

// create new task
router.post('/', passport.authenticate('jwt', {session: false}), categoryController.create);

// delete task
router.delete('/', passport.authenticate('jwt', {session: false}), categoryController.remove);

export default router;
