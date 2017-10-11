import {ObjectID} from 'mongodb';
import pubsub from '../pubsub';
import {URL} from 'url';

class CustomGraphQLError extends Error {
    constructor(message, field) {
        super(message);
        this.field = field;
    }
}

function assertValidLink ({url}) {
    try {
        new URL(url);
    } catch (error) {
        throw new CustomGraphQLError('Link validation error: invalid url.', 'url');
    }
}

function buildFilters({OR = [], description_contains, url_contains}){
    const filter = (description_contains || url_contains) ? {} : null;
    if (description_contains) {
        filter.description = {$regex: `.*${description_contains}.*`}
    }
    if (url_contains){
        filter.url = {$regex: `.*${url_contains}.*`}
    }

    let filters = filter? [filter]: [];

    OR.forEach(or => {
        filters = filters.concat(buildFilters(or))
    });
    return filters;
}

export default {
    Query: {
        allLinks: async (root, {filter}, {mongo: {Links}}) => {
            let query = filter ? {$or: buildFilters(filter)} : {};
            return await Links.find(query).toArray();
        }
    },
    Mutation: {
        createLink: async (root,data, {mongo: {Links}, user}) => {
            assertValidLink(data)
            const newLink = Object.assign({postedById: user && user._id},data);
            const response = await Links.insert(newLink);
            newLink.id = response.insertedIds[0];
            pubsub.publish('Link', {Link: {mutation: 'CREATED', node: newLink}});
            return newLink;
        },
        createVote: async (root, data, {mongo:{Votes}, user}) => {
            const newVote = {
                userId: user && user._id,
                linkId: new ObjectID(data.linkId)
            }
            const response = await Votes.insert(newVote);
            return Object.assign({id: response.insertedIds[0]}, newVote);
        },
        createUser: async (root, data, {mongo: {Users}}) => {
            const newUser = {
               name: data.name,
               email: data.authProvider.email.email,
               password: data.authProvider.email.password,
            }
            const response = await Users.insert(newUser);
            return Object.assign({id: response.insertedIds[0]},newUser)
        },
        signinUser: async(root, data, {mongo: {Users}}) => {
            const user = await Users.findOne({email: data.email.email});
            if (data.email.password === user.password){
                return {token: `token-${user.email}`, user};
            }
        }
    },

    Subscription: {
      Link: {
          subscribe: () => pubsub.asyncIterator('Link')
      }
    },

    // Chamado antes de qualquer funcao do resolver, é usado pq o mongo retorna o id no campo _id,
    // e aqui usa no id
    Link: {
        id: root => root._id || root.id,
        postedBy: async ({postedById}, data, {dataloaders: {userLoader}}) => {
            return await userLoader.load(postedById);
        },
        votes: async ({_id}, data, {mongo: {Votes}}) => {
            return await Votes.find({linkId: _id}).toArray();
        }
    },
    User: {
        id: root => root._id || root.id,

        votes: async ({_id}, data, {mongo: {Votes}}) => {
            return await Votes.find({userId: _id}).toArray();
        }

    },
    Vote: {
       id: root => root._id || root.id,

       user: async({userId}, data, {dataloaders: {userLoader}}) => {
           return await userLoader.load(userId);
       },

       link: async({linkId}, data, {mongo: {Links}}) => {
           return await Links.findOne({_id: linkId});
       }
    }
}