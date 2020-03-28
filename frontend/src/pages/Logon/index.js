import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import api from '../../services/api';

import { Button, BackLink } from '../../styles/global';
import { Container, Section } from './styles';

import herosImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Logon() {
  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await api.post('sessions', { id });

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.nome);
      history.push('/profile');
    } catch (err) {
      alert('Falha no login tente novamente');
    }
  }

  return (
    <Container>
      <Section>
        <img src={logoImg} alt="Be The Hero" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <input
            placeholder="Seu Id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <Button type="submit">Entrar</Button>

          <BackLink to="/registro">
            <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
          </BackLink>
        </form>
      </Section>
      <img src={herosImg} alt="Heroes" />
    </Container>
  );
}
