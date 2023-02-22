import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import examSlice from './exam.slice';

export const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

export const rootReducer = combineReducers({
  exam: persistReducer(
    {
      ...rootPersistConfig,
      key: 'exam',
    },
    examSlice.reducer,
  ),
});
