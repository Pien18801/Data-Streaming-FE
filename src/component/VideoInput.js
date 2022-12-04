import React, { useState } from "react";
import Header from "./Header";
// import { ref, uploadBytes } from "firebase/storage";
// import { storage } from '../firebase/firebase-config';

export default function VideoInput(props) {
  const { width, height } = props;

  const inputRef = React.useRef();

  const [source, setSource] = useState();
  const [file, setFile] = useState();
  const [predict, setPredict] = useState("");

  const handlePredict = async () => {
    // console.log(file)
    // const form = new FormData();
    // form.append(file, "file");
    // console.log(form)
    // try {
    //   const res = await dispatch(getPredict(form)).unwrap();
    //   console.log(res);

    // } catch (err) {
    //   alert("Vui lòng kiểm tra lại các thông tin cho chính xác !");
    // }

    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("http://localhost:8000/predict/", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
    if (res.prediction === "True") {
      setPredict("True");
    }
    if (res.prediction === "False") {
      setPredict("False");
    }
    // console.log(res)
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(event.target.files[0]);
    const url = URL.createObjectURL(file);
    setSource(url);
    setPredict("")
    // uploadFile(file);
  };

  const uploadVideo = () => {
    if (file === undefined) {
      alert("Bạn chưa chọn file!! Hãy chọn 1 file trước khi upload");
    } else {
      if (file.size < 10485760) {
        // uploadFile(file);
        handlePredict()
      } else {
        alert("Vui lòng chọn file dưới 10MB");
      }
    }
  }

  // const uploadFile = (file) => {
  //   const storageRef = ref(storage, file.name);
  //   uploadBytes(storageRef, file).then((snapshot) => {
  //     console.log('Uploaded a blob or file!');
  //   });
  // }


  // const handleChoose = (event) => {
  //   inputRef.current.click();
  // };

  return (
    <>
      <Header />
      <div className='container'>
        <div className="VideoInput">
          <div className="grBtn">
            <div className="wrapChooseImg">
              <input
                ref={inputRef}
                className="chooseFile "
                type="file"
                onChange={handleFileChange}
                accept=".mov,.mp4"
              />
              <button className="btnWhite">Choose Video</button>
            </div>

            <button className="btn" onClick={uploadVideo}><span className='btn_name'> Upload </span></button>
          </div>


          {/* {!source && <button onClick={handleChoose}>Choose</button>} */}
          {source && (
            <video
              className="VideoInput_video"
              width={width}
              height={height}
              controls
              src={source}
            />

          )}
          {/* <div className="VideoInput_footer">{source || "Nothing selected"}</div> */}
        </div>

        {predict && (
          predict === "True"
            ? (<>
              <div className="tag_pre">
                <span className="violen"> Phát hiện hành vi bạo lực</span>
              </div>
            </>)
            : (<>
              <div className="tag_pre">
                <span className="non_violen"> Không phát hiện hành vi bạo lực</span>
              </div>
            </>)
        )}
      </div>
    </>
  );
}