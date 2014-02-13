package io.ankor.tutorial.model;

import java.util.ArrayList;
import java.util.List;

public class TaskRepository {
    private List<Task> tasks = new ArrayList<Task>();

    public void saveTask(Task task) {

        int i = 0;
        for (Task t : tasks) {
            if (t.getId().equals(task.getId())) {
                tasks.set(i, new Task(task));
                return;
            }
            i++;
        }

        tasks.add(new Task(task));
    }

    public Task findTask(String id) {
        for (Task t : tasks) {
            if (t.getId().equals(id)) {
                return new Task(t);
            }
        }
        return null;
    }

    public List<Task> getTasks() {
        List<Task> res = new ArrayList<Task>(tasks.size());
        for(Task t : tasks) {
            res.add(new Task(t));
        }
        return res;
    }

    public List<Task> getActiveTasks() {
        List<Task> res = new ArrayList<Task>(tasks.size());
        for(Task t : tasks) {
            if (!t.isCompleted()) {
                res.add(new Task(t));
            }
        }
        return res;
    }

    public List<Task> getCompletedTasks() {
        List<Task> res = new ArrayList<Task>(tasks.size());
        for(Task t : tasks) {
            if (t.isCompleted()) {
                res.add(new Task(t));
            }
        }
        return res;
    }

    public void clearTasks() {
        tasks = getActiveTasks();
    }

    public void deleteTask(Task task) {
        int i = 0;
        for (Task t : tasks) {
            if (t.getId().equals(task.getId())) {
                tasks.remove(i);
                return;
            }
            i++;
        }
    }
}
