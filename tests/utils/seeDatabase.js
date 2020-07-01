import prisma from '../../src/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const user1 = {
    input: {
        name: 'Sara',
        email: 'Sara@example.com',
        password: bcrypt.hashSync('Red23456')

    },
    user: undefined,
    jwt: undefined
}
const user2 = {
    input:{
    name: 'George',
    email: 'George@example.com',
    password: bcrypt.hashSync('Mypass23')
    },
    user: undefined,
    jwt: undefined
}


const seeDatabase = async() =>{
    await prisma.mutation.deleteManyUsers()
    

    user1.user = await prisma.mutation.createUser({
        data:user1.input
    })
    user1.jwt=jwt.sign({userId: user1.user.id},process.env.PRISMA_TOKEN)

    user2.user= await prisma.mutation.createUser({
        data:user2.input
    })

    user2.jwt=jwt.sign({userId: user2.user.id },process.env.PRISMA_TOKEN)



}

export{ seeDatabase as default, user1,user2, }