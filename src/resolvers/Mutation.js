const Mutation = {
  changeHello: (parent, args, ctx, info) => {
    return `${args.cool} Hello`;
  }
};

module.exports = Mutation;
