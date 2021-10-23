import React, { Component } from "react"
import { 
  Button, 
  Form, 
  FormGroup, 
  Col, 
  Label, 
  Input, 
  FormText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading..",
      newTask: '',
      //state property for opening/closing modal
      modal: false,
      //state property to hold item of the list id
      activateItemId: '',
      //state property to hold item of the list name
      activateItemName: ''
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
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(newTask)
    })
    this.componentDidMount()
  }

  editTask = (id) => {
    const newTask = { task: this.state.newTask}
    fetch("api/toDos/" + id + "/", {
      credentials: 'include',
      method: 'PUT',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(newTask)
    })
    this.componentDidMount()
    this.closeModal()
  }

  //Open modal and pass the state of the items in the to Do's list
  openModal = (toDos) => {
    this.setState(() => {
      return { 
        modal: true,
        activateItemId: toDos.id,
        activateItemName: toDos.task
      };
    });
  }

  //Close modal
  closeModal = () => {
    this.setState(() => {
      return { 
        modal: false
      };
    });
  }

  render() {
    return (
      <div>
        <Form>
          <FormText>To-Do List</FormText>
          {this.state.data.map((toDos, index) => {
            return (
              <FormGroup check>
                <Label id={toDos.id} key={index} check>
                  <Input type="checkbox" id="checkbox2" />{' '}
                  {toDos.task}
                </Label>   
                <a 
                  href='#' 
                  id={toDos.id}
                  onClick={() => this.openModal(toDos)}
                  className='alert-link'
                >
                  Edit
                </a>
                <Modal 
                  isOpen={this.state.modal}
                  itemId={this.state.activateItemId}
                  itemName={this.state.activateItemName} 
                  toggle={this.closeModal}
                >
                  <ModalHeader>Edit your task: {this.state.activateItemName} </ModalHeader>
                  <ModalBody>
                    <Input 
                      name="edit-input" 
                      id="edit-input"  
                      placeholder="Choose a new name"
                      onChange={this.handleChange} 
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={() => this.editTask(this.state.activateItemId)}>
                      Save
                    </Button>
                    <Button onClick={this.closeModal}>Cancel</Button>
                  </ModalFooter>
                </Modal>
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
