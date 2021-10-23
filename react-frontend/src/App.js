import React, { Component } from "react"
import { 
  Button, 
  Form, 
  FormGroup, 
  Col, 
  Label, 
  Input, 
  FormText 
} from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading..",
      newTask: ''
    };
  }

  async componentDidMount() {
    fetch("api/toDos")
      .then(response => {
        if (response.status > 400) {
          return this.setState(() => {
            return { placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      .then(data => {
        this.setState(() => {
          return {
            data,
            loaded: true
          };
        });
      });
  }

  handleChange = (e) => {
    this.setState({ newTask: e.target.value })
  }

  addTask = () => {
    const newTask = { task: this.state.newTask, completed: false}
    fetch("api/toDos/", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(newTask)
    })
    fetch("api/toDos")
      .then(response => response.json())
      .then(data => {
        this.setState(() => {
          return {
            data,
            loaded: true
          };
        });
      });
  }

  render() {
    return (
      <div>
        <Form>
          <FormText>To-Do List</FormText>
          {this.state.data.map(toDos => {
            return (
              <FormGroup check>
                <Label key={toDos.id} check>
                  <Input type="checkbox" id="checkbox2" />{' '}
                  {toDos.task}
                </Label>   
                <a href='#' className='alert-link'>Edit</a>
              </FormGroup> 
            );
          })}
          <FormGroup row>
            <Input 
              name="task-input" 
              id="task-input" 
              sm={10} 
              placeholder="Add a new task"
              onChange={this.handleChange} 
            />
            <Col sm={2}>
              <Button onClick={this.addTask}>Add</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default App;
