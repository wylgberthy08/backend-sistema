import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    console.log("Email: ", email);
    //verificar se email existe

    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error("Email/Password not found!!");
    }

    //verificar se a senha está correta.

    const passwordMath = await compare(password, user.password);

    if (!passwordMath) {
      throw new Error("Email/Password not found!!");
    }

    //gerar token JWT e devolver os dados do usuário como id, name e email.

    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "30d",
      }
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token,
    };
  }
}

export { AuthUserService };
