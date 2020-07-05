import {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import InterfaceUser from "../interfaces/interfaceUser";
import {createUser, getUser} from '../models/userModel';
import config from "../utils/config";

class userController {

  // registration new user
  async registration(req: Request, res: Response) {
    try {
      const {login, password, confirmPassword}: InterfaceUser = req.body;
      const candidate = await getUser({login, password});

      // validation user data
      if(!login || login.length < 6) { // is enter login
        res.status(409).json({success: false, message: 'Enter your login.'});
      } else if (candidate) { // is login frees
        res.status(409).json({success: false, message: "Login is already taken."});
      } else if (!password || password.length < 6) { // is enter password
        res.status(409).json({success: false, message: "Enter your password more 6 symbols."});
      } else if (password !== confirmPassword) { // repeat password
        res.status(409).json({success: false, message: "Passwords must be identical."});
      } else {
        const salt = bcrypt.genSaltSync(7);
        await createUser({login, password: bcrypt.hashSync(password.trim(), salt)});
        res.status(200).json({succes: true, message: 'Registered.'});
      }
    } catch (error) {
      res.status(404).json({error: error.message});
    }
  }

  // authorization for user
  async authorization(req: Request, res: Response) {
    try {
      const {login, password}: InterfaceUser = req.body;
      // @ts-ignore
      const candidate: InterfaceUser | undefined = await getUser({login, password});
      const timeLifeOfToken = 60 * 60 * 24; // time life of token 1 day
      if(candidate){
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
        if(passwordResult){
          let token: string;
          token = jwt.sign({
            id: candidate.id,
            login: candidate.login
          }, config.jwt, {expiresIn: timeLifeOfToken});
          res.status(200).json({succes: true, token: `Bearer ${token}`, timeLifeOfToken: timeLifeOfToken});
        } else {
          res.status(401).json({succes: false, message: "Invalid password."});
        }
      } else {
        res.status(404).json({succes: false, message: "User is not found."});
      }
    } catch (error) {
      res.status(404).json({succes: false, error: error.message});
    }
  }

}

export default new userController();
