/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Container, Header, Content, Text, Left, Body, Title, Right, Card, CardItem, View } from 'native-base';
import axios from 'axios';

import Idea from './src/component/Idea'

export default class App extends Component {


  state = {
    tablero: [],
    user: [],
    idea: [],
    message: []
  }

  async componentWillMount() {

    // Get all tableros
    await axios.get("https://task-useit.herokuapp.com/api/tablero/").then(res => {
      this.setState({ tablero: res.data })
    }).catch(err => {
      console.log(err);
    })


  }

  onTableros = () => {

    const data = (this.state.tablero.length > 0) ? this.state.tablero : null;


    if (data != null) {

      return data.map((tablero, index) => {

        if (!tablero.state) {
          return (
            <Card key={index} style={{ backgroundColor: '#5eb1d8', padding: 3}} noShadow  >
              <CardItem header style={{ backgroundColor: 'transparent'}}>
                <Text style={{ color: 'white'}}>{tablero.nombre}</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Idea tablero={tablero.id}/>
                </Body>
              </CardItem>
            </Card>
          )
        }


      })

    }

  }

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: 'white'}}>
          <Left />
          <Body>
            <Title style={{ color: 'black'}}>Tableros</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <ScrollView>

            {this.onTableros()}

          </ScrollView>

        </Content>
      </Container>
    );
  }
}


