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
        React.DOM.header( {id:"header"}, 
          React.DOM.h1(null, "todos"),
          React.DOM.input(
          {ref:"newField",
          id:"new-todo",
          placeholder:"What needs to be done?",
          autoFocus:true,
          onKeyDown:this.handleNewTodoKeyDown}
          )
        );

      if (model.footerVisibility === true) {
        footer =
          TodoFooter(
          {model:model,
          onClearCompleted:this.clearCompleted}
          );
        
        todoItems = tasks.map(function (todo, i) {
          return (
            TodoItem(
            {key:todo.id,
            modelRef:tasksRef.appendIndex(i),
            model:todo,
            onDestroy:this.destroy.bind(this, i)}
            ));
        }, this);
        
        main =
          React.DOM.section( {id:"main"}, 
            React.DOM.input(
            {id:"toggle-all",
            type:"checkbox",
            checked:model.toggleAll,
            onChange:this.toggleAll}
            ),
            React.DOM.ul( {id:"todo-list"}, 
            todoItems
            )
          );
      }

      return (
        React.DOM.div(null, 
          header,
					main,
					footer
        )
        );
    }
  });
});
