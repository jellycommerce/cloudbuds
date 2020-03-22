import React, { useState, useEffect, useRef } from 'react';
import { muteYourAudio, muteYourVideo, unmuteYourAudio, unmuteYourVideo } from './Helpers'

const Participant = ({ participant, room }) => {
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);

  const [muteCamera, setMuteCamera] = useState(false);
  const [muteMic, setMuteMic] = useState(false);

  const videoRef = useRef();
  const audioRef = useRef();

  const trackpubsToTracks = trackMap => Array.from(trackMap.values())
    .map(publication => publication.track)
    .filter(track => track !== null);

  useEffect(() => {
    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    const trackSubscribed = track => {
      if (track.kind === 'video') {
        setVideoTracks(videoTracks => [...videoTracks, track]);
      } else {
        setAudioTracks(audioTracks => [...audioTracks, track]);
      }
    };

    const trackUnsubscribed = track => {
      if (track.kind === 'video') {
        setVideoTracks(videoTracks => videoTracks.filter(v => v !== track));
      } else {
        setAudioTracks(audioTracks => audioTracks.filter(a => a !== track));
      }
    };

    participant.on('trackSubscribed', trackSubscribed);
    participant.on('trackUnsubscribed', trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);

  useEffect(() => {
    if (muteCamera) {
      muteYourVideo(room);
    } else {
      unmuteYourVideo(room);
    }
  }, [muteCamera, room]);

  useEffect(() => {
    if (muteMic) {
      muteYourAudio(room);
    } else {
      unmuteYourAudio(room);
    }
  }, [muteMic, room]);

  const handleCamera = (ev) => {
    ev.preventDefault();
    setMuteCamera(!muteCamera);
  }

  const handleMic = (ev) => {
    ev.preventDefault();
    setMuteMic(!muteMic);
  }

  return (
    <div className="video-wrapper">
      <button className="icon-camera" onClick={handleCamera}>
        {muteCamera ? (
          <svg version="1.1" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <g fill="#fff">
              <path d="M8.67188,0l-2.5,2.19617v-1.19617c0,-0.552307 -0.447693,-1 -1,-1h-5.17188l10,10h0.171875v-5v-5h-1.5Z" transform="translate(5.82812, 3)"/>
            </g>
            <path d="M0,1.41406l1.58594,1.58594h-0.585938c-0.552307,0 -1,0.447693 -1,1v8c0,0.552246 0.447693,1 1,1h10c0.169128,0 0.320496,-0.0528564 0.45813,-0.127808l3.12781,3.12781l1.41406,-1.41406l-14.5859,-14.5859l-1.41406,1.41406Z" fill="#fff"/>
          </svg>
        ) : (
          <svg version="1.1" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <g fill="#fff">
              <path d="M14.5,0l-2.5,2.19617v-1.19617c0,-0.552307 -0.447693,-1 -1,-1h-10c-0.552307,0 -1,0.447693 -1,1v8c0,0.552246 0.447693,1 1,1h10c0.552307,0 1,-0.447754 1,-1v-1.19623l2.5,2.19623h1.5v-5v-5h-1.5Z" transform="translate(0, 3)"/>
            </g>
          </svg>
        )}
      </button>
      <button className="icon-mic" onClick={handleMic}>
        {muteMic ? (
          <svg version="1.1" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <g fill="#fff">
              <path d="M2.42102,1v-1h-2v1c0,0.630676 -0.159912,1.21973 -0.421021,1.75085l1.46533,1.46533c0.597473,-0.931091 0.955689,-2.02911 0.955689,-3.21619Z" transform="translate(11.579, 6)"/><path d="M5.90021,7v-4c0,-1.6543 -1.3457,-3 -3,-3c-1.40179,0 -2.57257,0.970154 -2.90021,2.27167l5.71887,5.71887c0.109985,-0.311707 0.181335,-0.641663 0.181335,-0.99054Z" transform="translate(5.09979, 0)"/><path d="M16,14.5859l-14.5859,-14.5859l-1.41406,1.41406l5,5v0.585938c0,1.6543 1.3457,3 3,3c0.182251,0 0.358154,-0.0227661 0.530701,-0.0552368l0.811951,0.811951c-0.420471,0.152344 -0.869812,0.243286 -1.34265,0.243286c-2.20557,0 -4,-1.79443 -4,-4v-1h-2v1c0,2.9671 2.16699,5.43127 5,5.90967v3.09033h2v-3.09027c0.659851,-0.111389 1.27502,-0.343445 1.84149,-0.654175l3.74445,3.74445l1.41406,-1.41406Z"/>
            </g>
          </svg>
        ) : (
          <svg version="1.1" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <g fill="#fff">
              <path d="M10,0v1c0,2.20557 -1.79443,4 -4,4c-2.20557,0 -4,-1.79443 -4,-4v-1h-2v1c0,2.9671 2.16699,5.43127 5,5.90967v3.09033h2v-3.09027c2.83331,-0.47821 5,-2.94244 5,-5.90973v-1h-2Z" transform="translate(2, 6)"/><path d="M3,10c1.6543,0 3,-1.3457 3,-3v-4c0,-1.6543 -1.3457,-3 -3,-3c-1.6543,0 -3,1.3457 -3,3v4c0,1.6543 1.3457,3 3,3Z" transform="translate(5, 0)"/>
            </g>
          </svg>
        )}
      </button>
      <h3>{participant.identity}</h3>
      <video ref={videoRef} autoPlay={true} />
      <audio ref={audioRef} autoPlay={true} muted={false} />
    </div>
  );
};

export default Participant;
