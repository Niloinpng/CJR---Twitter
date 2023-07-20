import {PrismaClient} from "@prisma/client"; 
const prisma = new PrismaClient();

class Post{
    async criarPost(content,user_id){
        return await prisma.post.create({
            data: {
                user_id,
                content,
            },
        });
    }

    async procuraPost(){
        return await prisma.post.findMany({
            orderBy: { created_at: "desc" },
        });
    }

//   async procuraPostID(){
//        return await 
//    }

    async deletaPost(id,user_id){
        const post = await prisma.post.delete({where: { id }})
        if post.user_id == user_id)
    }
}

export default Post;