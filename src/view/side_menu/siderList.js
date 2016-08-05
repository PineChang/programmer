/**
 * Created by zi on 2016/7/26.
 */

'use strict'; // 启用严格模式


import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
} from 'react-native';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';

import style from './listStyle';

import UserInfo from '../user_center/UserInfo';
import TransLateRecord from '../translate/TransLateRecord';


//之前用的闭包计数器，但是不一定准确，所以放弃使用
var Counter = (function () {
    var count = 0;
    return function () {
        return ++count;
    }
})();

var _nav = null;

class icon {
    constructor() {
        this.sources = [
            <Image source={require("./img/ic_home_black_24dp.png")} style={style.icon}/>,
            <Image source={require("./img/ic_file_download_black_24dp.png")} style={style.icon}/>,
            <Image source={require("./img/ic_star_black_24dp.png")} style={style.icon}/>,
            <Image source={require("./img/ic_history_black_24dp.png")} style={style.icon}/>,
            <Image source={require("./img/ic_people_black_24dp.png")} style={style.icon}/>,
            <Image source={require("./img/ic_account_balance_wallet_black_24dp.png")} style={style.icon}/>,
            <Image source={require("./img/ic_color_lens_black_24dp.png")} style={style.icon}/>,
            <Image source={require("./img/ic_shop_black_24dp.png")} style={style.icon}/>,
            <Image source={require("./img/ic_settings_black_24dp.png")} style={style.icon}/>
        ];
        this.actSources = [
            <Image source={require("./img/ic_home_black_24dp.png")} style={style.actIcon}/>,
            <Image source={require("./img/ic_file_download_black_24dp.png")} style={style.actIcon}/>,
            <Image source={require("./img/ic_star_black_24dp.png")} style={style.actIcon}/>,
            <Image source={require("./img/ic_history_black_24dp.png")} style={style.actIcon}/>,
            <Image source={require("./img/ic_people_black_24dp.png")} style={style.actIcon}/>,
            <Image source={require("./img/ic_account_balance_wallet_black_24dp.png")} style={style.actIcon}/>,
            <Image source={require("./img/ic_color_lens_black_24dp.png")} style={style.actIcon}/>,
            <Image source={require("./img/ic_shop_black_24dp.png")} style={style.actIcon}/>,
            <Image source={require("./img/ic_settings_black_24dp.png")} style={style.actIcon}/>
        ];
    }

    getImage(index, active) {
        return active ? this.actSources[index] : this.sources[index];
    }
}

class Cell extends Component {

    constructor(props) {
        super(props);
        this.state = {selected: 0};
    }

    componentDidMount() {
        this.index = this.props.index;

    }

    _press() {
        //RCTDeviceEventEmitter.emit("closeDrawer");
        //let _navi = {};
        //switch (this.index) {
        //    case 1:
        //        _navi = {
        //            name: 'download',
        //            component: UserInfo
        //        };
        //        break;
        //    case 3:
        //        _navi = {
        //            name: 'TransLateRecord',
        //            component: TransLateRecord
        //        };
        //        break;
        //    case 8:
        //        _navi = {
        //            name: 'setting',
        //            component: Common
        //        };
        //        break;
        //}
        //console.log('navigator:' + _nav.toString());
        this.props.navigator.push({name: 'TransLateRecord', component: TransLateRecord});
    }



    render() {
        let active = false;
        //TODO:感觉可能会内存泄漏，但是我不会写静态方法
        let temp = new icon;
        if (this.state.selected === this.index) {
            active = true;
        }
        return (
            <TouchableHighlight underlayColor={"#e0e0e0"} style={active?style.activeTouch:style.touch}
                                onPress={this._press.bind(this)}>
                <View style={style.cell}>
                    {temp.getImage(this.index, active)}
                    <Text
                        style={active?style.activeText:{color:"#343434",marginLeft:30,marginTop:2}}>{this.props.name}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

class list extends Component {


    constructor(props) {
        super(props);
        _nav = this.props.navigator;
        console.log('Cell->navigator:' + _nav);
    }


    render() {
        //TODO: 以后这里还是改成用Listview吧，现在只是觉得这几个项目没必要费工夫
        return (
            <View style={style.container}>
                <View style={style.group}>
                    <Cell name={"首页"} index={0}/>
                    <Cell name={"离线缓存"} index={1} navigator={this.props.navigator}/>
                </View>
                <View style={style.group}>
                    <Cell name={"我的收藏"} index={2} navigator={this.props.navigator}/>
                    <Cell name={"历史记录"} index={3} navigator={this.props.navigator}/>
                    <Cell name={"关注的人"} index={4} navigator={this.props.navigator}/>
                    <Cell name={"我的钱包"} index={5} navigator={this.props.navigator}/>
                </View>
                <View style={[{paddingVertical:10},style.group]}>
                    <Cell name={"主题选择"} index={6} navigator={this.props.navigator}/>
                    <Cell name={"应用推荐"} index={7} navigator={this.props.navigator}/>
                    <Cell name={"设置与帮助"} index={8} navigator={this.props.navigator}/>
                </View>
            </View>
        );
    }
}

module.exports = list;