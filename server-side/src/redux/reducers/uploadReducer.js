import {
  UPLOAD_ADD_CURRENT,
  UPLOAD_UPDATE_CURRENT,
  UPLOAD_MODAL_CLOSE,
  UPLOAD_MODAL_OPEN,
  UPLOAD_OFF,
  UPLOAD_ON,
  UPLOAD_DELETE_CURRENT,
} from "../types";

const upload = {
  isUploading: false,
  uploadModalOpen: false,
  currentUploads: [],
};

export default (state = upload, action) => {
  switch (action.type) {
    case UPLOAD_ON:
      return { ...state, isUploading: true };
    case UPLOAD_OFF:
      return { ...state, isUploading: false };
    case UPLOAD_MODAL_OPEN:
      return { ...state, uploadModalOpen: true };
    case UPLOAD_MODAL_CLOSE:
      return { ...state, uploadModalOpen: false };
    case UPLOAD_ADD_CURRENT:
      const currentUploads = [...state.currentUploads, ...action.payload];
      return { ...state, currentUploads };
    case UPLOAD_UPDATE_CURRENT:
      const updateUploads = state.currentUploads.map((file) => {
        return action.payload.id === file.id
          ? { ...file, ...action.payload.data }
          : file;
      });
      return { ...state, ...{ currentUploads: updateUploads } };
    case UPLOAD_DELETE_CURRENT:
      const newUploads = state.currentUploads.filter(
        (file) => action.payload.id !== file.id
      );
      return { ...state, currentUploads: newUploads };
    default:
      return state;
  }
};
