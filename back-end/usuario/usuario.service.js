import {PrismaClient} from "@prisma/client"; 
const prisma = new PrismaClient();

class Usuario{

    async criarUsuario(email,senha,nome,genero,cargo,nucleo){
        console.log(email,senha,nome,genero,cargo,nucleo)
        return await prisma.usuario.create({
            data: {
                email,
                senha,
                nome,
                genero,
                cargo,
                nucleo: {
                    connect: {nome: nucleo}
                }
            }
        }).catch(e => {
            //console.log(e)
            if(e.code == "P2002") throw new Error("Email já cadastrado");
            throw e;
        })
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