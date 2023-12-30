import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { mysqlConnection } from "@/lib/mysql-connection";

export const findUser = (data, key = "email") => {
  return `SELECT * FROM ${process.env.NEXT_PLANETSCALE_DB_NAME}.Account where ${key}='${data}'`;
};

export const insertUser = ({ id, name, email, image }) => {
  return `INSERT INTO ${process.env.NEXT_PLANETSCALE_DB_NAME}.Account (id,name, email, avatar_url)
  VALUES ('${id}','${name}', '${email}', '${image}');`;
};

const initiateRegisterFlow = async (data, user, mysql) => {
  if (!data?.length) {
    await mysql.query(insertUser(user));
  }
};

export const AUTH_OPTIONS = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        const mysql = await mysqlConnection();
        const [data] = await mysql.query(findUser(user.email));
        initiateRegisterFlow(data, user, mysql);
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    async session(params) {
      return { ...params.session, id: params.user?.id };
    },
  },
};
const handler = NextAuth(AUTH_OPTIONS);

export { handler as GET, handler as POST };
