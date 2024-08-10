import { Component, h, State } from '@stencil/core';
import { TaskService } from '../../services/task-service';

@Component({
  tag: 'task-list',
  styleUrl: 'task-list.css',
  shadow: true
})
export class TaskList {
  @State() tasks: any[] = [];
  @State() loading: boolean = true;
  @State() editingTask: any = null;
  @State() title: string = '';
  @State() description: string = '';
  @State() status: string = 'pendiente';
  @State() statusOptions = ['pendiente', 'progreso', 'completado'];

  async componentDidLoad() {
    console.log('Component did load');
    await this.loadTasks();
  }

  async loadTasks() {
    this.loading = true;
    console.log('Loading tasks...');
    try {
      const tasks = await TaskService.getAllTasks();
      console.log('Tasks loaded:', tasks);
      this.tasks = tasks;
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      this.loading = false;
    }
  }

  async deleteTask(id: number) {
    console.log('Deleting task with id:', id);
    try {
      await TaskService.deleteTask(id);
      await this.loadTasks();  // Reload tasks after deletion
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }

  handleInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this[input.name] = input.value;
  }

  async updateTask() {
    const taskData = {
      title: this.title,
      description: this.description,
      status: this.status
    };
    console.log('Updating task with data:', taskData);

    try {
      await TaskService.updateTask(this.editingTask.id, taskData);
      this.editingTask = null;
      this.title = '';
      this.description = '';
      this.status = 'pendiente';
      await this.loadTasks();  // Recargar tareas después de la actualización
    } catch (error) {
      console.error('Error updating task:', error);
    }
  }

  startEditing(task: any) {
    this.editingTask = task;
    this.title = task.title;
    this.description = task.description;
    this.status = task.status;
  }

  cancelEditing() {
    this.editingTask = null;
    this.title = '';
    this.description = '';
    this.status = 'pendiente';
  }

  render() {
    return (
      <div>
        {this.loading ? (
          <p>cargando...</p>
        ) : (
          <div>
            {this.editingTask ? (
              <form onSubmit={(event) => { event.preventDefault(); this.updateTask(); }}>
                <h2>Editar Tarea</h2>
                <label>
                  Title:
                  <input
                    type="text"
                    name="title"
                    value={this.title}
                    onInput={(event) => this.handleInputChange(event)}
                  />
                </label>
                <label>
                  Description:
                  <input
                    type="text"
                    name="description"
                    value={this.description}
                    onInput={(event) => this.handleInputChange(event)}
                  />
                </label>
                <label>
                  Status:
                  <select
                    name="status"
                    onInput={(event) => this.handleInputChange(event)}
                  >
                    {this.statusOptions.map(option => (
                      <option value={option}>{option}</option>
                    ))}
                  </select>
                </label>
                <button type="submit">Update Task</button>
                <button type="button" onClick={() => this.cancelEditing()}>Cancel</button>
              </form>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.tasks.map(task => (
                    <tr key={task.id}>
                      <td>{task.title}</td>
                      <td>{task.description}</td>
                      <td>{task.status}</td>
                      <td>
                        <button class="icon-button" onClick={() => this.startEditing(task)}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 17.25v3.75h3.75L17.663 10.837l-3.75-3.75L3 17.25zm4.5-2.25h4.5v-4.5H7.5v4.5zm7.5-7.5l3.75 3.75-4.5 4.5h-4.5V9h4.5V7.5h2.25z" fill="#000"/>
                          </svg>
                        </button>
                        <button class="icon-button" onClick={() => this.deleteTask(task.id)}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 6h18v2H3V6zm0 4h18v12H3V10zm12 8H9v-2h6v2zm0-4H9v-2h6v2z" fill="#000"/>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    );
  }
}
