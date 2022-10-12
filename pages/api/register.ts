import { connectDB } from './../../middlewares/connectDB';
import type { NextApiRequest, NextApiResponse } from "next";
import { UserModel } from '../../models/UserModel';
import md5 from 'md5';

type RegisterRequest = {
    email: string,
    name: string,
    password: string
}

const register = async (req: NextApiRequest, res :NextApiResponse) => {
    try {
        if (req.method !== 'POST') {
            return res.status(405).json({error: 'Método HTTP não suportado'})
        }
        const {body} = req
        const data = body as RegisterRequest

        if (!data.email || !data.password || !data.name) {
            return res.status(400).json({error: 'Preencha todos os campos'})
        }

        const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
        if (!emailRegex.test(data.email)) {
            return res.status(400).json({error: 'E-mail inválido'})
        }

        if (data.password.length < 6) {
            return res.status(400).json({error: 'Senha precisa ter 6 ou mais caracteres'})
        }

        const userCount = await UserModel.count({email: data.email})
        if (userCount > 0) {
            return res.status(409).json({error: 'Usuário já cadastrado'})
        }

        data.password = md5(data.password)

        await UserModel.create(data)

        return res.status(201).json({msg: 'success'})
    } catch (e : any) {
        console.log('Erro no cadastro:', e)
    }
}

export default connectDB(register)