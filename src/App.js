/**
 * Created with WebStorm 10.0
 * User：苏国均
 * Version：1.0.0
 * Date：16/8/9
 * Time：
 * Description：
 */

import React from 'react';
import {
    Component,
    StyleSheet,
    Text,
    Navigator,
    View
} from 'react-native';

import Main from './Main';
class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let name = 'Main';
        let home = Main;
        return (
            <Navigator
                initialRoute={{ name: name, component: home }}
                configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromRight}
                renderScene={(route, navigator) => {
       let Component = route.component;
       return <Component {...route.params} navigator={navigator} />
     }}/>
        );
    }
}


export{ App as default };
