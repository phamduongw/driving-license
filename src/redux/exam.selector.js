export const licenseIndexSelector = state => state.exam.licenseIndex;
export const licenseNameSelector = state => state.exam.licenseName;
export const licenseRequirementSelector = state =>
  state.exam.licenseRequirement;

export const licenseAnswersSelector = state => state.exam.licenseAnswers;
export const licenseResultsSelector = state => state.exam.licenseResults;
export const licenseStatisticsSelector = state => state.exam.licenseStatistics;

export const examMapSelector = state => state.exam.examMap;
export const examIndexSelector = state => state.exam.examIndex;
export const examAnswersSelector = state => state.exam.examAnswers;
export const examResultsSelector = state => state.exam.examResults;
export const examStatisticSelector = state => state.exam.examStatistic;

export const lengthSelector = state => state.exam.length;
export const totalExamsSelector = state => state.exam.totalExams;
export const saveQuestionsSelector = state => state.exam.saveQuestions;
export const incorrectQuestionsSelector = state =>
  state.exam.incorrectQuestions;

export const questionMapSelector = state => state.exam.questionMap;
export const questionIndexSelector = state => state.exam.questionIndex;
export const togConfirmSelector = state => state.exam.togConfirm;
export const togNavigatorSelector = state => state.exam.togNavigator;
export const searchValueSelector = state => state.exam.searchValue;
export const searchResultsSelector = state => state.exam.searchResults;
export const filterValueSelector = state => state.exam.filterValue;
export const filterResultsSelector = state => state.exam.filterResults;

export const homeFeaturesSelector = state => state.exam.homeFeatures;
