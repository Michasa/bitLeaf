import { SessionOptions as SessionOptionsType } from "iron-session";


export const SessionOptions: SessionOptionsType = {
  cookieName: 'bitleaf',
  password: process.env.SECRET_PASSWORD as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    domain: process.env.NODE_ENV === 'development' && undefined,
  },
}
