# 📍 PinMe

O **PinMe** é uma aplicação de rastreamento em tempo real que simula o fluxo de confirmação de uma transação, capturando e exibindo a localização do usuário de forma dinâmica.

A aplicação é composta por um frontend moderno em React e um backend em Node.js, permitindo a criação de links únicos que, ao serem acessados, coletam a localização do dispositivo (mediante permissão) e a disponibilizam para visualização em tempo real.

## Funcionalidades

- Geração de links únicos para rastreamento
- Captura de localização via Geolocation API
- Atualização em tempo real das coordenadas
- Interface simulando comprovante de transação
- Visualização da localização com integração de mapa
- Geração de comprovante em PDF
- Preview de compartilhamento (Open Graph)

## Tecnologias utilizadas

### Frontend
- React
- Vite
- TypeScript
- Ant Design
- Axios
- Leaflet (mapas)
- React Router
- jsPDF

### Backend
- Node.js
- Express
- TypeScript
- UUID

## Como rodar o projeto

### Backend

```bash
cd server
npm install
npm run dev
```


### Frontend

```bash
cd client
npm install
npm run dev
```

## Estrutura do fluxo

- Um link é gerado pelo backend
- O usuário acessa o link de rastreamento
- O navegador solicita permissão de localização
- A posição é enviada para o servidor
- Outro usuário pode visualizar a localização em tempo real


## Observações

. Este projeto foi desenvolvido para fins educacionais e demonstração de conceitos como:
- geolocalização
- comunicação cliente-servidor
- experiência do usuário (UX)
- geração de documentos


# Autor

Desenvolvido por **Victor**.

- [Da uma olhada ai](https://voke-kohl.vercel.app/)