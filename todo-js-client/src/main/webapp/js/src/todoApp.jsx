/**
 * @jsx React.DOM
 */
define([
  "react",
  "build/todoFooter",
  "build/todoItem",
  "build/keys"
], function (React, TodoFooter, TodoItem, KEYS) {
  return React.createClass({

    handleNewTodoKeyDown: function (event) {
      if (event.which === KEYS.ENTER_KEY) {
        var node = this.refs.newField.getDOMNode();
        var val = node.value.trim();
        if (val !== '') {
          this.props.modelRef.fire("newTask", {title: val});
          node.value = '';
        }
      }
    },

    toggleAll: function () {
      var modelRef = this.props.modelRef;
      var model = modelRef.getValue();
      modelRef.fire("toggleAll", {toggleAll: !model.toggleAll});
    },

    destroy: function (i) {
      this.props.modelRef.fire("deleteTask", {index: i});
    },

    clearCompleted: function () {
      this.props.modelRef.fire("clearTasks");
    },

    render: function () {
      var header, main, footer, todoItems;

      var model = this.props.modelRef.getValue();
      var tasks = model.tasks;
      var tasksRef = this.props.modelRef.appendPath("tasks");

      header =
        <header id="header">
          <h1>todos</h1>
          <input
          ref="newField"
          id="new-todo"
          placeholder="What needs to be done?"
          autoFocus={true}
          onKeyDown={this.handleNewTodoKeyDown}
          />
        </header>;

      if (model.footerVisibility === true) {
        footer =
          <TodoFooter
          model={model}
          onClearCompleted={this.clearCompleted}
          />;

        todoItems = tasks.map(function (todo, i) {
          return (
            <TodoItem
            key={todo.id}
            modelRef={tasksRef.appendIndex(i)}
            model={todo}
            onDestroy={this.destroy.bind(this, i)}
            />);
        }, this);

        main =
          <section id="main">
            <input
            id="toggle-all"
            type="checkbox"
            checked={model.toggleAll}
            onChange={this.toggleAll}
            />
            <ul id="todo-list">
            {todoItems}
            </ul>
          </section>;
      }

      return (
        <div>
          {header}
					{main}
					{footer}
        </div>
        );
    }
  });
});
