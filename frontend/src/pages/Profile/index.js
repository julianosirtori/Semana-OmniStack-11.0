import React, { useState, useEffect } from 'react';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

import { ButtonLink } from '../../styles/global';
import { Container, Header } from './styles';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
  const [incidents, setIncidents] = useState([]);
  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongId');

  const history = useHistory();

  useEffect(() => {
    async function loadAcidents() {
      try {
        const response = await api.get('profile', {
          headers: {
            Authorization: ongId,
          },
        });
        const { data } = response;
        setIncidents(data);
      } catch (err) {
        alert('Falha ao buscar os incidents');
      }
    }

    loadAcidents();
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        },
      });
      setIncidents(incidents.filter((incident) => incident.id !== id));
    } catch (err) {
      alert('Erro ao deletar Incident, tente novamente');
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }


  return (
    <Container>
      <Header>
        <img src={logoImg} alt="Be the Hero" />
        <span>{`Bem vinda, ${ongName}` }</span>

        <ButtonLink to="/incident/new">Cadastrar novo caso</ButtonLink>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#E02041" />
        </button>

      </Header>

      <h1>Casos Cadastrados</h1>

      <ul>
        {incidents.map((incident) => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

            <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}

      </ul>
    </Container>
  );
}
