import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';

import heroesImgs from '../../assets/heroes.png';
import logo from '../../assets/logo.svg';

import api from '../../services/api';

export default function Logon(){ 

    const [ id, setId ] = useState('');
    const history = useHistory();

    async function handleLogon(event){
        event.preventDefault();

        try{

            const response = await api.post('sessions', { id });

            console.log(response.data);

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);
            history.push('/profile')

        }catch(err){
            alert('Erro ao realizar Login, tente novamente')
        }
    }

    return(
        
        <div className="logon-container">
            <section className="form">
                <img src={logo} alt="Be The Hero"/>
                
                <form onSubmit={handleLogon}>
                    <h1>Faça seu Logon</h1>
                    <input placeholder="Sua ID" value={id} onChange={e => setId(e.target.value)} />
                    <button className="button" type="sumbit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImgs} alt="Heroes"/>
        </div>

    );

}