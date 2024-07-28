import { jwtDecode } from 'jwt-decode'

interface MyJwtPayload {
  role: string
  accountId: string
  username: string
  userId: string
}

const getRole = (token: string): string => {
  const decodedToken: MyJwtPayload = jwtDecode<MyJwtPayload>(token)
  return decodedToken.role
}

export { getRole }
