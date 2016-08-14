/**
 * Created with WebStorm 10.0
 * User：苏国均
 * Version：1.0.0
 * Date：2016/8/14.
 * Time：
 * Description：
 */

import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    TextInput,
    NativeModules,
    Dimensions,
    ToastAndroid,
} from 'react-native';
var {height, width} = Dimensions.get('window');

import BaseActionBar from '../public/BaseActionBar';

class UserLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            verify: '',
        };
        var nav = this.props.navigator;
        console.log('UserLogin  nav:' + nav);
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center',}}>
                <BaseActionBar navigator={this.props.navigator} title={'登陆'}/>
                <View style={styles.content}>
                    <TextInput style={{width: width - 60,}}
                               onChangeText={(phone) => this.setState({phone})}
                               value={this.state.phone}
                               placeholder='请输入手机号'
                    />
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
                        <TextInput style={{flex: 1}}
                                   onChangeText={(verify) => this.setState({verify})}
                                   value={this.state.verify}
                                   placeholder='短信验证码'
                        />
                        <TouchableHighlight style={styles.buttonPadding} onPress={() => this.sendVerify(this.props)}>
                            <Text style={styles.button}>获取验证码</Text>
                        </TouchableHighlight>
                    </View>
                    <TouchableHighlight style={styles.buttonPadding} onPress={() => this.doLogin(this.props)}>
                        <Text style={styles.button}>
                            登陆
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

    sendVerify() {
        var phone = this.state.phone;
        console.log('phone:' + phone);
        if (phone && phone.length == 11) {
            NativeModules.User.sendVerify(
                phone,
                function (error) {
                    console.log('error:' + error);
                    ToastAndroid.show('error:' + error, ToastAndroid.LONG);
                },
                function () {
                    ToastAndroid.show('验证码发送成功...', ToastAndroid.LONG);
                }
            );
        } else {
            ToastAndroid.show('手机号有误', ToastAndroid.LONG);
        }
    }

    doLogin() {
        var phone = this.state.phone;
        var verify = this.state.verify;
        console.log('phone:' + phone);
        console.log('verifyCode:' + verify);
        var thisObject = this;
        if (phone && phone.length == 11 && verify) {
            NativeModules.User.verifyCode(
                phone,
                verify,
                function (error) {
                    ToastAndroid.show('error:' + error, ToastAndroid.LONG);
                    // thisObject.props.navigator.pop();
                },
                function () {
                    ToastAndroid.show('登陆成功...', ToastAndroid.LONG);
                    thisObject.props.navigator.pop();
                }
            );
        } else {
            ToastAndroid.show('手机号有误', ToastAndroid.LONG);
        }
    }
}


var styles = StyleSheet.create({
    content: {
        marginTop: 100,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 8,
        borderWidth: 5,
        padding: 10,
        borderColor: '#F13D81',
    },
    button: {
        textAlign: 'center',
        fontSize: 15,
        color: '#FFFFFF',
        fontWeight: '600',
    },
    buttonPadding: {
        padding: 8,
        borderRadius: 10,
        backgroundColor: '#F13D81',
        alignItems: 'center',//子控件上下居中
        justifyContent: 'center',
        margin: 5,
    }


});


export default UserLogin;