import { queryVideoInfo, submitComment, getToken, createVideo } from '@/services/api';

export default {
  namespace: 'video',

  state: {
    commentList: [],
    videoDetail: {},
    recommend: [],
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
    *submitComment({ payload, onComplete }, { call }) {
      const response = yield call(submitComment, payload);
      onComplete(response);
    },
    *getToken({ payload }, { call }) {
      return yield call(getToken, payload);
    },
    *create({ payload }, { call }) {
      return yield call(createVideo, payload);
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
