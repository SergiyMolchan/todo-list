import {Request, Response} from 'express';
import {getTodo, createTodo, updateTodo, removeTodo} from '../models/todoModel'
import InterfaceTodo from "../interfaces/interfaceTodo";

class todoController {

  // get task list
  async get(req: Request, res: Response) {
    try {
      const todoList = await getTodo({owner: 1});
      res.status(200).json({succes: true, todoList: todoList});
    } catch (error) {
      res.status(404).json({error: error.message});
    }
  }

  // create new task
  async create(req: Request, res: Response) {
    try {
      const newTodo: InterfaceTodo = {
        owner: 1,
        title: 'title',
        completed: false,
        category: 'all'
      };
      // creat item in list of task then return list of task
      const todoList = await createTodo(newTodo).then(async () => {
        return await getTodo({owner: newTodo.owner})
      });
      res.status(200).json({succes: true, todoList: todoList});
    } catch (error) {
      res.status(404).json({error: error.message});
    }
  }

  // update task
  async update(req: Request, res: Response) {
    try {
      const updatedTodo: InterfaceTodo = {
        id: 2,
        owner: 1,
        title: 'title Updated',
        completed: false,
        category: 'all'
      };
      const todoList = await updateTodo(updatedTodo).then(async () => {
        return await getTodo({owner: updatedTodo.owner})
      });
      res.status(200).json({succes: true, todoList: todoList});
    } catch (error) {
      res.status(404).json({error: error.message});
    }
  }

  // remove task
  async remove(req: Request, res: Response) {
    try {
      const id = 3;
      const todoList = await removeTodo({id: id});
      res.status(200).json({succes: true, todoList: todoList});
    } catch (error) {
      res.status(404).json({error: error.message});
    }
  }
}

export default new todoController();
