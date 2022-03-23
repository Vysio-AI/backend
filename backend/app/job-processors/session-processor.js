const prisma = require('../controllers/prisma-client')

const areSessionFramesConsecutive = (firstSessionFrame, secondSessionFrame) => {
  // TODO: We might need to add a variance value in case the endTime and
  //       start time don't line up perfectly
  const firstDate = new Date(firstSessionFrame.endTime);
  const secondDate = new Date(secondSessionFrame.startTime);
  return secondDate.getTime() - firstDate.getTime() < 1000;
}

const aggregateSessionFrames = async (sessionId) => {
  // Fetch existing session frames from db in order of their occurence
  const sessionFrames = await prisma.sessionFrame.findMany({
    where: {
      sessionId: sessionId,
    },
    orderBy: {
      startTime: 'asc'
    }
  });

  // Scan through session frames and aggregate consequtive ones with the same
  // exerciseId
  let aggregatedSessionFrames = [];
  let startSessionFrame = sessionFrames[0];
  let endSessionFrame = sessionFrames[0];

  for (const sessionFrame of sessionFrames.slice(1)) {
    if (
      sessionFrame.exerciseId == startSessionFrame.exerciseId &&
      areSessionFramesConsecutive(endSessionFrame, sessionFrame)
    ) {
      endSessionFrame = sessionFrame;
      continue;
    }

    const aggregatedSessionFrame = {
      startTime: startSessionFrame.startTime,
      endTime: endSessionFrame.endTime,
      exerciseId: startSessionFrame.exerciseId,
      sessionId: sessionId,
    }

    aggregatedSessionFrames.push(aggregatedSessionFrame);

    startSessionFrame = endSessionFrame = sessionFrame;
  }

  aggregatedSessionFrames.push({
    startTime: startSessionFrame.startTime,
    endTime: endSessionFrame.endTime,
    exerciseId: startSessionFrame.exerciseId,
    sessionId: sessionId,
  });

  // Update database by deleting all old session frames and creating new
  // aggregated ones
  const deleteSessionFrames = prisma.sessionFrame.deleteMany({
    where: {
      sessionId: sessionId,
    }
  });

  const addSessionFrames = prisma.sessionFrame.createMany({
    data: aggregatedSessionFrames,
  });

  await prisma.$transaction([deleteSessionFrames, addSessionFrames]);

  console.log(`Session ${sessionId}: Condensed ${sessionFrames.length} session frames into ${aggregatedSessionFrames.length} session frames`);
}

module.exports = {
  aggregateSessionFrames,
}
