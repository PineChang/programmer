/**
 * Created with WebStrom 10.0
 * User：苏国均
 * Version：1.0.0
 * Date：16/7/26
 * Time：
 * Description：
 */

import React from 'react';
var Dimensions = require('Dimensions');

import Sider from './view/side_menu/sider';


//这里实在是迫不得已，在navigationView里面的this指针都会转向Drawer
var __navigator = null;

import {
    StyleSheet,
    Text,
    View,
    DrawerLayoutAndroid,
    TextInput,
    Button,
    TouchableHighlight
} from 'react-native';


class Root extends React.Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
        __navigator = this.props.navigator;
    }

    getValue(text) {
        var value = text;
        this.setState({
            show: true,
            input: value
        });
        console.log("text-->" + text);

        var url = "http://fanyi.youdao.com/openapi.do?keyfrom=programmer&key=32622806&type=data&doctype=json&version=1.1&q=" + text;
        console.log("URL-->" + url);

        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            console.log("response:" + JSON.stringify(response));
            return response.json();
        }).then(function (responseText) {
            console.log("responseText:" + JSON.stringify(responseText));
        });
    }

    navigationView() {
        return (
            <Sider navi={__navigator}/>
        );
    }

    render() {
        return (
            <DrawerLayoutAndroid drawerWidth={300}
                                 drawerPosition={DrawerLayoutAndroid.positions.Left}
                                 renderNavigationView={(()=>{return this.navigationView})()}>
                <View style={styles.flexContainer}>
                    <TextInput
                        style={styles.input}
                        multiline={true}
                        placeholder="请输入搜索关键字"
                        onChangeText={(text) => this.getValue(text)}
                    />
                    <Text style={styles.input}>
                        {'翻译结果:' + this.state.input}</Text>
                    <View>
                        <TouchableButton
                            underlayColor='#4169e1'
                            style={styles.style_view_button}
                            onPress={this._handlePress}
                            text='登录有点击效果'>
                        </TouchableButton>
                    </View>
                </View>
            </DrawerLayoutAndroid>
        );
    }

    _handlePress(event) {
        console.log('Pressed!-->' + this.state.input);


    }
}


class TouchableButton extends React.Component {
    render() {
        return (
            <TouchableHighlight
                underlayColor={this.props.underlayColor}
                activeOpacity={0.5}
                style={this.props.style}
                onPress={this.props.onPress}>
                <Text style={{fontSize:16,color:'#fff'}}>{this.props.text}
                </Text>
            </TouchableHighlight>
        );
    }
}


const styles = StyleSheet.create({
    flexContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        borderBottomColor: '#000000',
        borderBottomWidth: 1
    },
    input: {
        flex: 5,
        width: Dimensions.get('window').width - 20,
        margin: 10,
        height: Dimensions.get('window').height * (2 / 5) - 20,
        borderColor: 'gray',
        borderWidth: 1
    },
    button: {
        flex: 1,
        height: 100,
        backgroundColor: 'gray'
    }
});

export default Root;