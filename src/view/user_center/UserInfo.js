/**
 * Created with WebStorm 10.0
 * User：苏国均
 * Version：1.0.0
 * Date：16/8/1
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

import BaseActionBar from '../public/BaseActionBar';

class UserInfo extends Component {

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
                <BaseActionBar navigator={this.props.navigator} title={'我的'}/>
                <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>
                    Hello
                </Text>
                <TouchableHighlight onPress={() => this._onBackClick(this.props)}>
                    <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>
                        World!
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

export default UserInfo;
