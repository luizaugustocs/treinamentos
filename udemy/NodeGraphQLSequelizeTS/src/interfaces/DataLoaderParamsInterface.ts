import {GraphQLResolveInfo} from "graphql";

export interface DataLoaderParam<TKey> {
    key: TKey;
    info: GraphQLResolveInfo
}