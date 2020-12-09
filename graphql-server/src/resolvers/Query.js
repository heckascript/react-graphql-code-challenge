const Query = {
  users(parent, args, { db }, info) {
    // disallow user.password from being exposed
    const users = db.users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone
      };
    });
    return users;
  },
};

export default Query;
