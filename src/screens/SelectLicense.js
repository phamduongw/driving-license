import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import examSlice from '../redux/exam.slice';
import {useDispatch, useSelector} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';

import licenseDetails from '../../assets/licenseDetails.json';
import {licenseNameSelector} from '../redux/exam.selector';

const {width} = Dimensions.get('window');

const CATEGORIES = [
  {
    type: 'MÔ TÔ',
    indexes: [0, 1, 2, 3],
  },
  {type: 'Ô TÔ', indexes: [4, 5]},
  {type: 'KHÁC', indexes: [6, 7, 8, 9]},
];

const SelectLicense = () => {
  const dispatch = useDispatch();
  const licenseName = useSelector(licenseNameSelector);

  const handlePress = index => {
    const licenseDetail = licenseDetails[index];
    dispatch(
      examSlice.actions.setLicenseData({
        licenseIndex: index,
        licenseName: licenseDetail.name,
        licenseRequirement: {
          time: licenseDetail.time,
          correctAnswers: licenseDetail.correctAnswers,
        },
        totalExams: licenseDetail.totalExams,
      }),
    );
    dispatch(examSlice.actions.setSubFeatureTitle());
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {CATEGORIES.map(category => (
        <View key={category.type}>
          <Text style={styles.category}>{category.type}</Text>
          {category.indexes.map(index => (
            <Pressable
              onPress={() => handlePress(index)}
              key={licenseDetails[index].name}
              style={styles.categoryItem}>
              <View>
                <Text style={styles.categoryItem__name}>
                  {licenseDetails[index].name}
                </Text>
                <Text style={styles.categoryItem__description}>
                  {licenseDetails[index].description}
                </Text>
              </View>
              {licenseName === licenseDetails[index].name && (
                <Entypo name="check" size={30} color="#027bff" />
              )}
            </Pressable>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  category: {
    color: '#8e8d94',
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 5,
    borderBottomColor: '#e8e8e8',
    borderBottomWidth: 1,
  },
  categoryItem: {
    width,
    height: 65,
    backgroundColor: '#fff',
    borderBottomColor: '#e8e8e8',
    borderBottomWidth: 1,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  categoryItem__name: {color: '#000', fontSize: 20, fontWeight: '600'},
  categoryItem__description: {color: '#888889', fontSize: 12},
});

export default SelectLicense;
