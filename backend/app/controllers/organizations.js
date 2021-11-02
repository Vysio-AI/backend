const prisma = require('./prisma-client');

const index = async (ctx) => {
  const allOrganizations = await prisma.organization.findMany();

  ctx.body = {
    data: allOrganizations
  };
  ctx.status = 200;
};

const create = async (ctx) => {
  const organization = await prisma.organization.create({
    data: {
      ...ctx.request.body
    }
  });

  ctx.body = {
    data: organization
  };
  ctx.status = 200
}

const get = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const organization = await prisma.organization.findUnique({
    where: {
      id: id
    }
  });

  ctx.body = {
    data: organization
  };
  ctx.status = 200;
}

const update = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const updateOrganization = await prisma.organization.update({
    where: {
      id: id
    },
    data: ctx.request.body
  });

  ctx.body = {
    data: updateOrganization
  };
  ctx.status = 200;
}

const destroy = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const organization = await prisma.organization.delete({
    where: {
      id: id
    }
  });

  ctx.status = 204;
}

const getAllPractitioners = async (ctx) => {
  const organizationId = parseInt(ctx.params.id);
  const practitioners = await prisma.practitioner.findMany({
    where: {
      organizationId: organizationId
    }
  });

  ctx.body = {
    data: practitioners
  };
  ctx.status = 200;
}

module.exports = {
  index,
  create,
  get,
  update,
  destroy,
  getAllPractitioners
};
