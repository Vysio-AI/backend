const prisma = require('../controllers/prisma-client');
const moment = require('moment');

const timeConversions = {
  'DAILY': 'days',
  'WEEKLY': 'weeks',
}

const createEmptyCompletionObject = (plan) => {
  let completion = {}

  plan.exercises.forEach((exercise) => {
    completion[exercise.activityType] = {
      required: exercise.duration,
      completed: 0
    }
  });

  return completion
}

const isSessionMetricComplete = (sessionMetric) => {
  for (const [_activityType, data] of Object.entries(sessionMetric)) {
    if (data.completed < data.required) {
      return false;
    }
  }

  return true;
}

const updateSessionMetricCompletion = async (sessionMetric, session) => {
  const sessionFrames = await prisma.sessionFrame.findMany({
    where: {
      sessionId: session.id,
    },
    include: {
      exercise: true,
    }
  });

  sessionFrames.forEach((sessionFrame) => {
    const sessionFrameLength = moment(sessionFrame.endTime).diff(moment(sessionFrame.startTime), 'seconds');
    sessionMetric.data[sessionFrame.exercise.activityType] += sessionFrameLength;
  });

  sessionMetric.complete = isSessionMetricComplete(sessionMetric);

  return sessionMetric
}

const updateSessionMetrics = async (session) => {
  // Query if there's already a session metric object for current time range
  const currentSessionMetric = await prisma.sessionMetric.findFirst({
    where: {
      clientId: session.clientId,
      planId: session.planId,
      startTime: {
        lt: session.startTime,
      },
      endTime: {
        gt: session.startTime,
      },
    },
  });

  // If no currentSessionMetric found, create new one
  if (!currentSessionMetric) {
    console.log("No current session metric");
    const mostRecentSessionMetrics = await prisma.sessionMetric.findMany({
      take: 1,
      where: {
        clientId: session.clientId,
        planId: session.planId
      },
      orderBy: [
        {
          startTime: 'desc',
        },
      ],
    });

    const plan = await prisma.plan.findUnique({
      where: {
        id: session.planId,
      },
      include: {
        exercises: true,
      },
    });

    console.log(mostRecentSessionMetrics);
    console.log(plan);

    let newSessionMetric = {
      startTime: null,
      endTime: null,
      planId: session.planId,
      clientId: session.clientId,
      complete: false,
      data: createEmptyCompletionObject(plan),
    }

    console.log(newSessionMetric);
    console.log(newSessionMetric.data);

    if (mostRecentSessionMetrics.length > 0) {
      const mostRecentSessionMetric = mostRecentSessionMetrics[0];
      let newStartTime = moment(mostRecentSessionMetric.startTime);
      let newEndTime = moment(mostRecentSessionMetric.endTime);
      const currentTime = moment(session.startTime);

      // Increase start and end time by the interval specified by the plan until
      // the current session startTime is in between them
      do {
        newStartTime = newStartTime.add(1/plan.repetitions, timeConversions[plan.timeframe]);
        newEndTime = newEndTime.add(1/plan.repetitions, timeConversions[plan.timeframe]);
      } while (!currentTime.isBetween(newStartTime, newEndTime))

      newSessionMetric.startTime = newStartTime;
      newSessionMetric.endTime = newEndTime;
    } else {
      const newStartTime = moment(session.startTime).startOf('day');
      newSessionMetric.startTime = newStartTime.format();
      newSessionMetric.endTime = newStartTime.add(1/plan.repetitions, timeConversions[plan.timeframe]).format();
    }

    // let newSessionMetric = {
    //   startTime: newStartTime,
    //   endTime: newEndTime,
    //   planId: session.planId,
    //   clientId: session.clientId,
    //   complete: false,
    //   data: createEmptyCompletionObject(plan),
    // }

    console.log(newSessionMetric);

    newSessionMetric = await updateSessionMetricCompletion(newSessionMetric, session);

    await prisma.sessionMetric.create({
      data: newSessionMetric,
    });
  }
  else {
    sessionMetric = await updateSessionMetricCompletion(currentSessionMetric, session);

    await prisma.sessionMetric.update({
      where: {
        id: currentSessionMetric.id,
      },
      data: sessionMetric
    });
  }
}

module.exports = {
  updateSessionMetrics,
}
