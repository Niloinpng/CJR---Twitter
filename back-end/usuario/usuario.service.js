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

    async procuraPorEmail(email){
        return await prisma.usuario.findUnique({
            where: { email },
        })
    }
}

export default Usuario