import type {NextPage} from 'next'

export const Login : NextPage = () => {
    return (
        <div className='container-login'>
            <img src="/logo.svg" alt="" className='logo' />
            <div className='form'>
                <div>
                    <img src="/mail.svg" alt="" />
                    <input type="text" placeholder='Login' />
                </div>
                <div>
                    <img src="/lock.svg" alt="" />
                    <input type="password" placeholder='Senha' />
                </div>
                <button type='button'>Login</button>
            </div>
        </div>
    )
}