import React from 'react';
import * as MailComposer from 'expo-mail-composer';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import logoImg from '../../assets/logo.png';

import {
  Container,
  Header,
  Incident,
  IncidentProperty,
  IncidentValue,
  ContactBox,
  HeroTitle,
  HeroDescription,
  Actions,
  Action,
  ActionText,
} from './styles';

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();

  const { incident } = route.params;


  const message = `Olá ${incident.nome}, estou entrando em contato pois 
    gostaria de ajudar no caso "${incident.title} com o valor de 
    ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}"`;

  function naviteBack() {
    navigation.goBack();
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message,
    });
  }

  function sendWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
  }

  return (
    <Container>
      <Header>
        <Image source={logoImg} />
        <TouchableOpacity onPress={naviteBack}>
          <Feather name="arrow-left" size={28} color="#E82041" />
        </TouchableOpacity>
      </Header>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <Incident>
          <IncidentProperty>ONG:</IncidentProperty>
          <IncidentValue>{`${incident.nome} de  ${incident.city}/${incident.uf}`}</IncidentValue>

          <IncidentProperty>CASO:</IncidentProperty>
          <IncidentValue>{incident.title}</IncidentValue>

          <IncidentProperty>DETALHES:</IncidentProperty>
          <IncidentValue>{incident.description}</IncidentValue>

          <IncidentProperty>VALOR:</IncidentProperty>
          <IncidentValue>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value) }</IncidentValue>
        </Incident>

        <ContactBox>
          <HeroTitle>Salve o dia</HeroTitle>
          <HeroTitle>Seja o herói desse caso.</HeroTitle>

          <HeroDescription>Entre em contato:</HeroDescription>

          <Actions>
            <Action onPress={sendWhatsapp}>
              <ActionText>WhatsApp</ActionText>
            </Action>

            <Action onPress={sendMail}>
              <ActionText>E-mail</ActionText>
            </Action>
          </Actions>
        </ContactBox>
      </ScrollView>

    </Container>
  );
}
