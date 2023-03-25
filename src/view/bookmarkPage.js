import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';
import NewsCard from './NewsCard';
const styles = StyleSheet.create({
  containerStyle: {flex: 1, backgroundColor: 'white', padding: 24},
  contentStyle: {flexDirection: 'row', alignItems: 'center'},
  backIconStyle: {height: 40, width: 40},
  bookmarkStyle: {
    fontSize: 20,
    lineHeight: 30,
    color: 'black',
    fontWeight: '700',
  },
  emptyStyle: {
    fontSize: 24,
    fontWeight: '700',
    color: 'red',
    lineHeight: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 40,
  },
  listStyle: {alignItems: 'center', paddingTop: 40},
});
function BookMarkPage() {
  const {data} = useSelector(({bookmark}) => bookmark);
  const navigation = useNavigation();
  const onBackPressed = () => {
    navigation.goBack();
  };
  const renderItem = ({item, index}) => (
    <View style={{marginBottom: 20}}>
      <NewsCard item={item} showBookMark={false} />
    </View>
  );
  return (
    <View style={styles.containerStyle}>
      <View style={styles.contentStyle}>
        <TouchableOpacity activeOpacity={1} onPress={onBackPressed}>
          <Image
            source={require('../assest/back.webp')}
            style={styles.backIconStyle}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.bookmarkStyle}>{'Bookmark'}</Text>
      </View>
      {JSON.stringify(data) === JSON.stringify([]) ? (
        <Text style={styles.emptyStyle}>
          {'Nothing to show here. please add news from home page'}
        </Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item?.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listStyle}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
        />
      )}
    </View>
  );
}

export default BookMarkPage;
