import { Component, h, State, Prop } from '@stencil/core';
import { TaskService } from '../../services/task-service';

@Component({
  tag: 'task-form',
  styleUrl: 'task-form.css',
  shadow: true
})
export class TaskForm {
  @State() title: string = '';
  @State() description: string = '';
  @State() status: string = 'pendiente'; // Default status
  @Prop() taskId?: number;  // Optional prop to edit an existing task

  async componentWillLoad() {
    if (this.taskId) {
      const task = await TaskService.getTaskById(this.taskId);
      this.title = task.title;
      this.description = task.description;
      this.status = task.status;
    }
  }

  async handleSubmit(event: Event) {
    event.preventDefault();
    const newTask = { title: this.title, description: this.description, status: this.status };
    try {
      if (this.taskId) {
        await TaskService.updateTask(this.taskId, newTask);
      } else {
        await TaskService.createTask(newTask);
      }
      this.title = '';
      this.description = '';
      this.status = 'pendiente'; // Reset to default status
      // Optionally, trigger a refresh of tasks or redirect
    } catch (error) {
      console.error('Error saving task:', error);
    }
  }

  handleTitleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.title = input.value;
  }

  handleDescriptionInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.description = input.value;
  }

  handleStatusChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.status = select.value;
  }

  render() {
    return (
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <label>
          Title:
          <input
            type="text"
            value={this.title}
            onInput={(event) => this.handleTitleInput(event)}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={this.description}
            onInput={(event) => this.handleDescriptionInput(event)}
          />
        </label>
        <label>
          Status:
          <select onInput={(event) => this.handleStatusChange(event)}>
            <option value="pendiente">Pendiente</option>
            <option value="progreso">Progreso</option>
            <option value="completado">Completado</option>
          </select>
        </label>
        <button type="submit">{this.taskId ? 'Update Task' : 'Add Task'}</button>
      </form>
    );
  }
}
