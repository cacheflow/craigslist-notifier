import AppConstants from '../constants/app-constants';
import _AppDispatcher from '../dispatchers/app-dispatcher';
import {createJob} from '../server/api';

const AppActions = {

  callServer(sentiment) {
   createJob();
  },

  updateClickedStatus() {
    _AppDispatcher.handleAction({
      type: AppConstants.UPDATE_CLICKED_STATUS,
      data: true
    });
  }
}

export {AppActions}
