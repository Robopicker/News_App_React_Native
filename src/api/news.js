import {Alert} from 'react-native';
import {newsRequest, topNewsRequest} from '../server/newsRequest';

export const fetchNews = type => (dispatch, _) => {
  dispatch({
    type: 'SAVE_NEWS',
    payload: [],
  });
  return newsRequest(type)
    .then(response => {
      if (response !== {} && response !== undefined) {
        const data = response.articles.map((item, index) => {
          return {
            ...item,
            id: `${type}_${index}`,
          };
        });
        dispatch({
          type: 'SAVE_NEWS',
          payload: data.filter(item => item?.description !== null),
        });
      }
    })
    .catch(() => {
      Alert.alert('something went wronf');
    });
};

export const fetchTopNews = type => (dispatch, _) => {
  return topNewsRequest()
    .then(response => {
      if (response !== {} && response !== undefined) {
        const data = response.articles.map((item, index) => {
          return {
            ...item,
            id: `${type}_${index}`,
          };
        });
        dispatch({
          type: 'SAVE_TOP_NEWS',
          payload: data.filter(item => item?.description !== null),
        });
      }
    })
    .catch(() => {
      Alert.alert('something went wronf');
    });
};
