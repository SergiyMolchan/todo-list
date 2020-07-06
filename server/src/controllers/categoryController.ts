import {Request, Response} from 'express';
import {getCategory, createCategory, removeCategory} from '../models/categoryModel';
import InterfaceCategory from "../interfaces/interfaceCategory";

class categoryController {

  // get category list
  async get(req: Request, res: Response) {
    try {
      // @ts-ignore
      const owner = req.user.id;
      const categoryList = await getCategory({owner});
      res.status(200).json({succes: true, categoryList});
    } catch (error) {
      res.status(404).json({error: error.message});
    }
  }

  // create new category
  async create(req: Request, res: Response) {
    try {
      // @ts-ignore
      const owner = req.user.id;
      const {title} = req.body;
      const newCategory: InterfaceCategory = {title, owner};
      const categoryList = await createCategory(newCategory).then(async () => {
        return await getCategory({owner});
      });
      res.status(200).json({succes: true, categoryList});
    } catch (error) {
      res.status(404).json({error: error.message});
    }
  }

  // remove category
  async remove(req: Request, res: Response) {
    try {
      // @ts-ignore
      const owner = req.user.id;
      const {id} = req.body;
      const categoryList = await removeCategory({id}).then(async () => {
        return await getCategory({owner});
      });
      res.status(200).json({succes: true, categoryList});
    } catch (error) {
      res.status(404).json({error: error.message});
    }
  }
}

export default new categoryController();
