import type {NextApiRequest, NextApiResponse, NextApiHandler} from 'next'
import mongoose from 'mongoose'

export const connectDB = (handler : NextApiHandler) => async(req: NextApiRequest, res: NextApiResponse) => {
        console.log('Verifica o estado da conexão (0 = offline, 1 = conectado)', mongoose.connections[0].readyState)
        if (mongoose.connections[0].readyState) {
            return handler(req, res)
        }

        const {DB_CONNECTION_STRING} = process.env
        if (!DB_CONNECTION_STRING) {
            return res.status(500).json({error: 'ENV database não informado'})
        }

        mongoose.connection.on('connected', () => console.log("Conectado com sucesso"))
        mongoose.connection.on('error', () => console.log("Falha na conexão do banco"))
        await mongoose.connect(DB_CONNECTION_STRING)

        return handler(req, res)
}