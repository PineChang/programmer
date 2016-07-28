/**
 * Created with WebStrom 10.0
 * User：苏国均
 * Version：1.0.0
 * Date：16/7/26
 * Time：
 * Description：
 */

import React from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    DrawerLayoutAndroid,
    BackAndroid
} from 'react-native';


class Root extends React.Component {

    render() {
        //var navigationView = (
        //    <View style={{flex: 1, backgroundColor: '#fff'}}>
        //        <Text
        //            style={{margin: 10, fontSize: 15, textAlign: 'left'}}>
        //            I'm in the Drawer!
        //        </Text>
        //    </View>
        //);
        return (
            <DrawerLayoutAndroid drawerWidth={300}
                                 drawerPosition={DrawerLayoutAndroid.positions.Left}
                                 renderNavigationView={() => NavigationView}>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>
                        Hello
                    </Text>
                    <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>
                        World!
                    </Text>
                </View>
            </DrawerLayoutAndroid>
        );
    }
}


var NavigationView = React.createClass({
    render: function () {
        return (
            <div className="commentBox">
                Hello, world! I am a CommentBox.
            </div>
        );
    }
});


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

export default Root;