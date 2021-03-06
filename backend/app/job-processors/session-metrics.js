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
  for (const [_activityType, data] of Object.entries(sessionMetric.data)) {
    if (data.completed < data.required) {
      return false;
    }
  }

  return true;
}

const updateSessionMetricData = async (sessionMetric, session) => {
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
    sessionMetric.data[sessionFrame.exercise.activityType].completed += sessionFrameLength;
  });

  sessionMetric.complete = isSessionMetricComplete(sessionMetric);

  return sessionMetric
}

const computeSubsequentStartTime = (mostRecentStartTime, sessionStartTime, plan) => {
  const slideLength = 1/plan.repetitions;
  const slideUnit = timeConversions[plan.timeframe];

  const currentTime = moment(sessionStartTime);
  let subsequentStartTime = moment(mostRecentStartTime);
  let subsequentEndTime = moment(subsequentStartTime).add(slideLength, slideUnit);

  do {
    subsequentStartTime.add(slideLength, slideUnit);
    subsequentEndTime.add(slideLength, slideUnit);
  } while (!currentTime.isBetween(subsequentStartTime, subsequentEndTime))

  return subsequentStartTime
}

const createCurrentSessionMetric = async (mostRecentSessionMetric, session) => {
  const plan = await prisma.plan.findUnique({
    where: {
      id: session.planId,
    },
    include: {
      exercises: true,
    },
  });

  let startTime = mostRecentSessionMetric ?
    computeSubsequentStartTime(mostRecentSessionMetric.startTime, session.startTime, plan) :
    moment(session.startTime).startOf('hour');
  const endTime = moment(startTime).add(1/plan.repetitions, timeConversions[plan.timeframe]);

  const completionObj = createEmptyCompletionObject(plan);

  const sessionMetric = await prisma.sessionMetric.create({
    data: {
      startTime: startTime.format(),
      endTime: endTime.format(),
      planId: session.planId,
      clientId: session.clientId,
      data: JSON.stringify(completionObj)
    }
  });

  sessionMetric.data = JSON.parse(sessionMetric.data);

  return sessionMetric;
}

const isCurrentSessionMetric = (sessionMetric, sessionStartTime) => {
  return moment(sessionStartTime).isBetween(
    moment(sessionMetric.startTime),
    moment(sessionMetric.endTime)
  )
}

const updateSessionMetrics = async (session) => {
  const mostRecentSessionMetric = await prisma.sessionMetric.findFirst({
    where: {
      clientId: session.clientId,
      planId: session.planId,
    },
    orderBy: [
      {
        startTime: 'desc',
      },
    ],
  });

  if (mostRecentSessionMetric) {
    mostRecentSessionMetric.data = JSON.parse(mostRecentSessionMetric.data);
  }

  let currentSessionMetric = (mostRecentSessionMetric && isCurrentSessionMetric(mostRecentSessionMetric, session.startTime)) ?
    mostRecentSessionMetric :
    await createCurrentSessionMetric(mostRecentSessionMetric, session);

  const updatedSessionMetricData = await updateSessionMetricData(currentSessionMetric, session);

  updatedSessionMetricData.data = JSON.stringify(updatedSessionMetricData.data);
  const sessionMetric = await prisma.sessionMetric.update({
    where: {
      id: currentSessionMetric.id,
    },
    data: updatedSessionMetricData
  });

  return sessionMetric;
}

module.exports = {
  updateSessionMetrics,
}
