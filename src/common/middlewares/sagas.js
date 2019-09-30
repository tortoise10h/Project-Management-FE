
import {
  takeEvery,
  select,
  takeLatest
} from 'redux-saga/effects'
import {
  REHYDRATE
} from 'redux-persist'
import {
  fetchEnd,
  fetchStart,
  fetchSuccess,
  fetchFailure,
  loadStart,
  loadEnd
} from '../actions/session'
import PageLoading from '../components/widgets/PageLoading'
import ProgressLoading from '../components/widgets/ProgressLoading'

function * onFetchStart ({ payload: { config } }) {
  yield ProgressLoading.show()
  // console.log('Fetch Start', config)
}

function * onFetchSuccess ({ payload: { response, config } }) {
  yield ProgressLoading.hide()
  // console.log('Fetch Success', config)
}

function * onFetchFailure ({ payload: { error, config } }) {
  yield ProgressLoading.hide()
  // Notification.error(error.message)
  console.error(error)
}

function * watchFetchStart () {
  yield takeEvery(fetchStart.toString(), onFetchStart)
}
function * watchFetchSuccess () {
  yield takeEvery(fetchSuccess.toString(), onFetchSuccess)
}
function * watchFetchFailure () {
  yield takeEvery(fetchFailure.toString(), onFetchFailure)
}
function * watchFetchEnd () {
  yield takeEvery(fetchEnd.toString(), onFetchSuccess)
}

function * onLoadingChanged () {
  // TODO: Do something in redux when loading
  const isLoading = yield select(state => state.session.isLoading)
  const loadingCount = yield select(state => state.session.loadingCount)
  if (isLoading) {
    PageLoading.show()
  } else if (loadingCount === 0) {
    PageLoading.hide()
  }
}

function * watchLoadStart () {
  yield takeEvery(loadStart.toString(), onLoadingChanged)
}

function * watchLoadEnd () {
  yield takeEvery(loadEnd.toString(), onLoadingChanged)
}

export default [
  watchFetchEnd(),
  watchFetchStart(),
  watchFetchSuccess(),
  watchFetchFailure(),
  watchLoadStart(),
  watchLoadEnd()
]
