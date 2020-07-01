import '@babel/polyfill'
import 'cross-fetch/polyfill'
import  { gql } from 'apollo-boost'
import prisma from '../src/prisma'
import seeDatabase, {user1} from './utils/seeDatabase'
import getClient from './utils/getClient'
import {createUser,getAuthor,login,getProfile} from './utils/operations'

const client = getClient()

beforeEach(seeDatabase)



test('Should create a user',async ()  =>{
    const variables ={
        data:{
        name: 'Jason',
        email: 'Jason@example.com',
        password: 'blue1234'
        }
    }
    
    const response = await client.mutate({
        mutation: createUser,
        variables
    })
    const exists = await prisma.exists.User({id: response.data.createUser.user.id})
    expect(exists).toBe(true)
    

})

test('Should expose public author profiles',async ()=>{
    

    const response = await client.query({ query: getAuthor})

    expect(response.data.users.length).toBe(2)
    expect(response.data.users[0].email).toBe(null)
    expect(response.data.users[0].name).toBe('Sara')
})


test('Should not to be able how to login',async()=>{
const variables={
    data:{
        email: "Sara@example.com",
        password: "red23456"
}
}

   await expect(client.mutate({mutation: login,variables})
   ).rejects.toThrow()
  
})

test('should pass if password is to short',async () =>{
    const variables={
        data:{
            name: "Jason",
            email: 'Jay@email.com',
            password: "12345"
        }

    }
    await expect(client.mutate({mutation: createUser, variables})
    ).rejects.toThrow()
})

test('Shoul fetch user profile',async ()=>{
   const client=getClient(user1.jwt)

    
  const { data } = await client.query({query: getProfile})

  expect(data.me.id).toBe(user1.user.id)
  expect(data.me.name).toBe(user1.user.name)
  expect(data.me.email).toBe(user1.user.email)
})