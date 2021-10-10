const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const index = async (ctx) => {
  const allUsers = await prisma.user.findMany();
  ctx.body = allUsers;
  ctx.status = 200;
};

const create = async (ctx) => {
  try {
    const user = await prisma.user.create({
      data: ctx.request.body
    });
    ctx.body = {
      "message": "User successfully created",
      "user": user,
    }

  } catch {
    ctx.body = { 
      "error": 500,
      "message": "Error creating user",
    }
    ctx.status = 500;
  }  
}

module.exports = {
  index,
  create,
};
