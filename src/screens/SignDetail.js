import {View, Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

import SIGN from '../../assets/sign';

const SignDetail = ({route}) => (
  <View style={styles.container}>
    <FastImage
      style={styles.sign}
      source={SIGN[route.params.img]}
      resizeMode={FastImage.resizeMode.stretch}
    />
    <Text style={styles.id}>{route.params.id}</Text>
    <Text style={styles.name}>{route.params.name}</Text>
    <Text style={styles.detail}>{route.params.detail}</Text>
  </View>
);

export default SignDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingRight: 15,
    paddingLeft: 15,
    alignItems: 'center',
  },
  sign: {width: 300, height: 300},
  id: {
    color: '#027bff',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 10,
  },
  name: {
    color: '#000',
    fontSize: 20,
    fontWeight: '600',
  },
  detail: {
    alignSelf: 'flex-start',
    color: '#000',
    fontSize: 16,
    marginTop: 8,
  },
});
