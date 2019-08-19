import React, {Component} from 'react';
import { View,Button,TextInput } from 'react-native';
import axios from 'axios'


export default class Translator extends React.Component {
    static navigationOptions = ({ navigation }) => ({
		title: (navigation.state.params || {}).name || 'Test Button'
    });

    constructor(props) {
        super(props);
        this.state = {
             text: '',
            translatedText: ""
    };
      }

    onPressLearnMore =  ()=>{
        console.log(this.state.text);
        axios.post('http://localhost:3000/',
        {
            text:this.state.text
        })
    .then(data => {
      this.setState({translatedText: data.data.data.translations[0].translatedText})
      console.log(data.data.data.translations[0].translatedText)
    }).catch(err => {
      console.log('error')
    })
      }
    
    render() {
		console.log("works")
		return (
			<View> 
                <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        placeholder = {"write smth..."}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
                <Button
            onPress={this.onPressLearnMore}
                 title="Ryba"
                 color="#841584"
  
/>

            </View>
		);
	}

}

