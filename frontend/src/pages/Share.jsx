import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiInstance from "../utils/axios";
export default function SharePage() {
  const [fileData, setFileData] = useState("");
  const { code } = useParams();
  const navigate = useNavigate();
  let shareCode = "";

  useEffect(() => {
    getFiles();
  }, [shareCode]); // Add code as a dependency to useEffect

  const getFiles = () => {
    shareCode = code.toString();
    apiInstance
      .get(`/${shareCode}`)
      .then((res) => res.data)
      .then((data) => {
        setFileData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /// Copy to Clipboard //////////////
  const copyToClipboard = (value) => {
    navigator.clipboard.writeText(value);
    alert("Link Copied to ClipBoard");
  };

  // Convert Date //////////////////////////
  const dowloadFile = async (uid) => {
      try {
        const response = await apiInstance.get(`file${uid}`);
  
        const fileData = await response.json();
        const fileUrl = fileData.file;
        const fileResponse = await fetch(fileUrl);
  
        if (!fileResponse.ok) {
          const errorMessage = await fileResponse.text();
          console.error('File response error:', errorMessage);
          throw new Error("Network response was not ok");
        }
  
        const data = await fileResponse.blob();
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
         link.href = url;
        link.setAttribute('download', fileData.filename);
        document.body.appendChild(link);
        link.click();
    
      } catch (error) {
        console.error(error);
      }
    }

  const openLink = (value) => {
    alert("You will leave this page");
    window.open(value, "_blank");
  };
  return (
    <>
    
      <div id="curve" key={fileData.uid} className="share-card">
        <embed
          src={`http://127.0.0.1:8000/${fileData.file}`}
          type=""
          id="embed-img"
        />
        <div className="footer">
          <div className="connections" >
          <div className="connection see" onClick={() => openLink(fileData.file)}>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABkklEQVR4nO2WvUoDQRSFPwsjoomk8wHEUpNgL9aKnVjYii/hT2FEIwgS8hBKgp1gY6ddYpGHWPNjKRKrRAZuYBj3zu5iRIs9cJs7557D3Duzs5AixT/AGlAGHoEOMJDoSO4UKE3ScBt4AUYxowls/cRwGXhIYOjGPbCU1HQX+AgR6wGHQAGYkygCR7Lm8t+BnTiGU8A5MAwRqQNZT61Za4TUGa0z0VZNa0rb6r5CRyPMfARUNY0rpaAXsVMXOaCvaF265APPITEztZERgVcgACqSs3Hs0dsfk1aBTw/RrNuohHBMzkbRozcAVgypFXEt3DYHIRyTs5GN0GwZUvsXjHMRmm1D2lCuzzgKMVp9kaDVQ2B9TKx6iObjYCMj5oHncJ149K5dsecJXacF4E3RegKm3YK8Z96NBB+QO89c81rhorwumnkuYqeaaVO0vZgFbhWBvnwczLs7L1GSmWrtvRHNWDAt21OuTtwIRCPOiL4hKy+LthutK+WEB1LFDLApr5c5/V3r16cruZpwDDdFCv4MXw/YJO5+W1zLAAAAAElFTkSuQmCC"></img>
            </div>

            <div className="connection download" >
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAg0lEQVR4nO2UOwqAMBBE3zWsLCxsLLSw8vYGPYSghYVgIR4hErAQ/58EQfNgIBCYIRN24U9kgBwlTATImWzAAmkr+l5F1Yrplso7ATHQnTDvgeTuKyKg3TFXdyEP8YF6xbwBAjThAsXEXP2Ph2YcIB+3qjpb9CMuDJY8kDAdkBoo4CUG+aZ0PJTVTQsAAAAASUVORK5CYII=" 
                onClick={() => 
                  dowloadFile(fileData.uid)}
              />
            </div>
            <div className="connection share">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5ElEQVR4nO2UOwrCQBCGv0oIWJjCgOmscgf1MkEbvUEOIB5HWysPYKeF2krsBe0jgQksy+a1YQvFH7YYZvf/Zmcf8BcsgcBVI1ZABpxdQYbASSAXYPQVEB+IgR1wBd5innVtlwckwFMzzJoCigkmhcBRmbMHFkAEjMW0tvoyQAjcJZe3ZKbkgqbmZQBPqfwADLpcUxMgUW6Hbt76oekAXzlQtS3W0gGxcqC4AGwlnrsC3CSOXAFeEvddAaoeXpVK19kaNvZ5SGKCvabikZqSm5pPLGsx1iZATyDFTmxGKua514/oA2Jde6sWveH4AAAAAElFTkSuQmCC"
                onClick={() =>
                  copyToClipboard(`http://localhost:5173/file${fileData.uid}`)
                }
              />
            </div>
          </div>
          <svg id="curve">
            <path
              id="p"
              d="M0,200 Q80,100 400,200 V150 H0 V50"
              transform="translate(0 300)"
            />
            <rect
              id="dummyRect"
              x={0}
              y={0}
              height={450}
              width={400}
              fill="transparent"
            />
            {/* slide up*/}
            <animate
              xlinkHref="#p"
              attributeName="d"
              to="M0,50 Q80,100 400,50 V150 H0 V50"
              fill="freeze"
              begin="dummyRect.mouseover"
              end="dummyRect.mouseout"
              dur="0.1s"
              id="bounce1"
            />
            {/* slide up and curve in */}
            <animate
              xlinkHref="#p"
              attributeName="d"
              to="M0,50 Q80,0 400,50 V150 H0 V50"
              fill="freeze"
              begin="bounce1.end"
              end="dummyRect.mouseout"
              dur="0.15s"
              id="bounce2"
            />
            {/* slide down and curve in */}
            <animate
              xlinkHref="#p"
              attributeName="d"
              to="M0,50 Q80,80 400,50 V150 H0 V50"
              fill="freeze"
              begin="bounce2.end"
              end="dummyRect.mouseout"
              dur="0.15s"
              id="bounce3"
            />
            {/* slide down and curve out */}
            <animate
              xlinkHref="#p"
              attributeName="d"
              to="M0,50 Q80,45 400,50 V150 H0 V50"
              fill="freeze"
              begin="bounce3.end"
              end="dummyRect.mouseout"
              dur="0.1s"
              id="bounce4"
            />
            {/* curve in */}
            <animate
              xlinkHref="#p"
              attributeName="d"
              to="M0,50 Q80,50 400,50 V150 H0 V50"
              fill="freeze"
              begin="bounce4.end"
              end="dummyRect.mouseout"
              dur="0.05s"
              id="bounce5"
            />
            <animate
              xlinkHref="#p"
              attributeName="d"
              to="M0,200 Q80,100 400,200 V150 H0 V50"
              fill="freeze"
              begin="dummyRect.mouseout"
              dur="0.15s"
              id="bounceOut"
            />
          </svg>
          <div className="info" >
            <div className="name">
              {fileData.file_name}
            </div>
          </div>
        </div>
        <div className="share-card-blur" />
      </div>
    </>
  );
}