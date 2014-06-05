/**
 * @jsx React.DOM
 */
define([
  "react",
  "build/todoFooter",
  "build/todoItem"
], function (React, TodoFooter, TodoItem) {
  return React.createClass({
    
    handleNewTodoKeyDown: function (event) {
      // TODO
    },
    
    toggleAll: function () {
      // TODO
    },

    destroy: function (i) {
      // TODO
    },

    clearCompleted: function () {
      // TODO
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
