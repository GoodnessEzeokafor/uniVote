import axios from "axios"


import React, { Component } from 'react';

export default class PersonList extends Component {
    state = {
        persons: []
      }
    
      componentDidMount() {
        // axios.get(`https://jsonplaceholder.typicode.com/users`)
        axios.get(`/users`)
          .then(res => {
            const persons = res.data.userdetails;
            this.setState({ persons });
          })
      }
    
    render() {
      console.log(this.state.persons)
        return (
            <ul>
                {this.state.persons.map((person,key) => {
                  return(
                  <li>{person.email}</li>
                  )
                })}
</ul>
        );
    }
}