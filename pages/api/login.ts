import jwt from 'jsonwebtoken';
import { connectDB } from '../../middlewares/connectDB';
import type { NextApiRequest, NextApiResponse } from "next";
import { UserModel } from '../../models/UserModel';
import md5 from 'md5';

type LoginRequest = {
    email: string,
    password: string
}

const login = async (req: NextApiRequest, res :NextApiResponse) => {
    try {
        if (req.method !== 'POST') {
            return res.status(405).json({error: 'Método HTTP não suportado'})
        }
        const {body} = req
        const data = body as LoginRequest

        if (!data.email || !data.password) {
            return res.status(400).json({error: 'Preencha todos os campos'})
        }

        const users = await UserModel.find({email: data.email, password: md5(data.password)})
        if (users && users.length > 0) {
            const {JWT_SECRET} = process.env
            if (!JWT_SECRET) {
                console.log("JWT secret não selecionado")
                return res.status(500).json({error: 'Erro no servidor'})
            }
            const token = jwt.sign({_id: users[0]._id}, JWT_SECRET)
            return res.status(200).json({token: token})
        }

        return res.status(400).json({error: 'Usuário inválido'})
    } catch (e : any) {
        console.log('Erro no cadastro:', e)
    }
}

export default connectDB(login)