/**
 * @jsx React.DOM
 */
define([
  "react",
  "build/todoFooter",
  "build/todoItem",
  "build/keys",
  "director",
  "build/filter"
], function (React, TodoFooter, TodoItem, KEYS, Router, FILTER) {
  return React.createClass({
    
    componentDidMount: function () {
      var filterRef = this.props.modelRef.appendPath("filter");
        
      var setFilter = function (value) {
        filterRef.setValue(value);
      };
      
      var router = Router({
        '/': setFilter.bind(this, FILTER.ALL),
        '/active': setFilter.bind(this, FILTER.ACTIVE),
        '/completed': setFilter.bind(this, FILTER.COMPLETED)
      });
      
      router.init('/');
    },

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
