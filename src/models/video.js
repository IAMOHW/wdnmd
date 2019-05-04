import { queryVideoInfo } from '@/services/api';

export default {
  namespace: 'video',

  state: {
    title: '',
    avator: '',
    url: '',
    cover: '',
    online: 0,
    relatedVideo: [],
  },

  effects: {
    *fetch({ payload, onComplete }, { call, put }) {
      const response = yield call(queryVideoInfo, payload);
      yield put({
        type: 'queryInfo',
        payload: response || {},
      });
      onComplete(response);
    },
  },

  reducers: {
    queryInfo(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
