/**
 * Created with WebStorm 10.0
 * User：苏国均
 * Version：1.0.0
 * Date：16/8/4
 * Time：
 * Description：
 */

'use strict'; // 启用严格模式


import React, {Component} from  'react';

import {
    StyleSheet,
    ListView,
    View,
    Text,
    Image,
    TouchableHighlight
} from 'react-native';

var Dimensions, {height, width} = require('Dimensions');

import Utils from '../../util/Utils';
import BaseActionBar from '../public/BaseActionBar';


class TransLateRecord extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loaded: false,
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        fetch(Utils.LEANCLOUD_SERVCE + 'translate/TranslateRecord')
            .then((response) => response.json())
            .then((responseData) => {
                console.log('responseData:' + JSON.stringify(responseData));
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.info),
                    loaded: true,
                });
            })
            .done();
    }

    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        return (
            <View style={{flexDirection: 'column'}}>
                <BaseActionBar navigator={this.props.navigator} title={'翻译记录'}/>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRecord}
                    style={styles.listView}
                />
            </View>
        );
    }

    renderLoadingView() {
        return (
            <View>
                <BaseActionBar navigator={this.props.navigator} title={'翻译记录'}/>
                <View style={styles.container}>
                    <Text>Loading data......</Text>
                </View>
            </View>
        );
    }

    renderRecord(record) {


        return (
            <TouchableHighlight onPress={this.pressRow(record)}>
                <View style={styles.recordContainer}>
                    <Text style={styles.word}>{record.word}</Text>
                    <Text style={styles.translate}>{record.translate}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    // 点击事件
    pressRow(rowToast) {
        console.log('rowToast->' + rowToast);
        //ToastAndroid.show(rowToast, ToastAndroid.SHORT);
    }
}


var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    recordContainer: {
        borderBottomColor: '#E9724C',
        borderBottomWidth: 1,
        width: width,
        padding: 3
    },
    word: {
        fontSize: 15,
    },
    translate: {
        width: width,
    },
    listView: {
        padding: 5,
        backgroundColor: '#F5FCFF',
    },
});

module.exports = TransLateRecord;

