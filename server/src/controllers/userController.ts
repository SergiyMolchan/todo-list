import {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import InterfaceUser from "../interfaces/interfaceUser";
import {createUser, getUser} from '../models/userModel';

class userController {

  // registration new user
  async registration(req: Request, res: Response) {
    try {
      //const newUser: InterfaceUser = {login: 'debilko', password: '123456', confirmPassword: '123456'};
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
      res.status(200).json({succes: true});
    } catch (error) {
      res.status(404).json({error: error.message});
    }
  }

}

export default new userController();
