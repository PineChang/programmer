/**
 * Created with WebStorm 10.0
 * User：苏国均
 * Version：1.0.0
 * Date：16/7/26
 * Time：
 * Description：
 */


import React from 'react';
var Dimensions = require('Dimensions');

import Sider from './view/side_menu/sider';
import SideMenu from './view/side_menu/SideMenu';

import Utils from './util/Utils';
import TRModel from './model/TranslationRecord';


import {
    StyleSheet,
    Text,
    View,
    DrawerLayoutAndroid,
    BackAndroid,
    Navigator,
    TextInput,
    Platform,
    Image,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';


class Main extends React.Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {input: '', value: 1, drawer: "close", offsetY: 0};
        this.navigator = this.props.navigator;
    }

    getValue(text) {
        this.closeDrawer();
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
            var reslutJson = response.json();
            return reslutJson ? reslutJson : "";
        }).then(function (responseText) {
            RootThis.setState({
                input: responseText.translation
            });
            TRModel.addTranslateRecord(text, responseText.translation);
        });
    }


    closeDrawer() {
        if (Platform.OS === 'ios') {
            this.refs.drawer.close()
        } else {
            this.refs.drawer.closeDrawer()
        }
    }

    openDrawer() {
        if (Platform.OS === 'ios') {
            this.refs.drawer.open()
        } else {
            this.refs.drawer.openDrawer()
        }
    }


    navigationView() {
        return (
            <SideMenu
                navigator={this.navigator}
                closeDrawer={this.closeDrawer.bind(this)}
            />
        );
    }

    render() {
        return (
            <DrawerLayoutAndroid
                ref="drawer"
                drawerWidth={300}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={(()=>{return this.navigationView.bind(this)})()}>
                <View style={styles.flexContainer}>
                    <View style={styles.titleView}>
                        <TouchableHighlight style={styles.iconImage} onPress={this.openDrawer.bind(this)}>
                            <Image style={styles.iconImage} source={require('./img/ic_menu.png')}></Image>
                        </TouchableHighlight>
                        <Text style={styles.titleText}>云翻译</Text>
                        <Text style={styles.titleText}>...</Text>
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



//var {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    //Main style start
    titleView: {
        paddingTop: 15,
        paddingBottom: 15,
        width: Dimensions.get('window').width,
        alignItems: 'center',//子控件上下居中
        backgroundColor: '#F13D81',
        flex: 1,
        flexDirection: 'row',//子控件横向排列
        justifyContent: 'space-between',//子控件平均分配
    },
    titleText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#FFFFFF',
        justifyContent: 'center',
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
    iconImage: {
        height: 30,
        margin: 4,
        width: 30
    },
    //Main style end
});

export default Main;