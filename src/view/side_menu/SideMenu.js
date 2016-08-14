/**
 * Created with WebStorm 10.0
 * User：苏国均
 * Version：1.0.0
 * Date：16/8/9
 * Time：
 * Description：
 */

'use strict'; // 启用严格模式


import React from 'react';

import {
    StyleSheet,
    Text,
    View,
    Navigator,
    TextInput,
    Platform,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    NativeModules,
} from 'react-native';

var Dimensions, {height, width} = require('Dimensions');

import UserInfo from '../user_center/UserInfo';
import UserLogin from '../user_center/UserLogin';
import AboutUs from '../user_center/AboutUs';
import TranslationRecord from '../translate/TransLateRecord';

class SideMenu extends React.Component {

    //var nav;
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.navigator = this.props.navigator;
    }

    render() {
        return (
            <View style={styles.sideView}>
                <View style={styles.sideHeader}>
                    <Text style={{flex: 1}}></Text>
                    <Text style={{color: '#FFFFFF', fontSize: 15}}>云翻译</Text>
                    <Text style={{color: '#FFFFFF', fontSize: 10}}>Version:0.1.0</Text>
                    <Text style={{color: '#FFFFFF', fontSize: 10, marginBottom: 20}}>————————————————</Text>
                </View>
                <View style={styles.sideContent}>
                    <Menu navigator={this.props.navigator}
                          closeDrawer={this.props.closeDrawer}
                    />
                </View>
            </View>);
    }


}


class Menu extends React.Component {
    constructor(props) {
        super(props);
        // 初始状态
        this.navigator = this.props.navigator;
    }

    render() {
        return (<View>

            <TouchableHighlight style={styles.sideTouchAble} onPress={() => this._onIndexClick(this.props)}>
                <Text style={[styles.sideMenu, {fontSize: 18}]}>
                    首页
                </Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.sideTouchAble} onPress={() => this._onUserInfoClick(this.props)}>
                <Text style={styles.sideMenu}>
                    我的资料
                </Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.sideTouchAble} onPress={() => this._transLateRecordClick(this.props)}>
                <Text style={styles.sideMenu}>
                    翻译记录
                </Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.sideTouchAble} onPress={() => this._aboutUsClick(this.props)}>
                <Text style={styles.sideMenu}>
                    关于我们
                </Text>
            </TouchableHighlight>
        </View>);
    }


    _onUserInfoClick(props) {
        this.props.closeDrawer();
        // NativeModules.User.getUser(function (user) {
        //     console.log('user:' + user);
        // });
        NativeModules.User.isLogin(function (isLogin) {
            console.log('isLogin:' + isLogin);
            var component;
            if (isLogin) {
                component = UserInfo;
            } else {
                component = UserLogin;
            }
            props.navigator.push({
                name: 'UserInfo',
                component: component
            });
        });
    }

    _onIndexClick(props) {
        this.props.closeDrawer();
    }

    _transLateRecordClick(props) {
        this.props.closeDrawer();
        if (props.navigator) {
            props.navigator.push({
                name: 'TranslationRecord',
                component: TranslationRecord
            })
        }
    }

    _aboutUsClick(props) {
        this.props.closeDrawer();
        if (props.navigator) {
            props.navigator.push({
                name: 'AboutUs',
                component: AboutUs
            })
        }
    }

}


const styles = StyleSheet.create({
    //Side style start
    sideView: {
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    sideHeader: {
        backgroundColor: '#F13D81',
        flexDirection: 'column',
        height: 150,
        alignItems: 'center'
    },
    sideContent: {
        flex: 1,
        flexDirection: 'column',
        height: height,
        padding: 5,
        justifyContent: 'space-between',
        borderBottomColor: '#E9724C',
        borderBottomWidth: 2
    },
    sideTouchAble: {
        flex: 1,
        //alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFC857',
        margin: 3,
        padding: 15,
        borderRadius: 5,
    },
    sideMenu: {
        color: '#F8F4E3',
        fontSize: 15,
    }
    //Side style end
});

export default SideMenu;