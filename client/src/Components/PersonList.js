import axios from "axios"


import React, { Component } from 'react';

export default class PersonList extends Component {
    state = {
        persons: []
      }
    
      componentDidMount() {
        // axios.get(`https://jsonplaceholder.typicode.com/users`)
        axios.get(`https://ujevote.herokuapp.com/users`)
          .then(res => {
            const persons = res.data;
            this.setState({ persons });
          })
      }
    
    render() {
        return (
            <ul>
        { this.state.persons.map(person => <li>{person.name}</li>)}
      </ul>
        );
    }
}