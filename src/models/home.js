import { queryVideoList, deleteVideo } from '@/services/api';

export default {
  namespace: 'home',

  state: {
    videoList: [],
    loading: false,
    hasMore: true,
    nextOffset: 0,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({ type: 'loading' });
      const response = yield call(queryVideoList, payload);
      yield put({
        type: 'queryList',
        payload: response || {},
      });
    },
    *deleteVideo({ payload, onComplete }, { call }) {
      const response = yield call(deleteVideo, payload);
      onComplete(response);
    },
  },

  reducers: {
    queryList(state, action) {
      const { payload } = action;
      return {
        ...state,
        ...payload,
        hasMore: payload.nextOffset !== null,
        loading: false,
      };
    },
    loading(state) {
      return { ...state, loading: true };
    },
  },
};
