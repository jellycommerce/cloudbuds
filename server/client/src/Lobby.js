import React from 'react';

const Lobby = ({
  username,
  handleUsernameChange,
  roomName,
  handleRoomNameChange,
  handleSubmit
}) => {
  return (
    <>
    <h2>Free video chat service for those affected<br/>by the COVID-19 pandemic</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          id="field"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Full Name"
          required
        />
      </div>

      <div>
        <input
          type="text"
          id="room"
          value={roomName}
          onChange={handleRoomNameChange}
          placeholder="Room ID"
          required
        />
      </div>

      <button type="submit">Enter Room</button>
    </form>
    </>
  );
};

export default Lobby;
