const API_URL = 'http://localhost:3000/api/tasks';

export class TaskService {
  static async getAllTasks() {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch tasks');
    return response.json();
  }

  static async getTaskById(id: number) {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch task');
    return response.json();
  }

  static async createTask(task: { title: string; description: string; status: string }) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    });
    if (!response.ok) throw new Error('Failed to create task');
    return response.json();
  }
  static async updateTask(id: number, task: { title: string; description: string; status: string }) {
    console.log('Sending JSON to update task:', { id, ...task });  
    console.log('Sending JSON to update task:', {...task });// Ver el JSON en la consola
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    });
    if (!response.ok) throw new Error('Failed to update task');
    return response.json();
  }
  

  static async deleteTask(id: number) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete task');
    return response.json();
  }
}
