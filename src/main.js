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
        var navigationView = (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <Text
                    style={{margin: 10, fontSize: 15, textAlign: 'left'}}>
                    I'm in the Drawer!
                </Text>
            </View>
        );
        return (
            <DrawerLayoutAndroid drawerWidth={300}
                                 drawerPosition={DrawerLayoutAndroid.positions.Left}
                                 renderNavigationView={() => navigationView}>
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




















export default Root;