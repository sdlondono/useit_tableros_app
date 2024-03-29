import React, { Component } from 'react'
import { Text, View } from 'react-native'
import axios from 'axios'

let ideas = [];

export default class Idea extends Component {

    state = {
        user: [],
        idea: []
    }

    async componentWillMount() {
        console.log(this.props);

        await axios.get(`https://task-useit.herokuapp.com/api/usuario/`).then(res => {
            this.setState({ user: res.data })
        }).catch(err => console.log(err))


        this.state.user.map(async (user) => {
            await axios.get(`https://task-useit.herokuapp.com/api/idea/${user.id}/${this.props.tablero}`).then(res => {
                if (res.data.length > 0) {
                    ideas.push(res.data)
                    this.setState({ idea: ideas })
                    console.log(ideas)
                }
            }).catch((err) => console.log(err))
        })


    }

    render() {
        return (
            <View>
                {this.state.idea.map((val, index) => {
                    return val.map((idea, index) => {

                        return (
                            <View key={index} style={{ marginTop: 10 }}>
                                <Text style={{ fontSize: 12}}>Idea</Text>
                                <Text style={{ color: '#9f9f9f', fontSize: 20 }}>{idea.comment}</Text>
                            </View>
                        )
                    })
                })}
            </View>
        )
    }
}
