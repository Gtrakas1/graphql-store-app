import {gql} from 'apollo-boost'

const createUser= gql`
mutation($data:CreateUserInput!){
   createUser(data: $data){
        user{
        id,
        name
        email
        },
        token
       
    }
}
`

const getAuthor = gql`
        query{
        users{
            id
            name
            email
        }
        
        }

    `

const login = gql`
    mutation($data:LoginUserInput!){
        login(
            data:$data){
                token
            }
        }
    
 `  

const getProfile= gql`
query{
    me{
        id
        name
        email
    }
}`

export{
    createUser,
    getAuthor,
    login,
    getProfile,
    }

