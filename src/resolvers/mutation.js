import bcrypt from 'bcryptjs'
import hashPassword from '../utils/hashPassword'
import generateToken from '../utils/generateToken'
import getUserId from '../utils/getuserid'



const Mutation= {
    

    async login(parent,args, { prisma }, info) {
        const user= await prisma.query.user({
            where:{
                email: args.data.email
            }
        })

        if(!user){
            throw new Error('Unable to login')
        }

        
        const isMatch = await bcrypt.compare(args.data.password,user.password)

        if(!isMatch){
            throw new Error('Unable to Login')
        }

        return{
            user,
            token: generateToken(user.id)

        }


    },
   async createUser(parent,args,{ prisma },info){
   const password = await hashPassword(args.data.password)   
const user = await prisma.mutation.createUser( { data:{
        ...args.data,
        password
    } })

    return{
        user,
        token: generateToken(user.id)
    }
    
},
    
   async deleteUser(parent,args,{ prisma, request },info){
    const userId = getUserId(request)
      
        
    
        return prisma.mutation.deleteUser({where:{id:userId}
         }, info)
    },

 async updateUser(parent,args,{ prisma, request }, info){
    const userId= getUserId(request)
    if(typeof args.data.password === 'string'){
        args.data.password = await hashPassword(args.data.password)
    }
    
    return prisma.mutation.updateUser({
        data: args.data,
        where:{
            id: userId
        }
    },info)

    },
 async createCategory(parent,args,{prisma,request},info){
     const userId=getUserId(request)

     return prisma.mutation.createCategory({
         data:{
             name: args.data.name,
             manager:{
                connect:{
                    id: userId
                }
             }
            }
            
     },info)
 },

 async updateCategory(parent,args,{prisma,request},info){
    const userId=getUserId(request)

    return prisma.mutation.updateCategory({
        where:{
            id: args.id
        },
        data:{
            name: args.data.name,
            manager:{
                connect:{
                    id: userId
                }
            }
        }
    },info)
 },
 async deleteCategory(parent,args,{prisma,request},info){
    const userId=getUserId(request)

    return prisma.mutation.deleteCategory({
        where:{
            id: args.id
        }
    },info)
 },

 async createItem(parent,args,{prisma,request},info){
    const userId=getUserId(request)
return prisma.mutation.createItem({
    data:{
        name: args.data.name,
        price: args.data.price,
        category:{
            connect:{
                id: args.data.category
            }
        },
        manager:{
            connect:{
                id: userId
            }
        }
    }
})
 },

 async updateItem(parent,args,{prisma,request},info){
    const userId=getUserId(request)

    return prisma.mutation.updateItem({where:{
        id: args.id
    },
    data: args.data
        
},info)
       
},

async deleteItem(parent,args,{prisma,request},info){
    const userId=getUserId(request)

    prisma.mutation.deleteItem({
        where:{
            id: args.id
        }
    },info)
}
}


        export {Mutation as default}