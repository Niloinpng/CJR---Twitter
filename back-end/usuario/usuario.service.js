import {PrismaClient} from "@prisma/client"; 
const prisma = new PrismaClient();

class Usuario{

    async criarUsuario(email,senha,nome,genero,imagem,cargo,nucleo){
        try {
            const nucleoExistente = await prisma.nucleo.findUnique({
              where: { nome: nucleo },
            });
      
            let nucleoId;
      
            if (!nucleoExistente) {
              const novoNucleo = await prisma.nucleo.create({
                data: {
                  nome: nucleo,
                },
              });
      
              nucleoId = novoNucleo.id;
            } else {
              nucleoId = nucleoExistente.id;
            }
      
            return await prisma.usuario.create({
              data: {
                email,
                senha,
                nome,
                genero,
                imagem,
                cargo,
                nucleo: {
                  connect: { id: nucleoId },
                },
              },
            });
          } catch (e) {
            console.log(e);
            if (e.code === "P2002") throw new Error("Email já cadastrado");
            throw e;
          }
        }

    async procuraUsuarios(){
        return await prisma.usuario.findMany();
    }

    async deletaUsuario(id){
        return await prisma.usuario.delete({ 
            where: { id },
        }).catch(e => {
            if(e.code == "P2025") throw new Error("Usuário não encontrado");
            throw e;
        })
    }

    async procuraPorEmail(Email){
        return await prisma.usuario.findUnique({
            where: { email : Email },
        })
    }

    async trocarSenha(id, novaSenha){
      const usuarioAtualizado = await prisma.usuario.update({
        where: {id},
        data: {senha: novaSenha},
      });
      return usuarioAtualizado;
    }

    async Perfil(id){
      try{
        const usuario = await prisma.usuario.findUnique({
          where: {id},
          select: {
            imagem: true,
            nome: true,
            email: true,
            cargo: true,
            nucleo : true,
            posts: true,
          }
        })
        return usuario;
      }catch(error){
        console.error(error);
        throw error;
      }
    }

}

export default Usuario