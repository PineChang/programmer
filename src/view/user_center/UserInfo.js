/**
 * Created with WebStorm 10.0
 * User：苏国均
 * Version：1.0.0
 * Date：16/8/1
 * Time：
 * Description：
 */


'use strict'; // 启用严格模式


import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableHighlight,
    NativeModules,
} from 'react-native';

var {height, width} = Dimensions.get('window');

import BaseActionBar from '../public/BaseActionBar';

class UserInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            joinDate: '',
            programmerCount: '',
        };
        var nav = this.props.navigator;
        console.log('UserInfo  nav:' + nav);
        var thisObject = this;
        NativeModules.User.getUser.bind(this)(function (user) {
            // console.log('UserInfo  nav:' + user);
            var jsonUser = JSON.parse(user);
            console.log('UserInfo  jsonUser:' + thisObject.getDateDiff(jsonUser.createdAt));
            thisObject.setState({
                userId: jsonUser.objectId,
                joinDate: thisObject.getDateDiff(jsonUser.createdAt),
            });
        });
    }

    getDateDiff(startDate) {
        var startTime = new Date(Date.parse(startDate)).getTime();
        // var endTime = new Date(Date.parse(endDate.replace(/-/g, "/"))).getTime();
        console.log('startTime:' + startTime);
        var dates = parseInt(Math.abs((startTime - new Date())) / (1000 * 60 * 60 * 24));
        return dates;
    }

    render() {
        return (
            <View style={{flex: 1,}}>
                <BaseActionBar navigator={this.props.navigator} title={'我的'}/>
                <View style={styles.header}>
                    <Image style={{width: width / 4, height: width / 4, borderRadius: width / 4}}
                           source={require('../../img/favicon.png')}
                    />
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemText}>
                        {'欢迎您:' + this.state.userId}
                    </Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemText}>
                        {'您已经加入云翻译' + this.state.joinDate + '天'}
                    </Text>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    header: {
        width: width,
        height: width / 2,
        backgroundColor: '#99CC66',
        alignItems: 'center',//子控件水平居中
        justifyContent: 'center',//子控件垂直居中
    },
    item: {
        margin: 8,
        padding: 5,
        borderRadius: 5,
        backgroundColor: '#CCCC00',
    },
    itemText:{
        margin: 10,
        fontSize: 15,
        color:'#FFFFFF',
    },

});

export default UserInfo;
