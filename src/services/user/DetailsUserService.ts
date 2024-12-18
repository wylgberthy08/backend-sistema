import prismaClient from "../../prisma";

class DetailsUserService {
  async execute(user_id: string) {
    // vai pegar o user do banco de dados, o primeiro user que o id for igual ao user_id fornecido.
    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
      select: {
        name: true,
        email: true,
        id: true,
      },
    });

    return user;
  }
}

export { DetailsUserService };
