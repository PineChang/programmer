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
    TouchableHighlight
} from 'react-native';

import UserInfo from '../user_center/UserInfo';
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
                    <Text style={{flex:1}}></Text>
                    <Text style={{color:'#FFFFFF',fontSize:15}}>云翻译</Text>
                    <Text style={{color:'#FFFFFF',fontSize:10}}>Version:0.1.0</Text>
                    <Text style={{color:'#FFFFFF',fontSize:10,marginBottom: 20}}>————————————————</Text>
                </View>
                <View style={styles.sideContent}>
                    <TouchableHighlight style={styles.sideMenu} onPress={() => this._onIndexClick(this.props)}>
                        <Text style={styles.sideMenu}>
                            首页
                        </Text>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => this._onUserInfoClick(this.props)}>
                        <Text>
                            我的资料
                        </Text>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => this._transLateRecordClick(this.props)}>
                        <Text>
                            翻译记录
                        </Text>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => this._aboutUsClick(this.props)}>
                        <Text>
                            关于我们
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>);
    }

    _onUserInfoClick(props) {
        this.props.closeDrawer();
    }

    _onIndexClick(props) {
        this.props.closeDrawer();
        if (props.navigator) {
            props.navigator.push({
                name: 'UserInfo',
                component: UserInfo
            })
        }
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
        padding: 10,
        justifyContent: 'space-between'
    },
    sideMenu: {
        flex: 1,
        color: '#F13D81',
        fontSize: 15
    }
    //Side style end
});

export default SideMenu;