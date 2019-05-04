import { queryVideoList } from '@/services/api';

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
  },

  reducers: {
    queryList(state, action) {
      const { payload } = action;
      return {
        ...state,
        ...payload,
        videoList: state.videoList.concat(payload.videoList),
        hasMore: payload.nextOffset !== null,
        loading: false,
      };
    },
    loading(state) {
      return { ...state, loading: true };
    },
  },
};
