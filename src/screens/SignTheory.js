import {useNavigation} from '@react-navigation/native';
import {useRef} from 'react';
import {View, Text, Dimensions, Pressable, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {FlatList} from 'react-native-gesture-handler';

import SIGN from '../../assets/sign';
import SIGNS from '../../assets/signs';

const {width} = Dimensions.get('window');

const CATEGORIES = [
  'Tất cả biến báo',
  'Biển báo cấm',
  'Biển báo nguy hiểm',
  'Biển báo hiệu lệnh',
  'Biến báo chỉ dẫn',
  'Biến báo phụ',
  'Vạch kẻ đường',
];

const CategoryItem = ({item, index, signsRef}) => {
  const handlePress = () => {
    signsRef.current.scrollToIndex({
      index,
      animated: false,
    });
  };

  return (
    <Pressable onPress={handlePress} style={styles.categoryItem}>
      <Text style={styles.categoryItem__text}>{item}</Text>
    </Pressable>
  );
};

const CategoryBar = ({signsRef}) => {
  const keyExtractor = item => item;
  const getItemLayout = (_, index) => ({
    length: width / 3,
    offset: (width / 3) * index,
    index,
  });

  const renderItem = ({item, index}) => (
    <CategoryItem item={item} index={index} signsRef={signsRef} />
  );

  return (
    <View style={styles.categoryBar}>
      <FlatList
        horizontal
        data={CATEGORIES}
        renderItem={renderItem}
        initialNumToRender={0}
        maxToRenderPerBatch={3}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        getItemLayout={getItemLayout}
        removeClippedSubviews={true}
        legacyImplementation={true}
      />
    </View>
  );
};

const SignItem = ({item, onPress}) => (
  <Pressable onPress={() => onPress(item)} style={styles.signItem}>
    <FastImage
      style={styles.signItem__img}
      source={SIGN[item.img]}
      resizeMode={FastImage.resizeMode.stretch}
    />
    <View style={styles.signItem__desc}>
      <Text style={styles.desc__id}>{item.id}</Text>
      <Text style={styles.desc__name}>{item.name}</Text>
    </View>
  </Pressable>
);

const SignsItem = ({index}) => {
  const navigation = useNavigation();
  const keyExtractor = (_, index) => index;
  const getItemLayout = (_, index) => ({
    length: 94.3,
    offset: 94.3 * index,
    index,
  });
  const handlePress = item => {
    navigation.navigate('SignDetail', item);
  };
  const renderItem = ({item}) => <SignItem item={item} onPress={handlePress} />;

  return (
    <FlatList
      data={SIGNS[index]}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      windowSize={3}
      maxToRenderPerBatch={7}
      updateCellsBatchingPeriod={0}
      getItemLayout={getItemLayout}
      removeClippedSubviews={true}
      legacyImplementation={true}
      style={{width}}
    />
  );
};

const Signs = ({signsRef}) => {
  const handleRef = ref => (signsRef.current = ref);
  const keyExtractor = item => item;
  const getItemLayout = (_, index) => ({
    length: width,
    offset: width * index,
    index,
  });
  const renderItem = ({index}) => <SignsItem index={index} />;

  return (
    <FlatList
      ref={handleRef}
      data={CATEGORIES}
      horizontal
      keyExtractor={keyExtractor}
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      renderItem={renderItem}
      windowSize={2}
      initialNumToRender={0}
      getItemLayout={getItemLayout}
      removeClippedSubviews={true}
      updateCellsBatchingPeriod={0}
      legacyImplementation={true}
    />
  );
};

const SignTheory = () => {
  const signsRef = useRef(null);
  return (
    <View style={{flex: 1}}>
      <CategoryBar signsRef={signsRef} />
      <Signs signsRef={signsRef} />
    </View>
  );
};

export default SignTheory;

const styles = StyleSheet.create({
  categoryBar: {borderBottomColor: '#dfdfdf', borderBottomWidth: 1},
  categoryItem: {
    height: 37,
    paddingRight: 20,
    paddingLeft: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  categoryItem__text: {fontSize: 16.5, color: '#6d757a'},
  signItem: {
    flexDirection: 'row',
    height: 94.3,
    borderBottomColor: '#dfdfdf',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    paddingLeft: 15,
    paddingRight: 10,
  },
  signItem__img: {width: 80, height: 80, alignSelf: 'center'},
  signItem__desc: {marginLeft: 10, marginTop: 8, flex: 1},
  desc__id: {color: '#027bff', fontSize: 16, fontWeight: '600'},
  desc__name: {color: '#000', fontSize: 16, fontWeight: '500'},
});
