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


import Utils from '../../util/Utils';

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

    _back() {
        // this.props.navigator.pop();
    }

    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        return (
            <View style={[styles.container, {flexDirection: 'column'}]}>
                <TouchableHighlight onPress={this._back()}>
                    <Text>
                        返回
                    </Text>
                </TouchableHighlight>

                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderMovie}
                    style={styles.listView}
                />
            </View>
        );
    }

    renderLoadingView() {
        return (<View style={styles.container}>
                <Text>Loading movies......</Text>
            </View>
        );
    }

    renderMovie(record) {
        return (
            <View style={styles.container}>
                <Image
                    source={{uri: 'http://pic3.nipic.com/20090622/2605630_113023052_2.jpg'}}
                    style={styles.thumbnail}
                />
                <View style={styles.rightContainer}>
                    <Text style={styles.title}>{record.word}</Text>
                    <Text style={styles.year}>{record.translate}</Text>
                </View>
            </View>
        );
    }


}
;


var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    rightContainer: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center',
    },
    year: {
        textAlign: 'center',
    },
    thumbnail: {
        width: 53,
        height: 81,
    },
    listView: {
        paddingTop: 20,
        backgroundColor: '#F5FCFF',
    },
});

module.exports = TransLateRecord;

