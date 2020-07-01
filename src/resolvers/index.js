import {extractFragmentReplacements} from 'prisma-binding'
import Query from './Query'
import Mutation from './mutation'
import Subscription from './Subscription'
import User from './User'
import Category from './Category'
import Item from './Item'

const resolvers = {
    Query,
    Mutation,
    //Subscription,
    User,
    Category,
    Item
    
    
}

const fragmentReplacements = extractFragmentReplacements(resolvers)

export{resolvers,fragmentReplacements}
