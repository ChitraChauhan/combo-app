import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { saveTodo } from "../actions";

class TodoForm extends Component {
  onChange(e) {
    const { todo } = this.props;
    todo[e.target.name] = e.target.value;
    this.setState({ todo });
  }

  render() {
    return (
      <form onSubmit={e => this.props.saveTodo(e)}>
        <input
          type="text"
          name="title"
          value={this.props.todo.title}
          onChange={e => this.onChange(e)}
        />
        {this.props.todo.id ? <button>Update</button> : <button>Add</button>}
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todos,
    todo: state.todo
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      saveTodo: saveTodo
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoForm);
