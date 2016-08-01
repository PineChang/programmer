/**
 * Created with WebStorm 10.0
 * User：苏国均
 * Version：1.0.0
 * Date：16/8/1
 * Time：
 * Description：
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableHighlight,
    Picker,
} from 'react-native';


class UserInfo extends Component {

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>
                    Hello
                </Text>
                <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>
                    World!
                </Text>
            </View>
        );
    }
}

module.exports = UserInfo;
