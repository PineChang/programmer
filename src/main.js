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
import UsetInfo from './view/user_center/UserInfo';
import TranslationRecord from './view/translate/TransLateRecord';

import Utils from './util/Utils';
import TRModel from './model/TranslationRecord';

//这里实在是迫不得已，在navigationView里面的this指针都会转向Drawer
var _nav = null;

import {
    StyleSheet,
    Text,
    View,
    DrawerLayoutAndroid,
    BackAndroid,
    Navigator,
    TextInput,
    TouchableOpacity
} from 'react-native';


class Main extends React.Component {


    static propTypes = {
        title: PropTypes.string.isRequired,
        onForward: PropTypes.func.isRequired,
        onBack: PropTypes.func.isRequired,
    }


    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {input: '', value: 1, drawer: "close", offsetY: 0};
        _nav = this.props.navigator;
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
            var reslutJson = response.json();
            return reslutJson ? reslutJson : "";
        }).then(function (responseText) {
            RootThis.setState({
                input: responseText.translation
            });
            TRModel.addTranslateRecord(text, responseText.translation);
        });
    }


    navigationView() {
        return (
            <Sider navigator={_nav}/>
        );
    }

    render() {
        return (
            <DrawerLayoutAndroid
                ref={(drawer)=>this._drawer = drawer}
                drawerWidth={300}
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


// 导航栏的Mapper
var NavigationBarRouteMapper = {
    // 左键
    LeftButton(route, navigator, index, navState) {
        if (index > 0) {
            return (
                <View style={styles.navContainer}>
                    <TouchableOpacity
                        underlayColor='transparent'
                        onPress={() => {if (index > 0) {navigator.pop()}}}>
                        <Text style={styles.leftNavButtonText}>
                            后退
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return null;
        }
    },
    // 右键
    RightButton(route, navigator, index, navState) {
        if (route.onPress)
            return (
                <View style={styles.navContainer}>
                    <TouchableOpacity
                        onPress={() => route.onPress()}>
                        <Text style={styles.rightNavButtonText}>
                            {route.rightText || '右键'}
                        </Text>
                    </TouchableOpacity>
                </View>
            );
    },
    // 标题
    Title(route, navigator, index, navState) {
        return (
            <View style={styles.navContainer}>
                <Text style={styles.title}>
                    应用标题
                </Text>
            </View>
        );
    }
};

var isFirst = true;

class Root extends React.Component {


    configureScene(route, routeStack) {
        return Navigator.SceneConfigs.PushFromRight;
    }


    /**
     * 使用动态页面加载
     * @param route 路由
     * @param navigator 导航器
     * @returns {XML} 页面
     */
    renderScene(route, navigator) {
        console.log("renderScene-->name:" + route.name);
        if (route.name) {
            return <route.component navigator={navigator}/>;
        } else if (isFirst && !route.name) {
            isFirst = false;
            return <route.component navigator={navigator}/>;
        }
    }


    //renderScene(router, navigator) {
    //    console.log("renderScene-->name:" + router.name);
    //    var Component = null;
    //    switch (router.name) {
    //        case "welcome":
    //            Component = UsetInfo;
    //            break;
    //        default: //default view
    //            Component = Main;
    //    }
    //
    //    return <Component navigator={navigator}/>
    //}


    render() {
        return (
            <Navigator
                initialRoute={{ title: 'My Initial Scene'}}
                configureScene={this.configureScene}
                renderScene={this.renderScene}
                //navigationBar={
                //          <Navigator.NavigationBar
                //          style={styles.navContainer}
                //          routeMapper={NavigationBarRouteMapper}/>
                //}
            />
        );
    }

}


class SimpleNavigationApp extends React.Component {
    render() {
        return ( <Navigator
            initialRoute={{title: 'My Initial Scene', index: 0 }}
            renderScene={(route, navigator) =>
            <Main title={route.title}

                     // Function to call when a new scene should be displayed
                     onForward={ () => {
                     const nextIndex = route.index + 1;
                     navigator.push({
                           title: 'Scene ' + nextIndex,
                           index: nextIndex,
                         });
                     }}

                     // Function to call to go back to the previous scene
                    onBack={() => {
                          if (route.index > 0) {
                                navigator.pop();
                          }
                        }
                    }
            />}
        />)
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
    // 页面框架
    container: {
        flex: 4,
        marginTop: 100,
        flexDirection: 'column'
    },
    // 导航栏
    navContainer: {
        backgroundColor: '#81c04d',
        paddingTop: 12,
        paddingBottom: 10,
    },
    // 导航栏文字
    headText: {
        color: '#ffffff',
        fontSize: 22
    },
    // 按钮
    button: {
        height: 60,
        marginTop: 10,
        justifyContent: 'center', // 内容居中显示
        backgroundColor: '#ff1049',
        alignItems: 'center'
    },
    // 按钮文字
    buttonText: {
        fontSize: 18,
        color: '#ffffff'
    },
    // 左面导航按钮
    leftNavButtonText: {
        color: '#ffffff',
        fontSize: 18,
        marginLeft: 13
    },
    // 右面导航按钮
    rightNavButtonText: {
        color: '#ffffff',
        fontSize: 18,
        marginRight: 13
    },
    // 标题
    title: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        flex: 1                //Step 3
    }
});

export default SimpleNavigationApp;