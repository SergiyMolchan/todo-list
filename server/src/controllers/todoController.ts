import {Request, Response} from 'express';
import {getTodo, createTodo, updateTodo, removeTodo} from '../models/todoModel'
import InterfaceTodo from "../interfaces/interfaceTodo";
import InterfaceUser from "../interfaces/interfaceUser";

class todoController {

  // get task list
  async get(req: Request, res: Response) {
    try {
      // @ts-ignore
      const owner = req.user.id;
      const todoList = await getTodo({owner});
      res.status(200).json({succes: true, todoList: todoList});
    } catch (error) {
      res.status(404).json({error: error.message});
    }
  }

  // create new task
  async create(req: Request, res: Response) {
    try {
      // @ts-ignore
      const owner = req.user.id;
      const {title, category} = req.body;
      const newTodo: InterfaceTodo = {
        owner: owner,
        title: title,
        completed: false,
        category: category || 'all'
      };
      // creat item in list of task then return list of task
      const todoList = await createTodo(newTodo).then(async () => {
        return await getTodo({owner});
      });
      res.status(200).json({succes: true, todoList: todoList});
    } catch (error) {
      res.status(404).json({error: error.message});
    }
  }

  // update task
  async update(req: Request, res: Response) {
    try {
      // @ts-ignore
      const owner = req.user.id;
      const {id, title, completed, category} = req.body;
      const updatedTodo: InterfaceTodo = {
        id: id,
        owner: owner,
        title: title,
        completed: completed,
        category: category || 'all'
      };
      const todoList = await updateTodo(updatedTodo).then(async () => {
        return await getTodo({owner});
      });
      res.status(200).json({succes: true, todoList: todoList});
    } catch (error) {
      res.status(404).json({error: error.message});
    }
  }

  // remove task
  async remove(req: Request, res: Response) {
    try {
      // @ts-ignore
      const owner = req.user.id;
      const {id} = req.body;
      const todoList = await removeTodo({id: id}).then(async () => {
        return await getTodo({owner});
      });
      res.status(200).json({succes: true, todoList: todoList});
    } catch (error) {
      res.status(404).json({error: error.message});
    }
  }
}

export default new todoController();
