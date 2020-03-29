import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import api from '../../services/api';

import {
  Container,
  Header,
  HeaderText,
  HeaderTextBold,
  Title,
  Description,
  IncidentsList,
  Incident,
  IncidentProperty,
  IncidentValue,
  DetailButton,
  DetailButtonText,
} from './styles';

import logoImg from '../../assets/logo.png';

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  async function loadIncidents() {
    if (loading) {
      return;
    }

    if (total > 0 && incidents.length >= total) {
      return;
    }
    setLoading(true);
    const response = await api.get('incidents', {
      params: { page },
    });

    setIncidents([...incidents, ...response.data]);
    setTotal(response.headers['x-total-count']);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  function navigateToDetail(incident) {
    navigation.navigate('Detail', { incident });
  }

  return (
    <Container>
      <Header>
        <Image source={logoImg} />
        <HeaderText>
          Total de
          <HeaderTextBold>{` ${total} casos`}</HeaderTextBold>
        </HeaderText>
      </Header>

      <Title>Bem vindo</Title>
      <Description>Escolha um dos casos abaixo e salve o dia.</Description>

      <IncidentsList
        data={incidents}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        keyExtractor={(incident) => String(incident.id)}
        renderItem={({ item: incident }) => (
          <Incident>
            <IncidentProperty>ONG:</IncidentProperty>
            <IncidentValue>{incident.nome}</IncidentValue>

            <IncidentProperty>CASO:</IncidentProperty>
            <IncidentValue>{incident.title}</IncidentValue>

            <IncidentProperty>VALOR:</IncidentProperty>
            <IncidentValue>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value) }</IncidentValue>


            <DetailButton onPress={() => navigateToDetail(incident)}>
              <DetailButtonText>Ver mais detalhes</DetailButtonText>
              <Feather name="arrow-right" size={17} color="#e02041" />
            </DetailButton>
          </Incident>
        )}
      />
    </Container>
  );
}
