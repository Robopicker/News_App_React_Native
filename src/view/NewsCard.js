/* eslint-disable no-shadow */
import React from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: '#F8F8F8',
    borderRadius: 24,
    marginHorizontal: 14,
    width: 270,
  },
  imageStyle: {height: 231, width: '100%', borderRadius: 20},
  titleTextStyle: {
    fontSize: 15,
    lineHeight: 20,
    color: 'grey',
    fontWeight: '600',
    width: 220,
  },
  iconStyle: {
    height: 24,
    width: 24,
  },
  timeStyle: {
    fontSize: 12,
    lineHeight: 16,
    marginTop: 2,
    color: 'grey',
    fontWeight: '400',
  },
  authorStyle: {
    fontSize: 16,
    lineHeight: 20,
    color: 'black',
    fontWeight: '600',
    width: 100,
  },
  userContentStyle: {
    flexDirection: 'row',
    marginVertical: 16,
    alignItems: 'center',
  },
  userStyle: {height: 38, width: 38, borderRadius: 19},
  paddingStyle: {marginLeft: 8, flex: 1},
  paddingStyle1: {padding: 12},
});
function NewsCard(props) {
  const {indexsData} = useSelector(({bookmark}) => bookmark);
  const dispatch = useDispatch();
  const {item, showBookMark = true} = props;
  const onBookMarkPressed = item => {
    dispatch({
      type: 'SAVE_BOOK_MARK_ITEM',
      payload: item,
    });
  };
  const renderUserContent = item => {
    const date = new Date(item?.publishedAt);
    const dateData = `${date.getDate()}/ ${date.getMonth()} / ${date.getFullYear()}`;
    return (
      <View style={styles.userContentStyle}>
        <Image
          source={require('../assest/user.png')}
          style={styles.userStyle}
          resizeMode="contain"
        />
        <View style={styles.paddingStyle}>
          <Text numberOfLines={1} style={styles.authorStyle}>
            {item?.author}
          </Text>
          <Text style={styles.timeStyle}>{dateData}</Text>
        </View>
        {showBookMark && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              onBookMarkPressed(item);
            }}>
            <Image
              source={require('../assest/bookmarkImage.png')}
              style={[
                styles.iconStyle,
                {tintColor: indexsData?.includes(item?.id) ? 'blue' : 'grey'},
              ]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };
  return (
    <View style={styles.containerStyle}>
      <View>
        <Image
          source={
            item?.urlToImage
              ? {uri: item?.urlToImage}
              : require('../assest/newsImage.png')
          }
          style={styles.imageStyle}
          resizeMode="cover"
        />
        <View style={styles.paddingStyle1}>
          <Text numberOfLines={2} style={styles.titleTextStyle}>
            {item?.title}
          </Text>
          {renderUserContent(item)}
        </View>
      </View>
    </View>
  );
}

export default NewsCard;
