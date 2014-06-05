/**
 * @jsx React.DOM
 */
define([
  "react",
  "build/filter"
], function (React, FILTER) {
  return React.createClass({
    render: function () {

      var model = this.props.model;

      var clearButton;
      if (model.clearButtonVisibility) {
        clearButton =
          <button
          id="clear-completed"
          onClick={this.props.onClearCompleted}>
        {model.itemsCompleteText}
          </button>
      }

      var cx = React.addons.classSet;
      var filter = model.filter;
      var filterAll = cx({selected: filter === FILTER.ALL});
      var filterActive = cx({selected: filter === FILTER.ACTIVE});
      var filterCompleted = cx({selected: filter === FILTER.COMPLETED});

      return (
        <footer id="footer">
          <span id="todo-count">
            <strong>{model.itemsLeft}</strong> {model.itemsLeftText}
          </span>
          <ul id="filters">
            <li>
              <a href="#/" className={filterAll}>All</a>
            </li>
            {' '}
            <li>
              <a href="#/active" className={filterActive}>Active</a>
            </li>
            {' '}
            <li>
              <a href="#/completed" className={filterCompleted}>Completed</a>
            </li>
          </ul>
          {clearButton}
        </footer>);
    }
  });
});