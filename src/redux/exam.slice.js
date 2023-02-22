import {createSlice} from '@reduxjs/toolkit';
import questions from '../../assets/questions.json';

import licenseDetails from '../../assets/licenseDetails.json';
import examMap from '../../assets/examMap.json';

const slice = createSlice({
  name: 'exam',
  initialState: {
    licenseIndex: 0,
    licenseName: 'A1',
    licenseRequirement: {
      time: 18,
      correctAnswers: 21,
    },
    licenseAnswers: Array.from(licenseDetails, item1 =>
      Array.from(examMap[item1.id], item2 =>
        Array.from(Array(item2.length), () => null),
      ),
    ),
    licenseResults: Array.from(licenseDetails, item1 =>
      Array.from(examMap[item1.id], item2 =>
        Array.from(Array(item2.length), (_, index) => [null, index]),
      ),
    ),
    licenseStatistics: Array.from(licenseDetails, item1 =>
      Array.from(examMap[item1.id], item2 => ({
        correctAnswers: 0,
        incorrectAnswers: 0,
        totalQuestions: item2.length,
      })),
    ),

    isRandomExam: false,

    examMap,
    examIndex: 0,
    examAnswers: '',
    examResults: '',
    examStatistic: '',

    length: 19,
    totalExams: 8,

    questionMap: [],
    questionIndex: 0,
    togConfirm: false,

    saveQuestions: [],
    incorrectQuestions: [],

    togNavigator: false,

    searchValue: '',
    searchResults: [],

    filterValue: '',
    filterResults: [],

    homeFeatures: [
      {
        id: 'SelectExam',
        title: 'THI THỬ',
        subTitle: '8 đề',
        color: '#027bff',
        icon: 'file-document-outline',
      },
      {
        id: 'SaveQuestion',
        title: 'LƯU',
        subTitle: '',
        color: '#34c759',
        icon: 'bookmark-outline',
      },
      {
        id: 'UserIncorrectQuestion',
        title: 'CÂU SAI',
        subTitle: '2 câu',
        color: '#ff3b31',
        icon: 'window-close',
      },
      {
        id: 'DefaultIncorrectQuestion',
        title: 'CÂU HAY SAI',
        subTitle: '50 câu',
        color: '#fdcc00',
        icon: 'bug-outline',
      },
      {
        title: 'MÔ PHỎNG',
        subTitle: '120 câu',
        color: '#027bff',
        icon: 'car-outline',
      },
      {
        id: 'Tips',
        title: 'MẸO',
        subTitle: '',
        color: '#34c759',
        icon: 'lightbulb-outline',
      },
      {
        id: 'SignTheory',
        title: 'BIỂN BÁO',
        subTitle: '',
        color: '#ff3b31',
        icon: 'police-badge-outline',
      },
      {
        title: 'HỎI ĐÁP',
        subTitle: 'thảo luận',
        color: '#fdcc00',
        icon: 'comment-question-outline',
      },
    ],
  },
  reducers: {
    setLicenseData: (state, action) => {
      state.licenseIndex = action.payload.licenseIndex;
      state.licenseName = action.payload.licenseName;
      state.licenseRequirement = action.payload.licenseRequirement;
      state.totalExams = action.payload.totalExams;
      state.length = examMap[state.licenseIndex].length;
      state.saveQuestions = state.examMap[state.licenseIndex][state.length - 2];
      state.incorrectQuestions =
        state.examMap[state.licenseIndex][state.length - 1];
      state.homeFeatures[0].subTitle = `${state.totalExams} đề`;
    },
    setSubFeatureTitle: state => {
      state.homeFeatures[1].subTitle = state.saveQuestions.length
        ? `${state.saveQuestions.length} câu`
        : '';
      state.homeFeatures[2].subTitle = state.incorrectQuestions.length
        ? `${state.incorrectQuestions.length} câu`
        : '';
    },
    setExamData: (state, action) => {
      state.examIndex = action.payload;
      state.questionIndex = 0;
      state.questionMap = state.examMap[state.licenseIndex][state.examIndex];
      state.searchResults = state.questionMap;
      state.examAnswers =
        state.licenseAnswers[state.licenseIndex][state.examIndex];
      state.examResults =
        state.licenseResults[state.licenseIndex][state.examIndex];
      state.examStatistic =
        state.licenseStatistics[state.licenseIndex][state.examIndex];
    },
    setRandomExamData: (state, action) => {
      state.examIndex = action.payload.examIndex;
      state.questionIndex = 0;
      state.isRandomExam = true;
      state.questionMap = state.examMap[state.licenseIndex][state.examIndex];
      state.searchResults = state.questionMap;
      state.examAnswers = Array.from(Array(action.payload.length), () => null);
      state.examResults = Array.from(
        Array(action.payload.length),
        (_, index) => [null, index],
      );
      state.examStatistic = {
        correctAnswers: 0,
        incorrectAnswers: 0,
        totalQuestions: action.payload.length,
        isFinished: action.payload.isFinished,
      };
    },
    setTogNavigator: (state, action) => {
      state.togNavigator = action.payload;
    },
    chooseAnswer: (state, action) => {
      state.examAnswers[action.payload.questionIndex] =
        action.payload.answerIndex;
      state.togConfirm = action.payload.togConfirm;
    },
    confirmAnswer: state => {
      const index = state.questionMap[state.questionIndex][0];
      const answer = state.examAnswers[state.questionIndex];
      const removeIndex = state.incorrectQuestions.findIndex(
        item => item[0] === index,
      );
      if (answer === questions[index].a) {
        state.examResults[state.questionIndex][0] = true;
        state.examStatistic.correctAnswers += 1;
        // Remove Incorrect Index
        if (removeIndex > -1) {
          state.incorrectQuestions.splice(removeIndex, 1);
        }
      } else {
        state.examResults[state.questionIndex][0] = false;
        state.examStatistic.incorrectAnswers += 1;
        if (questions[index].k) state.examStatistic.isPassed = '';
        // Add Incorrect Index
        if (removeIndex == -1) {
          if (state.incorrectQuestions.length > 49) {
            state.incorrectQuestions.splice(0, 1);
          }
          state.incorrectQuestions.push([
            index,
            state.incorrectQuestions.length,
          ]);
        }
      }
      state.togConfirm = false;
    },
    setQuestionId: (state, action) => {
      state.questionIndex = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
      const searchValue = state.searchValue.toLowerCase().trim();
      state.searchResults = state.questionMap.filter(item => {
        const question = questions[item[0]];
        return (
          question.q.toLowerCase().includes(searchValue) ||
          item[1] == searchValue - 1
        );
      });
    },
    setFilterValue: (state, action) => {
      state.filterValue = action.payload;
      state.filterResults =
        state.filterValue === ''
          ? state.examResults
          : state.examResults.filter(item => item[0] === state.filterValue);
    },
    finishExam: state => {
      state.examStatistic.isFinished = true;
    },
    disableTog: state => {
      state.filterValue = '';
      state.togConfirm = false;
      state.togNavigator = false;
    },
    saveExamData: state => {
      if (state.isRandomExam) {
        state.isRandomExam = false;
      } else {
        state.licenseAnswers[state.licenseIndex][state.examIndex] =
          state.examAnswers;
        state.licenseResults[state.licenseIndex][state.examIndex] =
          state.examResults;
        state.licenseStatistics[state.licenseIndex][state.examIndex] =
          state.examStatistic;
      }
      state.examMap[state.licenseIndex][state.length - 1] =
        state.incorrectQuestions;
      state.examMap[state.licenseIndex][state.length - 2] = state.saveQuestions;
    },
    setSaveQuestions: (state, action) => {
      const index = state.saveQuestions.findIndex(
        item => item[0] === action.payload,
      );
      if (index == -1) {
        if (state.saveQuestions.length > 49) {
          state.saveQuestions.splice(0, 1);
        }
        state.saveQuestions.push([action.payload, state.saveQuestions.length]);
      } else {
        state.saveQuestions.splice(index, 1);
      }
    },
  },
});

export const changeQuestion = id => {
  return (dispatch, getState) => {
    const {exam} = getState();
    if (
      exam.questionIndex !== id &&
      exam.examAnswers[exam.questionIndex] !== null &&
      exam.examResults[exam.questionIndex][0] === null
    ) {
      dispatch(slice.actions.confirmAnswer());
    }
    dispatch(slice.actions.setQuestionId(id));
  };
};

export default slice;
