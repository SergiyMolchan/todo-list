interface InterfaceTodo {
  id?: number,
  owner: number, // id of user
  title: string,
  completed: boolean,
  category: string
}

export default InterfaceTodo;
