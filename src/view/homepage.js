import {useNavigation} from '@react-navigation/core';
import React, {memo, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchNews, fetchTopNews} from '../api/news';
import {categories} from '../constants';
import NewsCard from './NewsCard';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 40,
  },
  nameStyle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    lineHeight: 22,
  },
  welcomeStyle: {fontSize: 12, lineHeight: 16, color: 'grey', marginTop: 4},
  itemStyle: {
    borderRadius: 12,
    backgroundColor: '#DCDCDC',
    marginHorizontal: 6,
    padding: 4,
    paddingHorizontal: 6,
  },
  itemTextStyle: {
    fontSize: 16,
    lineHeight: 20,
    color: 'black',
    fontWeight: '500',
  },
  filterStyle: {
    fontSize: 20,
    lineHeight: 26,
    color: 'black',
    fontWeight: '700',
  },
  bookmarkStyle: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 40,
    borderColor: '#5474FD',
    padding: 10,
    marginRight: 20,
  },
  filterContainerStyle: {marginBottom: 10, marginTop: 30, marginLeft: 20},
  listStyle: {paddingLeft: 20, paddingRight: 20},
  topContentStyle: {flexDirection: 'row', marginLeft: 20, alignItems: 'center'},
  bookMarkImageStyle: {height: 20, width: 20, tintColor: '#5474FD'},
  userIconStyle: {height: 49, width: 49},
  paddingStyle: {marginLeft: 12, flex: 1},
  stubsStyle: {
    height: 340,
    width: 270,
    backgroundColor: '#DCDCDC',
    borderRadius: 24,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  marginStyle: {marginTop: 40},
  listStyle1: {paddingLeft: 10, marginTop: 40},
  topNewsStyle: {
    fontSize: 20,
    lineHeight: 30,
    color: 'black',
    fontWeight: '700',
    marginLeft: 20,
    marginBottom: 25,
  },
});
function HomePage() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [filter, changeFilter] = useState(categories[0]?.type);
  const {data, topNews} = useSelector(({news}) => news);
  useEffect(() => {
    dispatch(fetchNews(filter));
  }, [filter, dispatch]);
  useEffect(() => {
    dispatch(fetchTopNews('top'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onItemPressed = type => {
    changeFilter(type);
  };
  const bookMarkClicked = () => {
    navigation.navigate('bookmark');
  };
  const renderTopContent = () => (
    <View style={styles.topContentStyle}>
      <Image
        source={require('../assest/user.png')}
        style={styles.userIconStyle}
        resizeMode="contain"
      />
      <View style={styles.paddingStyle}>
        <Text style={styles.nameStyle}>{'Hi, yogesh'}</Text>
        <Text style={styles.welcomeStyle}>{'Welcome back'}</Text>
      </View>
      <TouchableOpacity
        onPress={bookMarkClicked}
        activeOpacity={1}
        style={styles.bookmarkStyle}>
        <Image
          source={require('../assest/bookmarkImage.png')}
          style={styles.bookMarkImageStyle}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
  const renderFliterItem = ({item, index}) => (
    <TouchableOpacity
      activeOpacity={1}
      style={[
        styles.itemStyle,
        filter === item?.type && {backgroundColor: '#5474FD'},
      ]}
      onPress={() => {
        onItemPressed(item?.type);
      }}>
      <Text
        style={[
          styles.itemTextStyle,
          filter === item?.type && {color: 'white'},
        ]}>{`#${item?.type}`}</Text>
    </TouchableOpacity>
  );
  const fliterHeader = () => (
    <View style={styles.filterContainerStyle}>
      <Text style={styles.filterStyle}>{'Fliters'}</Text>
    </View>
  );
  const renderFilter = () => (
    <View>
      {fliterHeader()}
      <FlatList
        data={categories}
        renderItem={renderFliterItem}
        horizontal
        contentContainerStyle={styles.listStyle}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
  const renderStubs = () => (
    <View style={styles.stubsStyle}>
      <ActivityIndicator color="#0000ff" />
    </View>
  );

  const renderStubContainer = () => (
    <FlatList
      horizontal
      data={[{id: 1}, {id: 2}, {id: 3}]}
      renderItem={renderStubs}
      contentContainerStyle={styles.marginStyle}
      showsHorizontalScrollIndicator={false}
    />
  );

  const renderNewsItem = ({item, index}) => <NewsCard item={item} />;
  const renderNews = () => {
    return JSON.stringify(data) === JSON.stringify([]) ? (
      renderStubContainer()
    ) : (
      <FlatList
        horizontal
        data={data}
        keyExtractor={item => item?.id}
        contentContainerStyle={styles.listStyle1}
        renderItem={renderNewsItem}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
      />
    );
  };
  const renderTopNewsItem = ({item, index}) => <NewsCard item={item} />;
  const renderTopNews = () => {
    return (
      <View style={{marginTop: 30}}>
        <Text style={styles.topNewsStyle}>{'Top News for you'}</Text>
        {JSON.stringify(topNews) === JSON.stringify([]) ? (
          renderStubContainer()
        ) : (
          <FlatList
            horizontal
            data={topNews}
            keyExtractor={item => item?.id}
            renderItem={renderTopNewsItem}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{marginLeft: 10}}
            scrollEventThrottle={16}
          />
        )}
      </View>
    );
  };
  return (
    <ScrollView scrollEventThrottle={16} style={styles.container}>
      <View>
        {renderTopContent()}
        {renderFilter()}
        {renderNews()}
        {renderTopNews()}
        <View style={{height: 80}} />
      </View>
    </ScrollView>
  );
}

export default memo(HomePage);
