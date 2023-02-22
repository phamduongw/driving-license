import {View, Text, Pressable, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  filterResultsSelector,
  filterValueSelector,
  examStatisticSelector,
  questionMapSelector,
} from '../redux/exam.selector';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {memo, useContext} from 'react';
import examSlice from '../redux/exam.slice';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

import questions from '../../assets/questions.json';
import {RefContext} from '../contexts/RefContext';

const PassedTitle = () => {
  const {correctAnswers, totalQuestions} = useSelector(examStatisticSelector);
  return (
    <View style={styles.result}>
      <Text style={[styles.resultText, {color: '#35c757'}]}>ĐẠT</Text>
      <Text style={styles.resultText__detail}>
        Số câu đúng {correctAnswers}/{totalQuestions}
      </Text>
    </View>
  );
};

const FailedTitle = ({type}) => (
  <View style={styles.result}>
    <Text style={[styles.resultText, {color: '#e84c45'}]}>RỚT</Text>
    <Text style={styles.resultText__detail}>
      {type === '' ? 'Sai câu điểm liệt' : 'Không đủ câu trả lời đúng'}
    </Text>
  </View>
);

const OptionBar = () => {
  const dispatch = useDispatch();
  const {correctAnswers, incorrectAnswers, totalQuestions} = useSelector(
    examStatisticSelector,
  );
  const filterValue = useSelector(filterValueSelector);
  const changeOption = data => {
    dispatch(examSlice.actions.setFilterValue(data));
  };
  return (
    <View style={styles.optionBar}>
      <Pressable
        onPress={() => changeOption('')}
        style={[
          styles.optionBar__item,
          styles.optionBar__leftItem,
          {
            backgroundColor: filterValue === '' ? '#027bff' : '#f2f1f6',
          },
        ]}>
        <Text style={styles.optionBarItem__text}>Tất cả</Text>
      </Pressable>
      <Pressable
        onPress={() => changeOption(true)}
        style={[
          styles.optionBar__item,
          {
            backgroundColor: filterValue ? '#027bff' : '#f2f1f6',
          },
        ]}>
        <View style={styles.optionBarItem}>
          <Ionicons name={'checkbox'} size={20} color={'#34c759'} />
          <Text style={styles.optionBarItem__text}>{correctAnswers}</Text>
        </View>
      </Pressable>
      <Pressable
        onPress={() => changeOption(false)}
        style={[
          styles.optionBar__item,
          {
            backgroundColor: filterValue === false ? '#027bff' : '#f2f1f6',
          },
        ]}>
        <View style={styles.optionBarItem}>
          <Ionicons name={'close-circle'} size={20} color={'#fe3b30'} />
          <Text style={styles.optionBarItem__text}>{incorrectAnswers}</Text>
        </View>
      </Pressable>
      <Pressable
        onPress={() => changeOption(null)}
        style={[
          styles.optionBar__item,
          styles.optionBar__rightItem,
          {
            backgroundColor: filterValue === null ? '#027bff' : '#f2f1f6',
          },
        ]}>
        <View style={styles.optionBarItem}>
          <Ionicons name={'warning-sharp'} size={20} color={'#fdcc00'} />
          <Text style={styles.optionBarItem__text}>
            {totalQuestions - correctAnswers - incorrectAnswers}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const DetailItem = memo(({item}) => {
  const navigation = useNavigation();
  const {questionsRef} = useContext(RefContext);
  const handlePress = () => {
    navigation.navigate('Exam');
    questionsRef.current.scrollToIndex({
      index: item.id,
      animated: false,
    });
  };
  return (
    <Pressable
      onPress={handlePress}
      style={[styles.detailItem, {backgroundColor: item.backgroundColor}]}>
      <Text style={styles.detailItem__text}>Câu {item.id + 1}</Text>
      <Ionicons name={item.iconName} size={20} color={item.iconColor} />
    </Pressable>
  );
});

const Detail = () => {
  const questionMap = useSelector(questionMapSelector);
  const filterResults = useSelector(filterResultsSelector);

  const createTheme = (result, id) => {
    const item = {id};
    const isKey = questions[questionMap[id][0]].k;
    if (result) {
      item.backgroundColor = '#b7e3c7';
      item.iconColor = '#34c759';
      item.iconName = isKey ? 'flash' : 'checkbox';
    } else if (result === null) {
      item.backgroundColor = '#ebebeb';
      item.iconColor = '#fdcc00';
      item.iconName = isKey ? 'flash' : 'warning-sharp';
    } else {
      item.backgroundColor = '#feadad';
      item.iconColor = '#fe3b30';
      item.iconName = isKey ? 'flash' : 'close-circle';
    }
    return item;
  };

  const renderItem = ({item}) => {
    return <DetailItem item={createTheme(item[0], item[1])} />;
  };

  return (
    <FlatList
      data={filterResults}
      renderItem={renderItem}
      numColumns={5}
      showsVerticalScrollIndicator={false}
      updateCellsBatchingPeriod={0}
      removeClippedSubviews={true}
      legacyImplementation={true}
      contentContainerStyle={styles.gridStyle}
    />
  );
};

const Statistic = () => {
  const {isPassed} = useSelector(examStatisticSelector);
  return (
    <View style={styles.container}>
      {isPassed ? <PassedTitle /> : <FailedTitle type={isPassed} />}
      <OptionBar />
      <Detail />
    </View>
  );
};

export default Statistic;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
    flex: 1,
  },
  result: {
    alignItems: 'center',
    marginTop: 29,
    marginBottom: 34,
  },
  resultText: {
    marginBottom: 15,
    fontSize: 55,
    fontWeight: '900',
  },
  resultText__detail: {color: '#010101', fontSize: 16.5},
  optionBar: {
    height: 50,
    flexDirection: 'row',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#9c9b9f',
    marginBottom: 35,
  },
  optionBar__item: {
    borderRightColor: '#c5c4c9',
    flex: 1,
    borderRightWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionBar__leftItem: {
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
  },
  optionBar__rightItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  optionBarItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionBarItem__text: {
    marginLeft: 3,
    color: '#343434',
    fontSize: 18,
    fontWeight: '600',
  },
  fireIcon: {width: 18, height: 18, marginTop: 1},
  gridStyle: {
    paddingRight: 5,
    alignSelf: 'center',
  },
  detailItem: {
    width: 68,
    height: 68,
    marginLeft: 5,
    marginBottom: 5,
    borderRadius: 10,
    alignItems: 'center',
    padding: 7,
  },
  detailItem__text: {
    color: '#343434',
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 4,
  },
});
