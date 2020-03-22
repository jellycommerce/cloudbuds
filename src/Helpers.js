
export const muteOrUnmuteYourMedia = (room, kind, action) => {
  const publications = kind === 'audio'
    ? room.localParticipant.audioTracks
    : room.localParticipant.videoTracks;

  publications.forEach(function(publication) {
    if (action === 'mute') {
      publication.track.disable();
    } else {
      publication.track.enable();
    }
  });
}

export const muteYourAudio = (room) => {
  muteOrUnmuteYourMedia(room, 'audio', 'mute');
}

export const muteYourVideo = (room) => {
  muteOrUnmuteYourMedia(room, 'video', 'mute');
}

export const unmuteYourAudio = (room) => {
  muteOrUnmuteYourMedia(room, 'audio', 'unmute');
}

export const unmuteYourVideo = (room) => {
  muteOrUnmuteYourMedia(room, 'video', 'unmute');
}

export const participantMutedOrUnmutedMedia = (room, onMutedMedia, onUnmutedMedia) => {
  room.on('trackSubscribed', function(track, publication, participant) {
    track.on('disabled', function() {
      return onMutedMedia(track, participant);
    });
    track.on('enabled', function() {
      return onUnmutedMedia(track, participant);
    });
  });
}
