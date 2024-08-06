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
          <p>Loading...</p>
        ) : (
          <div>
            {this.editingTask ? (
              <form onSubmit={(event) => { event.preventDefault(); this.updateTask(); }}>
                <h2>Edit Task</h2>
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
              <ul>
                {this.tasks.map(task => (
                  <li key={task.id}>
                    {task.title} - {task.description}
                    <button onClick={() => this.deleteTask(task.id)}>Delete</button>
                    <button onClick={() => this.startEditing(task)}>Edit</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    );
  }
}
