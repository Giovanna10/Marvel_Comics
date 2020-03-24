import React, {useEffect} from 'react';
import {View, ActivityIndicator, Dimensions} from 'react-native';
import * as firebase from 'firebase';
import { NavigationStackProp } from 'react-navigation-stack';

const {height} = Dimensions.get('window')

type LoadingProps = {
    navigation: NavigationStackProp
}

const Loading: React.FC<LoadingProps> = ({navigation}) => {

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      navigation.navigate(user ? 'App' : 'Auth');
    });
  }, []);

  return (
    <View style={{backgroundColor: '#000000', height: height, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator />
    </View>
  );
};

export default Loading