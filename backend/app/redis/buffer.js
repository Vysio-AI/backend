const client = require('./index');

const BUFFER_WINDOW = 1000; // Buffer window time range in ms

const createBufferKey = (userId, sessionId) => {
  return `${userId}:${sessionId}:buffer`
}

const createBufferTimestampKey = (userId, sessionId) => {
  return `${userId}:${sessionId}:buffer-timestamp`
}

const stringifyArrayData = (arr) => {
  return arr.join(",")
}

// Formats and appends a data object to the buffer array
const appendToBuffer = async (userId, sessionId, timestamp, data) => {
  console.log(`Appending to buffer for userID ${userId}, sessionID ${sessionId}`)
  const key = createBufferKey(userId, sessionId);
  const timestampKey = createBufferTimestampKey(userId, sessionId);
  const dataString = stringifyArrayData(data);

  // Append data to buffer
  await client.RPUSH(key, dataString)
  await client.RPUSH(timestampKey, `${timestamp}`)

  // Success
  return true
}

// Formats and returns the data in the buffer
const flushBuffer = async (userId, sessionId) => {
  console.log(`Flushing buffer for userID ${userId}, sessionID ${sessionId}`)
  const key = createBufferKey(userId, sessionId);
  const timestampKey = createBufferTimestampKey(userId, sessionId);

  // Read the buffer data
  let bufferData = await client.LRANGE(key, 0, -1);

  // Read timestamp data
  let timestamps = await client.LRANGE(timestampKey, 0, -1);

  // Clear buffer by deleting key
  await client.DEL(key);
  await client.DEL(timestampKey)

  // Format and return the buffer data
  let formattedData = bufferData.map((el) => {
    return el.split(",").map(Number);
  })

  return {
    user_id: userId,
    session_id: sessionId,
    start_time: Number(timestamps[0]),
    end_time: Number(timestamps[timestamps.length - 1]),
    data: formattedData
  }
}

// Checks if the provided timestamp would be placed outside the window of
// the current buffer. This is used as a flag to decide when it is appropriate
// to flush the buffer
const isOutsideBufferWindow = async (userId, sessionId, timestamp) => {
  console.log(`Checking buffer range for userID ${userId}, sessionID ${sessionId}`)
  const key = createBufferKey(userId, sessionId);
  const timestampKey = createBufferTimestampKey(userId, sessionId);

  // Check if list is empty
  let bufferLen = await client.LLEN(key);

  if (bufferLen < 1) {
    return false
  }

  // Read first timestamp
  let firstTimestamp = await client.LINDEX(timestampKey, 0)
  let converted = Number(firstTimestamp)

  // Compare timestamps
  return timestamp - converted > BUFFER_WINDOW
}

module.exports = {
  appendToBuffer,
  flushBuffer,
  isOutsideBufferWindow
}