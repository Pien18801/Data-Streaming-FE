import React from 'react'
import {
    useRecordWebcam
} from "react-record-webcam";
import Header from './Header';

// import { ref, uploadBytes } from "firebase/storage";
// import { storage } from '../firebase/firebase-config';

const OPTIONS = {
    filename: "test-filename",
    fileType: "mp4",
    width: 639,
    height: 379
};

export default function WebcamRecord() {
    const recordWebcam = useRecordWebcam(OPTIONS);
    // const [source, setSource] = useState();

    const getRecordingFileHooks = async () => {
        const blob = await recordWebcam.getRecording();
        // const storageRef = ref(storage, 'child');
        // // 'file' comes from the Blob or File API
        // uploadBytes(storageRef, blob).then((snapshot) => {
        //   console.log('Uploaded a blob or file!');
        // });
        var file = new File([blob], "test.mp4", {
            lastModified: new Date().getTime(),
            type: "video/mp4"
        })
        // const url = URL.createObjectURL(file);
        // setSource(url);
        // console.log(file);

        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("http://localhost:8000/predict/", {
            method: "POST",
            body: formData,
        }).then((res) => res.json());
        if (res.prediction === "True") {
            console.log("true nha")
        } else {
            console.log("false me r")
        }
        console.log(res)
    };
    return (
        <>
            <Header />
            <div className='container'>
                <div style={{ display: 'flex', marginTop: '0.5rem', marginBottom: '0.25rem' }}>
                    <button className='btn'
                        style={{
                            display: `${recordWebcam.status === "OPEN" ||
                                recordWebcam.status === "RECORDING" ||
                                recordWebcam.status === "PREVIEW"
                                ? "none"
                                : "block"
                                }`
                        }}
                        onClick={recordWebcam.open}
                    >
                        <span className='btn_name'> Open camera </span>
                    </button>
                    <button className='btn'
                        style={{
                            display: `${recordWebcam.status === "CLOSED" ||
                                recordWebcam.status === "PREVIEW"
                                ? "none"
                                : "block"
                                }`
                        }
                        }
                        onClick={recordWebcam.close}
                    >
                        <span className='btn_name'> Close camera </span>
                    </button>
                    <button className='btn'
                        style={{
                            display: `${recordWebcam.status === "CLOSED" ||
                                recordWebcam.status === "RECORDING" ||
                                recordWebcam.status === "PREVIEW"
                                ? "none"
                                : "block"
                                }`
                        }}
                        onClick={recordWebcam.start}
                    >
                        <span className='btn_name'> Start recording </span>
                    </button>
                    <button className='btn'
                        style={{
                            display: `${recordWebcam.status !== "RECORDING"
                                ? "none"
                                : "block"
                                }`
                        }}
                        onClick={recordWebcam.stop}
                    >
                        <span className='btn_name'> Stop recording </span>
                    </button>
                    <button className='btn'
                        style={{
                            display: `${recordWebcam.status !== "PREVIEW"
                                ? "none"
                                : "block"
                                }`
                        }}
                        onClick={recordWebcam.retake}
                    >
                        <span className='btn_name'> Retake </span>
                    </button>
                    <button className='btn'
                        style={{
                            display: `${recordWebcam.status !== "PREVIEW"
                                ? "none"
                                : "block"
                                }`
                        }}
                        onClick={recordWebcam.download}
                    >
                        <span className='btn_name'> Download </span>
                    </button>
                    <button className='btn'
                        style={{
                            display: `${recordWebcam.status !== "PREVIEW"
                                ? "none"
                                : "block"
                                }`
                        }}
                        onClick={getRecordingFileHooks}
                    >
                        <span className='btn_name'> Get recording </span>
                    </button>
                </div>

                <video
                    ref={recordWebcam.webcamRef}
                    style={{
                        display: `${recordWebcam.status === "OPEN" ||
                            recordWebcam.status === "RECORDING"
                            ? "block"
                            : "none"
                            }`
                    }}
                    autoPlay
                    muted
                />
                <video
                    ref={recordWebcam.previewRef}
                    style={{
                        display: `${recordWebcam.status === "PREVIEW" ? "block" : "none"
                            }`
                    }}
                    controls
                />
            </div>

            {/* {source && (
            <video
              className="VideoInput_video"
              width={OPTIONS.width}
              height={OPTIONS.height}
              controls
              src={source}
            />
          )} */}
        </>
    )
}