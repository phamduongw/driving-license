import {createStackNavigator} from '@react-navigation/stack';

import Exam from '../screens/Exam';
import Statistic from '../screens/Statistic';
import Home from '../screens/Home';
import SelectLicense from '../screens/SelectLicense';
import SelectExam from '../screens/SelectExam';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Pressable, Text, Alert, StyleSheet} from 'react-native';

import examSlice from '../redux/exam.slice';
import SignTheory from '../screens/SignTheory';
import SignDetail from '../screens/SignDetail';
import {
  licenseNameSelector,
  licenseRequirementSelector,
  examStatisticSelector,
} from '../redux/exam.selector';
import {useEffect, useRef, useState} from 'react';

const Stack = createStackNavigator();

const Counter = () => {
  const {correctAnswers, incorrectAnswers, totalQuestions} = useSelector(
    examStatisticSelector,
  );
  return (
    <Text style={styles.header__text}>
      {correctAnswers + incorrectAnswers} / {totalQuestions}
    </Text>
  );
};

const Timeout = ({onFinish}) => {
  const dispatch = useDispatch();
  const {isFinished} = useSelector(examStatisticSelector);
  const {time} = useSelector(licenseRequirementSelector);
  const [minute, setMinute] = useState(time);
  const [second, setSecond] = useState(59);
  const secondRef = useRef(null);
  const minuteRef = useRef(null);
  const timeoutRef = useRef(null);
  useEffect(() => {
    if (isFinished) {
      clearInterval(minuteRef.current);
      clearInterval(secondRef.current);
      clearTimeout(timeoutRef.current);
      return;
    }
    secondRef.current = setInterval(() => {
      setSecond(prev => (prev != 0 ? String(prev - 1).padStart(2, '0') : 59));
    }, 1000);
    minuteRef.current = setInterval(() => {
      setMinute(prev => (prev != 0 ? String(prev - 1).padStart(2, '0') : '00'));
    }, 60000);
    timeoutRef.current = setTimeout(() => {
      clearInterval(minuteRef.current);
      clearInterval(secondRef.current);
      dispatch(examSlice.actions.setFilterValue(''));
      onFinish();
    }, time * 60000 + 58000);
  }, [isFinished]);
  return (
    <Text style={styles.timeout__text}>
      {isFinished ? 'K???t qu??? thi th???' : minute + ':' + second}
    </Text>
  );
};

const FinishExam = ({onFinish}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {isFinished} = useSelector(examStatisticSelector);

  const handleConfirm = () => {
    if (isFinished) {
      navigation.navigate('Statistic');
    } else {
      dispatch(examSlice.actions.setFilterValue(''));
      return Alert.alert(
        'K???t th??c b??i thi',
        'B???n c?? mu???n k???t th??c b??i thi v?? ch???m ??i???m?',
        [
          {
            text: 'B??? qua',
            style: 'cancel',
          },
          {
            text: '?????ng ??',
            style: 'destructive',
            onPress: onFinish,
          },
        ],
      );
    }
  };

  return (
    <Pressable onPress={handleConfirm}>
      <Text style={[styles.header__text]}>
        {isFinished ? '????ng' : 'Ch???m ??i???m'}
      </Text>
    </Pressable>
  );
};

const BackTitle = ({onBack}) => (
  <Pressable
    onPress={onBack}
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 5,
      paddingLeft: 10,
      paddingRight: 10,
    }}>
    <Entypo name="chevron-left" size={30} color="#fff" />
  </Pressable>
);

const LevelTitle = () => (
  <Text
    style={{
      color: '#fff',
      fontSize: 20,
      fontWeight: '600',
    }}>
    {`H???ng ${useSelector(licenseNameSelector)} - Thi th???`}
  </Text>
);

export const ExamStackNavigator = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const screenOptions = {
    headerStyle: {
      backgroundColor: '#027bff',
      height: 60,
    },
    headerTitleStyle: {
      color: '#fff',
    },
    animationEnabled: false,
    headerTitleAlign: 'center',
  };

  const homeOptions = {
    headerShown: false,
  };

  const handleBackHome = () => {
    dispatch(examSlice.actions.setSubFeatureTitle());
    navigation.navigate('Home');
  };

  const headerBackHomeBtn = () => <BackTitle onBack={handleBackHome} />;

  const selectLicenseOptions = {
    title: 'L???a ch???n gi???y ph??p',
    headerLeft: headerBackHomeBtn,
  };

  const headerTitleSelectExam = () => <LevelTitle />;

  const selectExamOptions = {
    headerTitle: headerTitleSelectExam,
    headerLeft: headerBackHomeBtn,
  };

  const handleFinish = () => {
    navigation.navigate('Statistic');
    dispatch(examSlice.actions.finishExam());
  };

  const headerLeftExam = () => <Counter />;
  const headerRightExam = () => <FinishExam onFinish={handleFinish} />;
  const headerTitleExam = () => <Timeout onFinish={handleFinish} />;
  const examOptions = {
    headerLeft: headerLeftExam,
    headerRight: headerRightExam,
    headerTitle: headerTitleExam,
  };

  const handleBackSelectExam = () => {
    dispatch(examSlice.actions.saveExamData());
    navigation.navigate('SelectExam');
    dispatch(examSlice.actions.disableTog());
  };

  const headerLeftStatistic = () => <BackTitle onBack={handleBackSelectExam} />;
  const statisticOptions = {
    title: 'K???t qu??? thi th???',
    headerLeft: headerLeftStatistic,
  };

  const signsOptions = {
    title: 'Bi???n b??o giao th??ng',
    headerLeft: headerBackHomeBtn,
  };

  const handleBackSignTheory = () => {
    navigation.navigate('SignTheory');
  };
  const headerLeftSignDetail = () => (
    <BackTitle onBack={handleBackSignTheory} />
  );
  const signDetailOptions = {
    title: 'N???i dung chi ti???t',
    headerLeft: headerLeftSignDetail,
  };

  const handleReviewBackHome = () => {
    dispatch(examSlice.actions.saveExamData());
    dispatch(examSlice.actions.setSubFeatureTitle());
    navigation.navigate('Home');
    dispatch(examSlice.actions.disableTog());
  };
  const headerLeftReview = () => <BackTitle onBack={handleReviewBackHome} />;
  const reviewOptions = {
    title: '??n t???p c??u h???i',
    headerLeft: headerLeftReview,
  };

  const headerLeftDefaultIncorrectQuestion = () => (
    <BackTitle onBack={handleReviewBackHome} />
  );
  const defaultIncorrectAnswerOptions = {
    title: '50 c??u hay sai',
    headerLeft: headerLeftDefaultIncorrectQuestion,
  };

  const headerSaveQuestion = () => <BackTitle onBack={handleReviewBackHome} />;
  const saveQuestionOptions = {
    title: 'C??u h???i ???? l??u',
    headerLeft: headerSaveQuestion,
  };

  const headerUserIncorrectQuestion = () => (
    <BackTitle onBack={handleReviewBackHome} />
  );
  const userIncorrectQuestionOptions = {
    title: 'C??u tr??? l???i sai',
    headerLeft: headerUserIncorrectQuestion,
  };

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="SelectLicense"
        component={SelectLicense}
        options={selectLicenseOptions}
      />
      <Stack.Screen name="Home" component={Home} options={homeOptions} />
      <Stack.Screen
        name="SelectExam"
        component={SelectExam}
        options={selectExamOptions}
      />
      <Stack.Screen name="Exam" component={Exam} options={examOptions} />
      <Stack.Screen
        name="DefaultIncorrectQuestion"
        component={Exam}
        options={defaultIncorrectAnswerOptions}
      />
      <Stack.Screen
        name="SaveQuestion"
        component={Exam}
        options={saveQuestionOptions}
      />
      <Stack.Screen
        name="UserIncorrectQuestion"
        component={Exam}
        options={userIncorrectQuestionOptions}
      />
      <Stack.Screen name="Review" component={Exam} options={reviewOptions} />
      <Stack.Screen
        name="Statistic"
        component={Statistic}
        options={statisticOptions}
      />
      <Stack.Screen
        name="SignTheory"
        component={SignTheory}
        options={signsOptions}
      />
      <Stack.Screen
        name="SignDetail"
        component={SignDetail}
        options={signDetailOptions}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  timeout__text: {
    fontWeight: '500',
    color: '#fff',
    fontSize: 20,
  },
  header__text: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    color: '#fff',
    fontSize: 16.5,
    fontWeight: '500',
    textAlignVertical: 'center',
  },
});
