import {useEffect, useRef, useMemo, memo, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Pressable,
  ScrollView,
  StatusBar,
  Animated,
  TextInput,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  togConfirmSelector,
  togNavigatorSelector,
  searchValueSelector,
  questionIndexSelector,
  searchResultsSelector,
  examStatisticSelector,
  examAnswersSelector,
  examResultsSelector,
  questionMapSelector,
  saveQuestionsSelector,
} from '../redux/exam.selector';
import examSlice, {changeQuestion} from '../redux/exam.slice';
import FastImage from 'react-native-fast-image';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IMG from '../../assets/img';

import {RefContext} from '../contexts/RefContext';

import questions from '../../assets/questions.json';

const {width, height} = Dimensions.get('window');

const NavigationItem = memo(({index}) => {
  const dispatch = useDispatch();
  const {questionsRef} = useContext(RefContext);
  const value = useSelector(examResultsSelector)[index][0];
  const backgroundColor = useMemo(() => {
    if (value === false) {
      return '#feadad';
    } else {
      return value ? '#b7e3c7' : '#fff';
    }
  }, [value]);
  const handlePress = () => {
    questionsRef.current.scrollToIndex({
      index,
      animated: false,
    });
    dispatch(changeQuestion(index));
  };
  return (
    <Pressable
      style={[styles.navigationItem, {backgroundColor}]}
      onPress={handlePress}>
      <Text style={styles.navigationItem__text}>Câu {index + 1}</Text>
    </Pressable>
  );
});

const NavigationBar = () => {
  const questionMap = useSelector(questionMapSelector);
  const keyExtractor = item => item[0];
  const getNavigationLayout = (_, index) => ({
    length: width / 5,
    offset: (width / 5) * index,
    index,
  });

  const renderNavigationItem = ({index}) => <NavigationItem index={index} />;

  return (
    <View style={{borderBottomColor: '#dfdfdf', borderBottomWidth: 1}}>
      <FlatList
        data={questionMap}
        horizontal
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        renderItem={renderNavigationItem}
        getItemLayout={getNavigationLayout}
        initialNumToRender={0}
        removeClippedSubviews={true}
        windowSize={2}
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={0}
        legacyImplementation={true}
      />
    </View>
  );
};

const SaveQuestion = ({mapIndex}) => {
  const dispatch = useDispatch();

  const isSaveQuestion = useSelector(saveQuestionsSelector).find(
    item => item[0] === mapIndex,
  );

  const handlePress = () => {
    dispatch(examSlice.actions.setSaveQuestions(mapIndex));
  };

  return (
    <FontAwesome
      onPress={handlePress}
      name={isSaveQuestion === undefined ? 'bookmark-o' : 'bookmark'}
      size={20}
      color={isSaveQuestion === undefined ? '#000' : '#027bff'}
      style={{
        padding: 7,
        marginRight: -7,
      }}
    />
  );
};

const Title = ({id, content, img, isKey, mapIndex}) => (
  <View style={styles.questionTitle}>
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text style={[styles.questionItem__text, {marginTop: 6}]}>
        CÂU HỎI {id + 1}:
      </Text>
      <SaveQuestion mapIndex={mapIndex} />
    </View>
    <Text
      style={[
        styles.questionItem__text,
        {color: isKey ? '#c92829' : '#343434'},
      ]}>
      {content}
    </Text>
    {img && (
      <FastImage
        style={{width, height: 175, marginBottom: 6.5}}
        source={IMG[img]}
        resizeMode={FastImage.resizeMode.contain}
      />
    )}
  </View>
);

const Content = memo(({index, choice, fontWeight, color}) => (
  <Text style={[styles.choiceItem_text, {fontWeight, color}]}>
    {index}. {choice}
  </Text>
));

const Choice = ({choice, index, id, isRightAnswer}) => {
  const dispatch = useDispatch();
  const {isFinished} = useSelector(examStatisticSelector);
  const answer = useSelector(examAnswersSelector)[id];
  const value = useSelector(examResultsSelector)[id][0];
  const data = useMemo(
    () => ({
      defaultTheme: {theme: '#fff', radio: '#5f5f5f'},
      selectTheme: {theme: '#fba308'},
      correctTheme: {theme: '#53ac88', weight: '600', color: '#178065'},
      incorrectTheme: {
        theme: '#ff3232',
        icon: 'md-close-sharp',
        color: '#dc3e4a',
      },
    }),
    [],
  );
  const isSelect = useMemo(() => answer === index, [answer]);
  const isConfirm = useMemo(() => value !== null, [value]);
  const color = useMemo(() => {
    if (!isConfirm) {
      if (isFinished) {
        return isRightAnswer ? data.correctTheme : data.defaultTheme;
      } else {
        return isSelect ? data.selectTheme : data.defaultTheme;
      }
    } else if (isRightAnswer) {
      return data.correctTheme;
    } else {
      return isSelect ? data.incorrectTheme : data.defaultTheme;
    }
  }, [isSelect, isConfirm, isFinished]);

  const handleSelect = () => {
    dispatch(
      examSlice.actions.chooseAnswer({
        questionIndex: id,
        answerIndex: isSelect ? null : index,
        togConfirm: !isSelect,
      }),
    );
  };

  return (
    <Pressable
      disabled={isConfirm || isFinished}
      style={styles.questionChoice}
      onPress={handleSelect}>
      <View style={[styles.choiceItem, {borderColor: color.theme}]}>
        <View
          style={[
            styles.choiceChoice__radio,
            {
              borderColor: color.radio || color.theme,
              backgroundColor: color.theme,
            },
          ]}>
          <Ionicons
            name={color.icon || 'checkmark-sharp'}
            size={13}
            color="#fff"
          />
        </View>
        <Content
          index={index}
          choice={choice}
          fontWeight={color.weight || 'normal'}
          color={color.color || '#333333'}
        />
      </View>
    </Pressable>
  );
};

const Choices = ({choices, id, rightAnswer}) =>
  choices.map((choice, index) => (
    <Choice
      id={id}
      key={index}
      index={index + 1}
      choice={choice}
      isRightAnswer={rightAnswer === index + 1}
    />
  ));

const ExplainContent = memo(({explain}) => (
  <>
    <View style={styles.explainContent}>
      <MaterialCommunityIcons
        name="tag-heart-outline"
        size={20}
        color="#0e8061"
      />
      <Text style={styles.explain__text}>Giải thích đáp án:</Text>
    </View>
    <Text style={{color: '#33362f', fontSize: 17.5}}>{explain}</Text>
  </>
));

const Explain = ({id, explain}) => {
  const {isFinished} = useSelector(examStatisticSelector);
  const value = useSelector(examResultsSelector)[id][0];
  const display = useMemo(
    () => (value !== null || isFinished ? 'flex' : 'none'),
    [value, isFinished],
  );
  return (
    <View
      style={[
        styles.explain,
        {
          display,
        },
      ]}>
      <ExplainContent explain={explain} />
    </View>
  );
};

const QuestionItem = memo(({question, index, mapIndex}) => (
  <View style={{width}}>
    <Title
      id={index}
      content={question.q}
      img={question.i}
      isKey={question.k}
      mapIndex={mapIndex}
    />
    <Choices choices={question.c} id={index} rightAnswer={question.a} />
    {question.e && <Explain id={index} explain={question.e} />}
  </View>
));

const QuestionPage = () => {
  const dispatch = useDispatch();
  const {questionsRef} = useContext(RefContext);
  const questionMap = useSelector(questionMapSelector);
  const keyExtractor = item => item[0];
  const getQuestionLayout = (_, index) => ({
    length: width,
    offset: width * index,
    index,
  });
  const renderQuestionItem = ({item, index}) => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <QuestionItem
        question={questions[item[0]]}
        index={index}
        mapIndex={item[0]}
      />
    </ScrollView>
  );
  const handleRef = ref => {
    questionsRef.current = ref;
  };
  const handleManualScroll = e => {
    dispatch(
      changeQuestion(
        Math.floor(e.nativeEvent.contentOffset.x / width + 0.0001),
      ),
    );
  };
  return (
    <FlatList
      ref={handleRef}
      data={questionMap}
      horizontal
      keyExtractor={keyExtractor}
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      renderItem={renderQuestionItem}
      initialNumToRender={0}
      getItemLayout={getQuestionLayout}
      removeClippedSubviews={true}
      windowSize={2}
      maxToRenderPerBatch={1}
      updateCellsBatchingPeriod={0}
      legacyImplementation={true}
      onMomentumScrollEnd={handleManualScroll}
    />
  );
};

const Question = () => (
  <View style={styles.question}>
    <NavigationBar />
    <QuestionPage />
  </View>
);

const CustomerServiceBtn = () => (
  <AntDesign name="customerservice" size={30} color="#fff" />
);

const SearchingBtn = () => {
  const dispatch = useDispatch();
  const handlePress = () => {
    dispatch(examSlice.actions.setTogNavigator(true));
  };
  return (
    <MaterialCommunityIcons
      onPress={handlePress}
      name="file-search-outline"
      size={30}
      color="#fff"
    />
  );
};

const BackBtn = () => {
  const dispatch = useDispatch();
  const {questionsRef} = useContext(RefContext);
  const questionIndex = useSelector(questionIndexSelector);
  const handleBack = () => {
    let index = questionIndex ? questionIndex - 1 : 0;
    questionsRef.current.scrollToIndex({
      index,
    });
    dispatch(changeQuestion(index));
  };
  return (
    <AntDesign
      onPress={handleBack}
      name={'left'}
      size={30}
      color="#fff"
      style={{margin: 15}}
    />
  );
};

const NextBtn = () => {
  const dispatch = useDispatch();
  const {questionsRef} = useContext(RefContext);
  const questionIndex = useSelector(questionIndexSelector);
  const handleNext = () => {
    let index =
      questionIndex === questionsRef.current.props.data.length - 1
        ? questionIndex
        : questionIndex + 1;
    questionsRef.current.scrollToIndex({
      index,
    });
    dispatch(changeQuestion(index));
  };
  return (
    <AntDesign
      onPress={handleNext}
      name={'right'}
      size={30}
      color="#fff"
      style={{margin: 15}}
    />
  );
};

const Footer = () => (
  <View style={styles.footer}>
    <View style={styles.footerItem}>
      <BackBtn />
      <CustomerServiceBtn />
    </View>
    <View style={styles.footerItem}>
      <SearchingBtn />
      <NextBtn />
    </View>
  </View>
);

const Confirm = () => {
  const dispatch = useDispatch();
  const togConfirm = useSelector(togConfirmSelector);
  const {isFinished} = useSelector(examStatisticSelector);
  const handleConfirm = () => {
    dispatch(examSlice.actions.confirmAnswer());
  };
  return (
    togConfirm &&
    !isFinished && (
      <Pressable style={styles.confirmBtn} onPress={handleConfirm}>
        <Ionicons name="checkmark-sharp" size={30} color="#fff" />
      </Pressable>
    )
  );
};

const Opacity = () => {
  const dispatch = useDispatch();
  const handlePress = () => {
    dispatch(examSlice.actions.setTogNavigator(false));
  };
  return (
    useSelector(togNavigatorSelector) && (
      <Pressable onPress={handlePress} style={styles.opacity}></Pressable>
    )
  );
};

const SelectItem = memo(({id, isKey}) => {
  const dispatch = useDispatch();
  const {questionsRef} = useContext(RefContext);
  const handlePress = () => {
    dispatch(examSlice.actions.setTogNavigator(false));
    questionsRef.current.scrollToIndex({
      index: id,
      animated: false,
    });
    dispatch(changeQuestion(id));
  };
  return (
    <Pressable onPress={handlePress} style={styles.selectItem}>
      <Text
        style={[
          styles.selectItem__text,
          {
            color: isKey ? '#c92829' : '#343434',
          },
        ]}>
        Câu {id + 1}
      </Text>
    </Pressable>
  );
});

const SelectTab = () => {
  const questionMap = useSelector(questionMapSelector);
  const keyExtractor = item => item[0];
  const renderItem = ({item, index}) => (
    <SelectItem id={index} isKey={questions[item[0]].k} />
  );
  return (
    <View style={{width}}>
      <FlatList
        data={questionMap}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={5}
        initialNumToRender={0}
        maxToRenderPerBatch={1}
        showsVerticalScrollIndicator={false}
        updateCellsBatchingPeriod={0}
        removeClippedSubviews={true}
        legacyImplementation={true}
      />
    </View>
  );
};

const SearchInput = () => {
  const dispatch = useDispatch();
  const searchValue = useSelector(searchValueSelector);
  const handleChange = event => {
    dispatch(examSlice.actions.setSearchValue(event.nativeEvent.text));
  };
  return (
    <TextInput
      value={searchValue}
      placeholder="Vui lòng nhập từ khóa"
      style={styles.searchBar__input}
      placeholderTextColor={'#a6a8a7'}
      onChange={handleChange}
    />
  );
};

const SearchBar = () => {
  const dispatch = useDispatch();
  const handleClear = () => {
    dispatch(examSlice.actions.setSearchValue(''));
  };
  return (
    <View style={styles.searchBar}>
      <Ionicons
        name="search"
        size={25}
        color="#040605"
        style={styles.searchBar__icon}
      />
      <SearchInput />
      <Ionicons
        onPress={handleClear}
        name="md-close-sharp"
        size={25}
        color="#040605"
        style={styles.searchBar__icon}
      />
    </View>
  );
};

const SearchResultItem = memo(({id, question, isKey, img}) => {
  const dispatch = useDispatch();
  const {questionsRef} = useContext(RefContext);
  const handlePress = () => {
    dispatch(examSlice.actions.setTogNavigator(false));
    questionsRef.current.scrollToIndex({
      index: id,
      animated: false,
    });
    dispatch(changeQuestion(id));
  };

  return (
    <Pressable onPress={handlePress} style={styles.searchResultItem}>
      <View style={styles.description}>
        <Text
          style={[
            styles.description__title,
            {
              color: isKey ? '#c92829' : '#343434',
            },
          ]}>
          Câu hỏi {id + 1}
        </Text>
        <Text
          ellipsizeMode="tail"
          numberOfLines={2}
          style={styles.description__content}>
          {question}
        </Text>
      </View>
      {img && <FastImage source={IMG[img]} style={styles.description__img} />}
    </Pressable>
  );
});

const SearchResult = () => {
  const searchResults = useSelector(searchResultsSelector);
  const keyExtractor = item => item[0];
  const renderItem = ({item}) => {
    const question = questions[item[0]];
    return (
      <SearchResultItem
        id={item[1]}
        question={question.q}
        isKey={question.k}
        img={question.i}
      />
    );
  };
  const getItemLayout = (_, index) => ({
    length: 70,
    offset: 70 * index,
    index,
  });
  return (
    <FlatList
      data={searchResults}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      getItemLayout={getItemLayout}
      initialNumToRender={0}
      windowSize={2}
      maxToRenderPerBatch={1}
      showsVerticalScrollIndicator={false}
      updateCellsBatchingPeriod={0}
      removeClippedSubviews={true}
      legacyImplementation={true}
    />
  );
};

const SearchTab = () => (
  <View style={{width}}>
    <SearchBar />
    <SearchResult />
  </View>
);

const NavigatorTab = memo(() => {
  const dispatch = useDispatch();
  const {navigatorRef} = useContext(RefContext);
  const handleRef = ref => {
    navigatorRef.current = ref;
  };
  return (
    <ScrollView
      ref={handleRef}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      scrollEnabled={false}>
      <SelectTab />
      <SearchTab />
    </ScrollView>
  );
});

const NavigatorBar = memo(() => {
  const {navigatorRef} = useContext(RefContext);

  const handleSwitchSelect = () => {
    navigatorRef.current.scrollTo({x: 0, y: 0, animated: false});
  };

  const handleSwitchSearch = () => {
    navigatorRef.current.scrollTo({x: width, y: 0, animated: false});
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <Pressable
        onPress={handleSwitchSelect}
        style={[
          styles.optionBarItem,
          {
            borderRightColor: '#e5e5e5',
            borderRightWidth: 1,
          },
        ]}>
        <Text style={styles.optionBarItem__text}>Mục Lục</Text>
      </Pressable>
      <Pressable onPress={handleSwitchSearch} style={[styles.optionBarItem]}>
        <Text style={styles.optionBarItem__text}>Tìm Kiếm</Text>
      </Pressable>
    </View>
  );
});

const Navigator = () => {
  const togNavigator = useSelector(togNavigatorSelector);

  const tabHeight = (height * 75) / 100;
  const translateY = useRef(new Animated.Value(tabHeight)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: togNavigator ? 0 : tabHeight,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [togNavigator]);

  return (
    <Animated.View
      style={[
        styles.filter,
        {
          transform: [
            {
              translateY,
            },
          ],
        },
      ]}>
      <NavigatorBar />
      <NavigatorTab />
    </Animated.View>
  );
};

const Exam = () => (
  <View style={styles.container}>
    <Question />
    <Footer />
    <Confirm />
    <Opacity />
    <Navigator />
  </View>
);

export default Exam;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  question: {flex: 1, backgroundColor: '#fff'},
  navigationItem: {
    width: width / 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 37,
  },
  navigationItem__text: {fontSize: 16.5, color: '#6d757a'},
  questionTitle: {
    borderBottomColor: '#dfdfdf',
    borderBottomWidth: 1,
    paddingRight: 15,
    paddingLeft: 15,
  },
  questionItem__text: {
    marginBottom: 6.5,
    fontSize: 18,
    fontWeight: '500',
    color: '#343434',
  },
  questionChoice: {
    borderBottomColor: '#dfdfdf',
    borderBottomWidth: 1,
    padding: 8,
  },
  choiceItem: {
    flex: 1,
    borderWidth: 1,
    padding: 8,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  choiceChoice__radio: {
    width: 18,
    height: 18,
    borderRadius: 18,
    borderWidth: 2,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  choiceItem_text: {fontSize: 17, flex: 1},
  explain: {
    padding: 10,
    margin: 8,
    backgroundColor: '#b7e3c7',
    borderRadius: 10,
  },
  explainContent: {flexDirection: 'row', alignItems: 'center', marginBottom: 5},
  explain__text: {
    color: '#343631',
    fontSize: 17.5,
    fontWeight: '600',
    marginLeft: 5,
  },
  confirmBtn: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 70,
    backgroundColor: '#4ead88',
    bottom: 30,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#fff',
    borderWidth: 4,
  },
  footer: {
    alignSelf: 'flex-end',
    width,
    height: 60,
    backgroundColor: '#027bff',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  footerItem: {flexDirection: 'row', alignItems: 'center'},
  opacity: {
    width,
    height: height - StatusBar.currentHeight,
    backgroundColor: 'rgba(0,0,0,0.3)',
    position: 'absolute',
  },
  filter: {
    position: 'absolute',
    bottom: 0,
    height: '75%',
    width,
    backgroundColor: '#fff',
  },
  optionBarItem: {
    flex: 1,
    height: 45,
    justifyContent: 'center',
    backgroundColor: '#027bff',
  },
  optionBarItem__text: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  selectItem: {
    width: width / 5,
    height: 60,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderRightColor: '#999999',
    borderBottomColor: '#999999',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectItem__text: {
    fontSize: 16,
    fontWeight: '600',
  },
  searchBar: {
    height: 45,
    margin: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d9dbda',
  },
  searchBar__icon: {marginLeft: 3, marginRight: 3},
  searchBar__input: {flex: 1, fontSize: 16},
  searchResultItem: {
    height: 70,
    borderBottomColor: '#cfcfcf',
    borderBottomWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  description: {
    marginRight: 10,
    marginLeft: 10,
    flex: 1,
  },
  description__title: {
    fontSize: 18,
    fontWeight: '600',
  },
  description__content: {fontSize: 14.5, color: '#88878c'},
  description__img: {width: 65, height: 65, marginLeft: -10, marginRight: 10},
});
