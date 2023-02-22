import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Animated,
  Pressable,
  StatusBar,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import questions from '../utils/questions';

const {width, height} = Dimensions.get('window');
const boxSizing = width / 5;

const OldExam = () => {
  const [data, setData] = useState(questions);
  const [completed, setCompleted] = useState(false);
  const [popUp, setPopUp] = useState(false);

  const confirmRef = useRef(null);
  const coverRefs = useRef([]);

  const navigationRef = useRef(null);
  const questionRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const startOffset = useRef(0);
  const movementOffset = useRef(0);
  const manualScroll = useRef(false);

  return (
    <SafeAreaView style={[styles.container]}>
      <Header completed={completed} setCompleted={setCompleted} />
      <Question
        questionRef={questionRef}
        scrollX={scrollX}
        navigationRef={navigationRef}
        startOffset={startOffset}
        movementOffset={movementOffset}
        manualScroll={manualScroll}
        data={data}
        setData={setData}
        confirmRef={confirmRef}
        coverRefs={coverRefs}
      />
      <Footer
        questionRef={questionRef}
        startOffset={startOffset}
        setPopUp={setPopUp}
        data={data}
      />
      <Confirm
        startOffset={startOffset}
        confirmRef={confirmRef}
        data={data}
        setData={setData}
        coverRefs={coverRefs}
      />
      <TableContent
        data={data}
        startOffset={startOffset}
        popUp={popUp}
        setPopUp={setPopUp}
        questionRef={questionRef}
      />
    </SafeAreaView>
  );
};

const Header = ({completed, setCompleted}) => {
  const handleResult = () => {
    setCompleted(!completed);
  };

  return (
    <View style={styles.wrap}>
      <Text style={[styles.wrap__text, {textAlign: 'left', flex: 1}]}>
        0/30
      </Text>
      <Timeout completed={completed} setCompleted={setCompleted} />
      <TouchableOpacity style={styles.wrap__btn} onPress={handleResult}>
        <Text
          style={[styles.wrap__text, {textAlign: 'right', fontWeight: '400'}]}>
          Chấm điểm
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Timeout = ({completed, setCompleted}) => {
  const [minute, setMinute] = useState(29);
  const [second, setSecond] = useState('59');

  useEffect(() => {
    if (completed) {
      return;
    }
    let intervalId = setInterval(() => {
      if (second == 0) {
        if (minute == 0) {
          setCompleted(true);
        } else {
          setMinute(minute <= 10 ? '0' + (minute - 1) : minute - 1);
          setSecond(59);
        }
      } else {
        setSecond(second <= 10 ? '0' + (second - 1) : second - 1);
      }
      clearInterval(intervalId);
    }, 1000);
  }, [second]);

  return (
    <Text
      style={{
        textAlign: 'center',
        flex: 1,
        fontWeight: 'bold',
        color: 'white',
        fontSize: 20,
      }}>
      {minute + ':' + second}
    </Text>
  );
};

const Divide = () => {
  return <View style={{backgroundColor: '#e5e5e5', width, height: 1}}></View>;
};

const Content = ({item, index, data, setData, confirmRef, coverRefs}) => {
  let isCorrect = data[index].isCorrect;
  let selected = data[index].selected;
  let answer = data[index].answer;

  const handlePress = i => {
    data[index].selected = i;
    setData([...data]);

    // Enable Confirm Btn
    confirmRef.current.setNativeProps({
      style: {
        display: 'flex',
      },
    });
  };

  const theme = i => {
    if (isCorrect !== '') {
      if (answer === i) {
        return '#54ac88';
      }
      if (selected === i) {
        return '#cf4750';
      } else {
        return '#fff';
      }
    } else {
      if (selected === i) {
        return '#ffa003';
      } else {
        return '#fff';
      }
    }
  };

  const border = (i, color) => {
    if (i !== selected && i != answer) {
      return '#5c5c5c';
    } else if (isCorrect === '') {
      if (i !== selected) {
        return '#5c5c5c';
      } else {
        return color;
      }
    } else {
      return color;
    }
  };

  return (
    <View key={index} style={styles.content}>
      <View style={{margin: 5}}>
        <Text style={styles.title__id}>câu hỏi {item.id}:</Text>
        <Text style={styles.title__content}>{item.question}</Text>
      </View>
      <Divide />
      <View>
        {item.choices.map((item, i) => {
          let color = theme(i);
          let borderColor = border(i, color);
          return (
            <View key={i}>
              <Pressable
                onPress={() => {
                  handlePress(i);
                }}>
                <View
                  style={[
                    styles.choice,
                    {
                      borderColor: color,
                    },
                  ]}>
                  <View style={styles.choice__radio}>
                    <View
                      style={[
                        styles.radio__icon,
                        {
                          borderColor,
                          backgroundColor: color,
                        },
                      ]}>
                      <Ionicons
                        name={
                          isCorrect !== '' && i !== answer
                            ? 'md-close-sharp'
                            : 'checkmark-sharp'
                        }
                        size={13}
                        color="white"
                      />
                    </View>
                  </View>
                  <View style={styles.choice__content}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight:
                          isCorrect !== '' && i === answer ? 'bold' : 'normal',
                        color:
                          isCorrect === '' || (i !== answer && i !== selected)
                            ? '#343434'
                            : color,
                      }}>
                      {i + 1 + '. ' + item}
                    </Text>
                  </View>
                </View>
              </Pressable>
              <Divide />
            </View>
          );
        })}
      </View>
      <View
        style={{
          padding: 8,
          paddingRight: 10,
          paddingLeft: 10,
          margin: 5,
          backgroundColor: '#b7e3c7',
          borderRadius: 10,
          display: item.isCorrect !== '' ? 'flex' : 'none',
        }}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
          <MaterialCommunityIcons
            name="tag-heart-outline"
            size={20}
            color="#137d5e"
          />
          <Text style={[styles.title__content, {marginTop: 0, marginLeft: 5}]}>
            Giải thích đáp án:
          </Text>
        </View>
        <Text style={{color: '#343e36'}}>{item.explain}</Text>
      </View>
      <View
        ref={ref => coverRefs.current.push(ref)}
        style={{
          width,
          height,
          position: 'absolute',
          backgroundColor: 'rgba(0,0,0,0)',
          display: 'none',
        }}></View>
    </View>
  );
};

const Confirm = ({startOffset, confirmRef, data, setData, coverRefs}) => {
  const handlePressConfirm = () => {
    let currentQuestion = startOffset.current / width;

    let selected = data[currentQuestion].selected;
    let answer = data[currentQuestion].answer;

    data[currentQuestion].isCorrect = selected === answer;

    // Disable confirm btn
    confirmRef.current.setNativeProps({
      style: {
        display: 'none',
      },
    });

    // Enable answer cover
    coverRefs.current[currentQuestion].setNativeProps({
      style: {
        display: 'flex',
      },
    });

    setData([...data]);
  };

  return (
    <Pressable
      ref={ref => (confirmRef.current = ref)}
      onPress={handlePressConfirm}
      style={{
        width: 60,
        height: 60,
        borderRadius: 30,
        borderColor: '#fff',
        borderWidth: 3,
        position: 'absolute',
        bottom: 30,
        backgroundColor: '#4ead88',
        marginRight: 'auto',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'none',
      }}>
      <Ionicons name="checkmark-sharp" size={30} color="white" />
    </Pressable>
  );
};

const Question = ({
  questionRef,
  scrollX,
  navigationRef,
  startOffset,
  movementOffset,
  manualScroll,
  data,
  setData,
  confirmRef,
  coverRefs,
}) => {
  const left = scrollX.interpolate({
    inputRange: [width, width * 2],
    outputRange: [boxSizing, boxSizing * 2],
  });

  const renderContent = ({item, index}) => {
    return (
      <Content
        item={item}
        index={index}
        data={data}
        setData={setData}
        confirmRef={confirmRef}
        coverRefs={coverRefs}
      />
    );
  };

  const handleManualScroll = event => {
    movementOffset.current = event.nativeEvent.contentOffset.x;
    manualScroll.current = true;
  };

  const handleScrollToIndex = index => {
    questionRef.current.scrollToIndex({
      index,
      animated: true,
    });
  };

  const handleCarousel = event => {
    let offset = event.nativeEvent.contentOffset.x;

    // Disable Confirm Btn
    confirmRef.current.setNativeProps({
      style: {
        display: 'none',
      },
    });

    if (offset % width === 0) {
      if (offset != startOffset.current) {
        movementOffset.current = 0;
        manualScroll.current = false;
      }
      startOffset.current = offset;
    }

    if (movementOffset.current === 0 && manualScroll.current === false) {
      navigationRef.current.scrollTo({
        x: boxSizing * ((offset - width * 2) / width),
        y: 0,
        animated: false,
      });
    } else {
      let targetPage =
        offset >= startOffset.current
          ? ((offset / width) | 0) + 1
          : (offset / width) | 0;

      let currentDist = offset - startOffset.current;
      let totalDist = targetPage * width - startOffset.current || 1;
      let progessRatio = currentDist / totalDist;

      let targetDist = movementOffset.current - (targetPage - 2) * boxSizing;
      let x = movementOffset.current - targetDist * progessRatio;

      navigationRef.current.scrollTo({
        x,
        y: 0,
        animated: false,
      });
    }
  };

  const handleSwipe = Animated.event(
    [{nativeEvent: {contentOffset: {x: scrollX}}}],
    {
      useNativeDriver: false,
      listener: handleCarousel,
    },
  );
  return (
    <View style={{flex: 1}}>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleManualScroll}
          ref={ref => {
            navigationRef.current = ref;
          }}>
          <View style={{height: 35}}>
            <View style={{flexDirection: 'row', flex: 1}}>
              {data.map((item, index) => {
                const color = scrollX.interpolate({
                  inputRange: [
                    width * (index - 1),
                    width * index,
                    width * (index + 1),
                  ],
                  outputRange: ['#6d737a', '#3687c5', '#6d737a'],
                  extrapolate: 'clamp',
                });
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      handleScrollToIndex(index);
                    }}
                    style={[styles.navigate__item, {backgroundColor: '#fff'}]}>
                    <Animated.Text style={[styles.navigate__text, {color}]}>
                      {'Câu ' + (index + 1)}
                    </Animated.Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Animated.View
              style={[styles.navigate__underline, {left}]}></Animated.View>
          </View>
        </ScrollView>
        <Divide />
      </View>

      <View style={{flex: 1}}>
        <FlatList
          data={data}
          renderItem={renderContent}
          ref={ref => (questionRef.current = ref)}
          keyExtractor={item => data.indexOf(item)}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleSwipe}
        />
      </View>
    </View>
  );
};

const Footer = ({questionRef, startOffset, setPopUp, data}) => {
  const handleBefore = () => {
    let currentPage = startOffset.current / width;
    questionRef.current.scrollToIndex({
      index: currentPage === 0 ? currentPage : currentPage - 1,
    });
  };

  const handleNext = () => {
    let currentPage = startOffset.current / width;
    questionRef.current.scrollToIndex({
      index: currentPage === data.length - 1 ? currentPage : currentPage + 1,
    });
  };

  const handlePopUp = () => {
    setPopUp(true);
  };

  return (
    <View style={styles.footer}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={styles.footer__button} onPress={handleBefore}>
          <AntDesign name="left" size={22} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footer__button} onPress={handlePopUp}>
          <Ionicons name="book-outline" size={22} color="white" />
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={styles.footer__button}>
          <Ionicons name="share-outline" size={22} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footer__button} onPress={handleNext}>
          <AntDesign name="right" size={22} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const TableContent = ({data, startOffset, setPopUp, popUp, questionRef}) => {
  const row = Math.ceil(data.length / 6);
  const tabHeight = (width / 6.5) * row + (row + 2) * 3.5;

  const bottom = useRef(new Animated.Value(-tabHeight)).current;

  useEffect(() => {
    Animated.timing(bottom, {
      toValue: popUp ? 0 : -tabHeight,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [popUp]);

  const handleTouch = () => {
    setPopUp(false);
  };

  const handlePress = index => {
    questionRef.current.scrollToIndex({
      index,
      animated: false,
    });
    setPopUp(false);
  };

  return (
    <View style={[styles.tableContent, {display: popUp ? 'flex' : 'none'}]}>
      <View style={{flex: 1}} onTouchStart={handleTouch}></View>
      <Animated.View
        style={[
          styles.tableContent__tab,
          {
            height: tabHeight,
            bottom,
          },
        ]}>
        {data.map((item, index) => {
          return (
            <Pressable
              onPress={() => {
                handlePress(index);
              }}
              key={index}
              style={[
                styles.tab__btn,
                {
                  marginRight: (index + 1) % 6 === 0 ? 0 : 3.5,
                },
              ]}>
              {({pressed}) => {
                return (
                  <Text
                    style={{
                      color:
                        startOffset.current / width === index || pressed
                          ? 'white'
                          : 'black',
                      fontSize: 20,
                    }}>
                    {index + 1}
                  </Text>
                );
              }}
            </Pressable>
          );
        })}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  wrap: {
    backgroundColor: '#3987c3',
    height: '8%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  wrap__text: {
    color: 'white',
    fontSize: 15,
  },
  wrap__btn: {
    flex: 1,
    height: '80%',
    justifyContent: 'center',
  },
  navigate__item: {
    width: boxSizing,
    justifyContent: 'center',
  },
  navigate__text: {
    textAlign: 'center',
    fontSize: 14,
    color: '#6d737a',
  },
  navigate__underline: {
    postion: 'relative',
    width: boxSizing,
    height: 3,
    backgroundColor: '#3687c5',
  },
  content: {
    width,
    backgroundColor: '#fff',
  },
  title__id: {
    textTransform: 'uppercase',
    color: '#333333',
    fontSize: 15,
    fontWeight: '600',
  },
  title__content: {
    marginTop: 5,
    color: '#333333',
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 20,
  },
  choice: {
    margin: 5,
    flexDirection: 'row',
    borderRadius: 7,
    borderWidth: 1,
  },
  choice__radio: {
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radio__icon: {
    width: 18,
    height: 18,
    borderRadius: 18,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  choice__content: {
    flex: 1,
    paddingTop: 5.5,
    paddingBottom: 5.5,
    paddingRight: 10,
  },
  footer: {
    backgroundColor: '#3987c3',
    height: '8%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  footer__button: {
    borderRadius: 40,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableContent: {
    width,
    height: height - StatusBar.currentHeight,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  tableContent__tab: {
    backgroundColor: '#3f4344',
    width,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
  },
  tab__btn: {
    backgroundColor: '#c5e9f8',
    height: width / 6.5,
    width: width / 6.5,
    marginBottom: 3.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OldExam;
