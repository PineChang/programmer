/**
 * Created with WebStorm 10.0
 * User：苏国均
 * Version：1.0.0
 * Date：16/8/4
 * Time：
 * Description：
 */

'use strict'; // 启用严格模式


import React,{Component} from  'react';

import {
    StyleSheet,
    Text,
    View,
} from 'react-native';


class TransLateRecord extends React.Component {

    render() {
        return (<View>
            <TouchableOpacity
                style={styles.button}
                onPress={()=>this.props.navigator.pop()}>
                <Text style={styles.buttonText}>
                    {'跳转至第二页(右出)'}
                </Text>
            </TouchableOpacity>
        </View>);
    };
}

module.exports = TransLateRecord;

