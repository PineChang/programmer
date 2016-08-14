/**
 * Created with WebStorm 10.0
 * User：苏国均
 * Version：1.0.0
 * Date：16/8/10
 * Time：
 * Description：
 */



'use strict'; // 启用严格模式


import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} from 'react-native';

var Dimensions = require('Dimensions');


class BaseActionBar extends Component {

    // 构造
    constructor(props) {
        super(props);
        this.navigator = this.props.navigator;
    }

    render() {
        return (
            <View style={styles.titleView}>
                <TouchableHighlight onPress={this._backView.bind(this)}>
                    <Text style={[styles.titleText,{fontSize:15}]}>返回</Text>
                </TouchableHighlight>
                <Text style={styles.titleText}>{this.props.title}</Text>
                <Text style={styles.titleText}>...</Text>
            </View>
        );
    }


    _backView() {
        if (this.navigator) {
            this.navigator.pop();
        }
    }
}


const styles = StyleSheet.create({
    titleView: {
        padding: 8,
        width: Dimensions.get('window').width,
        alignItems: 'center',//子控件上下居中
        backgroundColor: '#F13D81',
        flexDirection: 'row',//子控件横向排列
        justifyContent: 'space-between',//子控件平均分配
        height:45
    },
    titleText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#FFFFFF',
        justifyContent: 'center',
    },
});

export default BaseActionBar;