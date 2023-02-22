import {FlatList, View, Text, Pressable, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  licenseStatisticsSelector,
  licenseIndexSelector,
  licenseAnswersSelector,
  totalExamsSelector,
} from '../redux/exam.selector';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {memo, useMemo} from 'react';

import examSlice from '../redux/exam.slice';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const RandomExam = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const licenseIndex = useSelector(licenseIndexSelector);
  const licenseAnswers = useSelector(licenseAnswersSelector);

  const totalExams = useSelector(totalExamsSelector);

  const handlePress = () => {
    const examIndex = ((Math.random() * totalExams) | 0) + 1;
    dispatch(
      examSlice.actions.setRandomExamData({
        examIndex,
        isFinished: false,
        length: licenseAnswers[licenseIndex][examIndex].length,
      }),
    );
    navigation.navigate('Exam');
  };

  return (
    <Pressable
      onPress={handlePress}
      style={[
        styles.selectExamItem,
        {
          marginRight: 20,
        },
      ]}>
      <FontAwesome name="random" size={30} color="#33c558" />
    </Pressable>
  );
};

const FinishedExam = ({index, isPassed, correctAnswers, incorrectAnswers}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handlePress = () => {
    dispatch(examSlice.actions.setExamData(index));
    dispatch(examSlice.actions.setFilterValue(''));
    navigation.navigate('Exam');
    navigation.navigate('Statistic');
  };

  const title = useMemo(
    () =>
      isPassed
        ? {
            value: 'ĐẠT',
            color: '#35c757',
          }
        : {value: 'RỚT', color: '#e84c45'},
    [isPassed],
  );

  return (
    <Pressable
      onPress={handlePress}
      style={[
        styles.selectExamItem,
        {
          marginRight: (index + 1) % 3 ? 20 : 0,
        },
      ]}>
      <Text style={[styles.finishedExam__text, {color: title.color}]}>
        {title.value}
      </Text>
      <View style={styles.statistic}>
        <Text style={styles.statistic__text}>
          <Ionicons name={'checkbox'} size={20} color={'#34c759'} />
          {correctAnswers}
        </Text>
        <Text style={{color: '#000', fontWeight: '600', fontSize: 15}}>
          <Ionicons name={'close-circle'} size={20} color={'#fe3b30'} />
          {incorrectAnswers}
        </Text>
      </View>
    </Pressable>
  );
};

const UnfinishedExam = ({index}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handlePress = () => {
    dispatch(examSlice.actions.setExamData(index));
    navigation.navigate('Exam');
  };

  return (
    <Pressable
      onPress={handlePress}
      style={[styles.selectExamItem, {marginRight: (index + 1) % 3 ? 20 : 0}]}>
      <Text style={styles.unfinishedExam__text}>Đề {index}</Text>
    </Pressable>
  );
};

const SelectExamItem = memo(({item, index, isRender}) => {
  if (isRender) {
    if (index == 0) {
      return <RandomExam index={index} />;
    } else {
      return item.isFinished ? (
        <FinishedExam
          index={index}
          isPassed={item.isPassed}
          correctAnswers={item.correctAnswers}
          incorrectAnswers={item.incorrectAnswers}
        />
      ) : (
        <UnfinishedExam index={index} />
      );
    }
  }
});

const SelectExam = () => {
  const licenseIndex = useSelector(licenseIndexSelector);
  const licenseStatistics = useSelector(licenseStatisticsSelector);
  const totalExams = useSelector(totalExamsSelector);

  const renderItem = ({item, index}) => {
    return (
      <SelectExamItem
        item={item}
        index={index}
        isRender={index <= totalExams}
      />
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={licenseStatistics[licenseIndex]}
        renderItem={renderItem}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        updateCellsBatchingPeriod={0}
        removeClippedSubviews={true}
        legacyImplementation={true}
        contentContainerStyle={styles.gridStyle}
      />
    </View>
  );
};

export default SelectExam;

const styles = StyleSheet.create({
  container: {backgroundColor: '#f2f1f6', flex: 1},
  gridStyle: {
    paddingTop: 15,
    alignSelf: 'center',
    marginTop: 5,
  },
  selectExamItem: {
    width: 105,
    height: 105,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  finishedExam: {padding: 10, marginTop: 10},
  finishedExam__text: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '900',
  },
  statistic: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  statistic__text: {
    color: '#000',
    fontWeight: '600',
    fontSize: 15,
    marginRight: 2,
  },
  unfinishedExam__text: {color: '#000', fontWeight: '600', fontSize: 20},
});
