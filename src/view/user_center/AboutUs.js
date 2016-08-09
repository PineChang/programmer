/**
 * Created with WebStorm 10.0
 * User：苏国均
 * Version：1.0.0
 * Date：16/8/9
 * Time：
 * Description：
 */




'use strict'; // 启用严格模式


import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableHighlight,
    Animated,
    Picker,
} from 'react-native';


class AboutUs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            progressValue: new Animated.Value(0)
        };
        var nav = this.props.navigator;
        console.log('UserInfo  nav:' + nav);
    }

    _onBackClick(props) {
        const {navigator} = this.props;
        if (props.navigator) {
            props.navigator.pop();
        } else {
            console.log('navigator is ' + props.navigator);
        }
        return true;
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>
                    Hello
                </Text>
                <TouchableHighlight onPress={() => this._onBackClick(this.props)}>
                    <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>
                        关于我们
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

export default AboutUs;