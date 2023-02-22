import {useNavigation} from '@react-navigation/native';
import {memo, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Pressable,
  Dimensions,
  Alert,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ScrollView} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  homeFeaturesSelector,
  lengthSelector,
  licenseIndexSelector,
  licenseNameSelector,
  licenseStatisticsSelector,
} from '../redux/exam.selector';
import examSlice from '../redux/exam.slice';
import IMG from '../../assets/img';

import reviewTopics from '../../assets/reviewTopics.json';

const {width} = Dimensions.get('window');

const HeaderBar = () => {
  const navigation = useNavigation();

  const handleSetting = () => {
    navigation.navigate('SelectLicense');
  };

  return (
    <View style={styles.headerBar}>
      <Pressable onPress={handleSetting} style={styles.settingBtn}>
        <Text style={[styles.headerBar__textSide, {marginLeft: 3}]}>
          CÀI ĐẶT
        </Text>
      </Pressable>
      <Text style={styles.headerBar__textCenter}>{`HẠNG ${useSelector(
        licenseNameSelector,
      )}`}</Text>
      <Pressable>
        <Text style={styles.headerBar__textSide}>LIÊN HỆ</Text>
      </Pressable>
    </View>
  );
};

const Title = () => <Text style={styles.title}>Ôn thi GPLX</Text>;

const OptionItem = memo(({item, onPress}) => (
  <Pressable
    onPress={() => onPress(item.id, item.subTitle)}
    style={styles.optionItem}>
    <View
      style={[
        styles.optionItem__icon,
        {
          backgroundColor: item.color,
        },
      ]}>
      <MaterialCommunityIcons name={item.icon} size={33} color="#fff" />
    </View>
    <View style={styles.optionItem__text}>
      <Text style={styles.optionItem__title}>{item.title}</Text>
      <Text style={styles.optionItem__subTitle}>{item.subTitle}</Text>
    </View>
  </Pressable>
));

const Features = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const length = useSelector(lengthSelector);
  const homeFeatures = useSelector(homeFeaturesSelector);
  const handlePress = (name, subTitle) => {
    if (name == 'DefaultIncorrectQuestion') {
      dispatch(
        examSlice.actions.setRandomExamData({
          examIndex: length - 3,
          isFinished: true,
          length: 50,
        }),
      );
    } else if (name == 'SaveQuestion') {
      if (subTitle) {
        dispatch(
          examSlice.actions.setRandomExamData({
            examIndex: length - 2,
            isFinished: false,
            length: 50,
          }),
        );
      } else {
        Alert.alert(null, 'Bạn chưa có câu hỏi nào đã lưu!');
        return;
      }
    } else if (name == 'UserIncorrectQuestion') {
      if (subTitle) {
        dispatch(
          examSlice.actions.setRandomExamData({
            examIndex: length - 1,
            isFinished: false,
            length: 50,
          }),
        );
      } else {
        Alert.alert(null, 'Bạn chưa có câu hỏi nào trả lời sai!');
        return;
      }
    }
    navigation.navigate(name);
  };
  return (
    <View style={styles.options}>
      {homeFeatures.map(item => (
        <OptionItem key={item.title} item={item} onPress={handlePress} />
      ))}
    </View>
  );
};

// const Analyst = () => (
//   <View style={styles.evaluation}>
//     <View style={styles.evaluation__process}>
//       <Text style={styles.process__title}>Tiến độ ôn tập</Text>
//       <View style={styles.process__bar1}>
//         <View style={styles.process__bar2}></View>
//       </View>
//       <View style={styles.process__data}>
//         <View>
//           <Text style={styles.processData__text}>25/200 câu</Text>
//           <Text style={styles.processData__text}>2/8 đề thi</Text>
//         </View>
//         <View style={{flexDirection: 'row'}}>
//           <View style={{alignItems: 'flex-end', marginRight: 10}}>
//             <Text style={styles.processData__text}>23 đúng</Text>
//             <Text style={styles.processData__textWeight}>1 đạt</Text>
//           </View>
//           <View>
//             <Text style={styles.processData__text}>2 sai</Text>
//             <Text style={styles.processData__textWeight}>1 rớt</Text>
//           </View>
//         </View>
//       </View>
//     </View>
//     <View style={styles.evaluation__percent}>
//       <Text style={styles.percent__title}>Chỉ số an toàn</Text>
//       <Text style={styles.percent__data}>75%</Text>
//     </View>
//   </View>
// );

const ReviewTopicItem = memo(
  ({
    item,
    index,
    correctAnswers,
    incorrectAnswers,
    totalQuestions,
    handlePress,
  }) => {
    return (
      <Pressable
        onPress={() => {
          handlePress(index);
        }}
        style={styles.reviewTopics}>
        <View style={styles.reviewTopics__title}>
          <FastImage style={styles.title__icon} source={IMG[item.icon]} />
          <Text style={styles.title__text}>{item.title}</Text>
        </View>
        <View style={[styles.process__bar1, {width: '100%'}]}>
          <View
            style={[
              styles.process__bar2,
              {
                width:
                  ((correctAnswers + incorrectAnswers) / totalQuestions) *
                  (width - 60),
              },
            ]}></View>
        </View>
        <View style={styles.reviewTopics__result}>
          <Text style={styles.optionItem__subTitle}>
            {(correctAnswers ? `${correctAnswers + incorrectAnswers}/` : '') +
              `${totalQuestions} câu hỏi`}
          </Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text style={styles.optionItem__subTitle}>
              {correctAnswers ? `${correctAnswers} câu đúng` : ``}
            </Text>
            <Text
              style={[
                styles.optionItem__subTitle,
                {marginLeft: incorrectAnswers ? 10 : 0},
              ]}>
              {incorrectAnswers ? `${incorrectAnswers} câu sai` : ``}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  },
);

const ReviewTopic = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const licenseIndex = useSelector(licenseIndexSelector);
  const licenseStatistics = useSelector(licenseStatisticsSelector);

  const handlePress = useCallback(index => {
    dispatch(examSlice.actions.setExamData(index));
    navigation.navigate('Review');
  }, []);

  return reviewTopics[licenseIndex].map(item => {
    const {correctAnswers, incorrectAnswers, totalQuestions} =
      licenseStatistics[licenseIndex][item.index];
    return (
      <ReviewTopicItem
        key={item.index}
        item={item}
        index={item.index}
        handlePress={handlePress}
        correctAnswers={correctAnswers}
        incorrectAnswers={incorrectAnswers}
        totalQuestions={totalQuestions}
      />
    );
  });
};

const ReviewTopicExam = () => (
  <View>
    <Text style={styles.reviewTopicExam__title}>Ôn tập theo chủ đề</Text>
    <ReviewTopic />
  </View>
);

const Home = () => (
  <SafeAreaView style={styles.container}>
    <HeaderBar />
    <ScrollView showsVerticalScrollIndicator={false}>
      <Title />
      <Features />
      {/* <Analyst /> */}
      <ReviewTopicExam />
    </ScrollView>
  </SafeAreaView>
);

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f1f6',
    paddingRight: 15,
    paddingLeft: 15,
  },
  headerBar: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#f2f1f6',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  headerBar__textSide: {
    color: '#027bff',
    fontSize: 15,
    fontWeight: '500',
    height: '100%',
    textAlignVertical: 'center',
  },
  headerBar__textCenter: {color: '#000', fontSize: 15, fontWeight: '600'},
  title: {
    fontSize: 30,
    color: '#000',
    fontWeight: '700',
    // marginTop: -5,
    marginTop: -2.5,
    // marginBottom: 10,
    marginBottom: 12.5,
  },
  options: {
    backgroundColor: '#fff',
    paddingTop: 20,
    flexWrap: 'wrap',
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'center',
  },
  optionItem: {
    marginBottom: 20,
    width: 85,
    alignItems: 'center',
  },
  optionItem__icon: {
    width: 60,
    height: 60,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionItem__text: {alignItems: 'center', marginTop: 10},
  optionItem__title: {fontSize: 13, color: '#000000', fontWeight: '600'},
  optionItem__subTitle: {fontSize: 12, color: '#8f8f91'},
  evaluation: {
    height: 100,
    backgroundColor: '#fff',
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  evaluation__process: {
    paddingRight: 15,
    borderStyle: 'dotted',
    borderRightWidth: 2,
    borderRightColor: '#e8e8eb',
    marginLeft: 15,
  },
  process__title: {fontSize: 18, fontWeight: '600', color: '#000'},
  process__bar1: {
    width: 245,
    height: 7,
    backgroundColor: '#e8e8eb',
    borderRadius: 7,
    marginTop: 8,
  },
  process__bar2: {
    width: 35,
    height: 7,
    backgroundColor: '#027bff',
    borderRadius: 7,
  },
  process__data: {
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'space-between',
  },
  processData__text: {fontSize: 11, color: '#8f8f91'},
  processData__textWeight: {fontSize: 11, color: '#8f8f91', fontWeight: '700'},
  evaluation__percent: {
    flex: 1,
    alignItems: 'center',
    marginTop: 5,
  },
  percent__title: {
    color: '#000',
    width: 55,
    textAlign: 'center',
  },
  percent__data: {color: '#fac929', fontSize: 32, fontWeight: '600'},
  reviewTopicExam__title: {
    fontSize: 22,
    color: '#000',
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 15,
  },
  reviewTopics: {
    backgroundColor: '#fff',
    height: 90,
    marginBottom: 20,
    borderRadius: 10,
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  reviewTopics__title: {flexDirection: 'row', alignItems: 'center'},
  title__icon: {width: 30, height: 30, marginRight: 10},
  title__text: {color: '#000', fontSize: 17, fontWeight: '500'},
  reviewTopics__result: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
});
