import {GraphQLFieldResolver} from 'graphql';

export type ComposableResolver<TSource, TContext> =
    (fn: GraphQLFieldResolver<TSource, TContext>) => GraphQLFieldResolver<TSource, TContext>;

export const composeResolvers = <Source, Context>(... fns: ComposableResolver<Source,Context>[]): ComposableResolver<Source, Context> => {
    if (fns.length === 0) {
        return obj => obj;
    }

    if (fns.length === 1) {
        return fns[0]
    }

    return (fieldResolver: GraphQLFieldResolver<Source, Context>): GraphQLFieldResolver<Source, Context> => {
        return fns.reduceRight((result, currentFn) => currentFn(result), fieldResolver)
    }

}