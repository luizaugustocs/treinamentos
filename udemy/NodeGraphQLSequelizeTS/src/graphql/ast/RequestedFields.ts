import {GraphQLResolveInfo} from "graphql";
import * as GraphQLFields from 'graphql-fields';
import {difference, union} from 'lodash';

export class RequestedFields {
    getFields(info: GraphQLResolveInfo, options?: {keep?: string[], exclude?: string[]}): string[] {
        const fields = Object.keys(GraphQLFields(info));
        if (!options) {
            return fields;
        }
        return difference(union<string>(fields, options.keep || []), options.exclude || []);
    }
}