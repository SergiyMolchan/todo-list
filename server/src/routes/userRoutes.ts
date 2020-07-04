import {Router} from "express";
import express = require('express');
import userController from "../controllers/userController";

const router = Router();

router.use(express.json());
router.use(express.urlencoded({extended: false}));

// registration routs
router.post('/registration', userController.registration);

// authorization routs
router.post('/authorization', userController.authorization);

export default router;
