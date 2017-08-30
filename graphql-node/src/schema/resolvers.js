export default {
    Query: {
        allLinks: async (root, data, {mongo: {Links}}) => {
            return await Links.find({}).toArray();
        }
    },
    Mutation: {
        createLink: async (root,data, {mongo: {Links}}) => {
            const response = await Links.insert(data);
            return Object.assign({id: response.insertedIds[0]},data);
        }
    },

    // Chamado antes de qualquer funcao do resolver, é usado pq o mongo retorna o id no campo _id,
    // e aqui usa no id
    Link: {
        id: root => root._id || root.id
    }
}