import React, { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import Lottie from "react-lottie";
import { useSelector } from "react-redux";
import { uniqueId } from "lodash";
import filesize from "filesize";
import { useDropzone } from "react-dropzone";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { useActions } from "../../redux/actions";
import MediaInfo from "mediainfo.js";

import animationData from "../../assets/lottie/success.json";
import animationData2 from "../../assets/lottie/success.json";

const welcomeLottie = {
  loop: false,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const sucsessLottie = {
  loop: false,
  autoplay: true,
  animationData: animationData2,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const Dropzone = ({ type, maxFiles, handleClose, handleCreate }) => {
  const classes = useStyles();
  const {
    UploadOn,
    UploadAddCurrent,
    UploadUpdateCurrent,
    UploadDeleteCurrent,
  } = useActions();
  const isUploading = useSelector((state) => state.uploadReducer.isUploading);
  const currentUploads = useSelector(
    (state) => state.uploadReducer.currentUploads
  );

  const typeFile = type === "video" ? "video/mp4" : "image/*";
  const suportedFilesText =
    type === "video"
      ? "Supported file formats are .mp4"
      : "Supported file formats are .jpg, .jpeg, .png";

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    noDragEventsBubbling: true,
    accept: typeFile,
    maxFiles: maxFiles,
  });

  const style = useMemo(
    () => ({
      ...(isDragActive && activeStyle),
      ...(isDragAccept && acceptStyle),
      ...(isDragReject && rejectStyle),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const toUint8Array = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = (e) => resolve(new Uint8Array(e.target.result));
      reader.onerror = (error) => reject(error);
    });

  async function convert(file) {
    return await toUint8Array(file);
  }

  const extractVideoInfo = async (file) => {
    if (type !== "video") return {};
    let mediaInfo = await MediaInfo({ format: "object" });
    const getSize = () => file.size;
    const readChunk = (chunkSize, offset) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target.error) reject(event.target.error);
          resolve(new Uint8Array(event.target.result));
        };
        reader.readAsArrayBuffer(file.slice(offset, offset + chunkSize));
      });

    let info = await mediaInfo.analyzeData(getSize, readChunk);

    const noAudio =
      info?.media?.track?.filter((t) => t["@type"] === "Audio")?.length < 1 ||
      false;
    const general = info?.media?.track?.filter(
      (t) => t["@type"] === "General"
    )[0] || { Duration: "0" };
    const videoLength = parseInt(general.Duration);
    const videoTrack = info?.media?.track?.filter(
      (t) => t["@type"] === "Video"
    )[0] || { Width: "0", Height: "0" };
    let isPortrait = parseInt(videoTrack.Height) > parseInt(videoTrack.Width);
    if (
      parseInt(videoTrack.Rotation) === 90 ||
      parseInt(videoTrack.Rotation) === 270
    )
      isPortrait = !isPortrait;
    return {
      noAudio,
      length: videoLength,
      width: parseInt(videoTrack.Width),
      height: parseInt(videoTrack.Height),
      isPortrait,
    };
  };

  const handleUpload = async (files) => {
    if (files.length < 1) return;
    if (currentUploads.length + files.length > 10) {
      return alert(
        "To maintain performance we have limited the maximum simultaneous uploads to 10 at a time. Please select 10 of less files and try again"
      );
    }
    const parseFiles = await files.map(async (file) => {
      const { length, width, height, noAudio } = await extractVideoInfo(file);
      return {
        ...{
          fileBinary: await convert(file),
          id: uniqueId(),
          name: file.name,
          readableSize: filesize(file.size),
          progress: 0,
          uploaded: false,
          error: false,
          status: "draft",
          publishDate: new Date(),
          title: "title here",
          subtitle: "subtitle here",
          description: "description here",
          contentType: file.type,
          onProgress: UploadUpdateCurrent,
        },
        ...{
          length,
          width,
          height,
          noAudio,
        },
      };
    });

    (async () => {
      const uploadedFiles = await Promise.all(parseFiles);
      const uploadedFilesRedux = uploadedFiles.map((file) => ({
        ...file,
        ...{ fileBinary: null },
      }));

      if (uploadedFiles.length > 0) {
        UploadAddCurrent(uploadedFilesRedux);
        UploadOn();
        let { error } = await handleCreate(uploadedFiles);
        if (error)
          console.log("", error.response ? error.response.data : error);
        setTimeout(() => handleClose(), 2000);
      }
    })();
  };

  useEffect(() => {
    handleUpload(acceptedFiles);

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acceptedFiles]);

  return (
    <div className={classes.root}>
      <div {...getRootProps({ className: "dropzone", style: baseStyle })}>
        <input {...getInputProps()} />
        {!isUploading ? (
          <div>
            <Lottie options={welcomeLottie} height={200} width={200} />
            <Typography variant="h3" align="center" style={{ marginTop: 20 }}>
              Drag your files here to begin uploading!
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              style={{ marginTop: 5, ...style }}
            >
              {suportedFilesText}
            </Typography>
          </div>
        ) : (
          <div>
            <Lottie options={sucsessLottie} height={200} width={200} />
            <Typography
              variant="subtitle1"
              align="center"
              style={{ marginTop: 5, ...style }}
            >
              {suportedFilesText}
            </Typography>
            {currentUploads &&
              currentUploads.length > 0 &&
              currentUploads.map((file) => {
                const { name, id, readableSize } = file;
                const formatText = `${id}. ${name} - ${readableSize}`;

                return (
                  <Typography
                    key={id}
                    variant="h3"
                    align="center"
                    style={{ marginTop: 20 }}
                  >
                    {formatText}
                  </Typography>
                );
              })}
            <div>
              <Typography
                variant="subtitle1"
                align="center"
                style={{ marginTop: 5 }}
              >
                &nbsp;
              </Typography>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "column",
  },
  wrapper: {
    //backgroundColor: "rgba(50, 50, 50, .4)",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 200,
  },
  Hover: {
    position: "absolute",
    top: "50%",
    right: 0,
    left: 0,
    textAlign: "center",
    color: "grey",
    fontSize: 36,
  },
}));

const baseStyle = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  transition: "border .24s ease-in-out",
  height: "100%",
  width: "100%",
  justifyContent: "space-around",
  flexDirection: "column",
};

const activeStyle = {
  color: "#0D0D0E",
};

const acceptStyle = {
  color: "#63D471",
};

const rejectStyle = {
  color: "#B10606",
};

Dropzone.propTypes = {
  type: PropTypes.string.isRequired,
  maxFiles: PropTypes.string.isRequired,
};

export default Dropzone;
