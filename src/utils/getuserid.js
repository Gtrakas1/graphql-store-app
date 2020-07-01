import jwt from 'jsonwebtoken'

const getUserId = (request, requireAuth = true) => {
const header =  request.request ? request.request.headers.authorization : request.connection.context.Authorization

if(header){
    const toKen = header.replace('Bearer ', '')
    const decoded = jwt.verify(toKen,process.env.PRISMA_TOKEN)
    return decoded.userId
    
}
if(requireAuth){
throw new Error('Authentication required')
}

return null
}

export {getUserId as default}