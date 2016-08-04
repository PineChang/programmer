/**
 * Created with WebStorm 10.0
 * User：苏国均
 * Version：1.0.0
 * Date：16/7/26
 * Time：
 * Description：
 */

//var AV = require('avoscloud-sdk').AV;
//
//AV.initialize('Qis1w7VaxtwbwYTtA57alJOq-gzGzoHsz', 'EANWnW9dUT0gDSYYtaNrpDrQ','zcjL0d7t7BrFr8K04UlpTLRv');
//AV.Promise.setPromisesAPlusCompliant(true);


import React from 'react';
var Dimensions = require('Dimensions');
//var Orientation = require('react-native-orientation');
import Sider from './view/side_menu/sider';


import Utils from './util/Utils';
import TranslationRecord from './model/TranslationRecord';


//这里实在是迫不得已，在navigationView里面的this指针都会转向Drawer
var __navigator = null;

import {
    StyleSheet,
    Text,
    View,
    DrawerLayoutAndroid,
    TextInput,
} from 'react-native';


class Root extends React.Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {input: ''};
        __navigator = this.props.navigator;
    }


    componentWillMount() {
        // 判断横竖屏幕
        //var initial = Orientation.getInitialOrientation();
        //if (initial === 'PORTRAIT') {
        //    //do stuff
        //} else {
        //    //do other stuff
        //}

        // 只允许竖屏
        //Orientation.lockToPortrait();
        //只允许横屏
        //Orientation.lockToLandscape();
    }


    getValue(text) {
        var RootThis = this;
        console.log("text-->" + text);

        var url = Utils.YOUDAO_URL + text;
        console.log("URL-->" + url);
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            //console.log("response:" + JSON.stringify(response));
            var reslutJson = response.json();
            return reslutJson ? reslutJson : "";
        }).then(function (responseText) {
            //console.log("responseText:" + JSON.stringify(responseText));
            RootThis.setState({
                input: responseText.translation
            });
            RootThis.addTranslateRecord(text, responseText.translation);
        });
    }

    addTranslateRecord(word, translate) {
        console.log('word:' + word + "<>translate:" + translate);
        fetch(Utils.LEANCLOUD_SERVCE + 'translate/addTranslateRecord', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({word: word, translate: translate})
        }).then(function (result) {
            console.log('result->' + result);
        }).catch(function (error) {
            console.log('error->' + error);
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
                    <View style={styles.titleView}>
                        <Text style={styles.titleText}>云翻译</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        multiline={true}
                        placeholder="请输入搜索关键字"
                        onChangeText={(text) => this.getValue(text)}
                    />
                    <Text style={styles.resultText}>
                        {'翻译结果:' + this.state.input}
                    </Text>
                </View>
            </DrawerLayoutAndroid>
        );
    }
}


const styles = StyleSheet.create({
    titleView: {
        padding: 10,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F13D81'
    },
    titleText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#FFFFFF'
    },
    flexContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#EFEFEF',
        height: Dimensions.get('window').height,
        paddingBottom: 10,
    },
    input: {
        flex: 5,
        width: Dimensions.get('window').width - 10,
        marginTop: 8,
        height: Dimensions.get('window').height * (2 / 5) - 20,
        borderColor: 'gray',
        backgroundColor: '#FFFFFF',
        borderWidth: 1
    },
    resultText: {
        flex: 5,
        width: Dimensions.get('window').width - 10,
        margin: 5,
        height: Dimensions.get('window').height * (2 / 5) - 35,
        borderColor: 'gray',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        padding: 5
    },
});

export default Root;