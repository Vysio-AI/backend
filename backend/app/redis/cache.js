const prisma = require('../controllers/prisma-client');
const client = require('./index');

const activityTypeIndex = {
  PENDULUM: 0,
  ABDUCTION: 1,
  FORWARD_ELEVATION: 2,
  INTERNAL_ROTATION: 3,
  EXTERNAL_ROTATION: 4,
  TRAPEZIUS_EXTENSION: 5,
  UPRIGHT_ROW: 6
}

const createSessionKey = (clientId, sessionId, activityTypeIndex) => {
  return `${clientId}:${sessionId}:${activityTypeIndex}`
}

const addSession = async (clientId, session) => {
  const plan = await prisma.plan.findUnique({
    where: {
      id: session.planId,
    },
    include: {
      exercises: true,
    }
  });

  // Add relevant activityIndex/exerciseId mappings to redis
  await Promise.all(plan.exercises.map(async (exercise) => {
    const activityType = activityTypeIndex[exercise.activityType];
    const sessionKey = createSessionKey(clientId, session.id, activityType);
    await client.set(sessionKey, exercise.id);
  }));
}

const getExerciseId = async (clientId, sessionId, activityTypeIndex) => {
  const sessionKey = createSessionKey(clientId, sessionId, activityTypeIndex);

  const exerciseId = await client.get(sessionKey);
  return exerciseId ? parseInt(exerciseId) : exerciseId
}

module.exports = {
  addSession,
  getExerciseId,
}
