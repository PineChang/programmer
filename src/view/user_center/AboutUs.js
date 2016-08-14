/**
 * Created with WebStorm 10.0
 * User：苏国均
 * Version：1.0.0
 * Date：16/8/9
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
    TouchableHighlight,
    Linking,
    TouchableOpacity,
} from 'react-native';

import BaseActionBar from '../public/BaseActionBar';

class AboutUs extends Component {

    constructor(props) {
        super(props);
        var nav = this.props.navigator;
        console.log('UserInfo  nav:' + nav);
    }

    render() {
        return (
            <View style={{flex: 1,}}>
                <BaseActionBar navigator={this.props.navigator} title={'关于我们'}/>
                <View style={{
                    backgroundColor: '#99CC66',
                    borderRadius: 15,
                    borderColor: '#3B5998',
                    margin: 5,
                }}>
                    <Text style={styles.headerText}>
                        试图打造一个码农专用的开源翻译工具，期待有志同道合的人一起实现这个梦想。
                        应用移动端采用的React-Native技术完成，服务端使用的是LeanCloud提供的服务，云引擎采用Node.js实现.
                    </Text>
                </View>
                <OpenURLButton style={{marginTop:60}} url={'https://github.com/eesc88'}
                               message={'Email:cceecc@sina.cn'}
                />
                <OpenURLButton url={'https://github.com/eesc88'}
                               message={' Follow Me:https://github.com/eesc88'}
                />
                <OpenURLButton url={'https://github.com/eesc88/programmer'}
                               message={'项目地址:https://github.com/eesc88/programmer'}
                />

                <OpenURLButton url={'https://github.com/eesc88/ProgrammerServce'}
                               message={'Node.JS code:https://github.com/eesc88/ProgrammerServce'}
                />

            </View>
        );
    }
}


var OpenURLButton = React.createClass({

    propTypes: {url: React.PropTypes.string,},

    handleClick: function () {
        Linking.canOpenURL(this.props.url).then(supported => {
            if (supported) {
                Linking.openURL(this.props.url);
            } else {
                console.log('Don\'t know how to open URI: ' + this.props.url);
            }
        });
    }, render: function () {
        return (
            <TouchableOpacity
                onPress={this.handleClick}>
                <View style={styles.button}>
                    <Text style={styles.text}>
                        {this.props.message}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
});


var styles = StyleSheet.create({
    headerText: {
        margin: 10,
        fontSize: 18,
        textDecorationLine: 'underline',
        alignItems: 'center',
        color:'#FFFFFF',
    },
    button: {
        padding: 10,
        backgroundColor: '#3B5998',
        marginBottom: 10,
    },
    text: {
        color: 'white',
    },
});


export default AboutUs;