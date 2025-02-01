<h1>Projeto de Reprodutor de Música Estilo Spotify</h1>

![Design_sem_nome__3_-removebg-preview](https://github.com/user-attachments/assets/60c279fe-03bd-41a4-8392-fcfada55d1ab)    ![Design_sem_nome__4_-removebg-preview](https://github.com/user-attachments/assets/316c1ec1-f2e5-4f7b-a09d-7c0257e51b58)


<H1>Visão Geral</H1>

Este projeto consiste em um reprodutor de música inspirado na interface do Spotify, com funcionalidades básicas de controle de reprodução, visualização de capa de álbum, controle de tempo e outras interações típicas de um reprodutor de música.

O objetivo do projeto é criar uma interface simples, porém funcional, utilizando HTML, CSS e JavaScript para interação dinâmica.
A interface responsiva é otimizada para funcionar em dispositivos móveis e desktops, adaptando-se a diferentes tamanhos de tela.


<h2>Funcionalidades</h2>

 Controle de Reprodução: O usuário pode iniciar, pausar e alternar entre músicas da playlist utilizando os botões de controle (play, pause, anterior e próximo).
 
 Exibição de Informações: Exibe o nome da música e da banda, além da capa do álbum.
 
 Barra de Progresso: Mostra o progresso da música em tempo real e permite ao usuário arrastar a barra para avançar ou retroceder na faixa.
 
 Botões de Interação:
 Curtidas "O usuário pode "curtir" ou "descurtir" uma música".
 Repetição e Aleatório "O reprodutor pode alternar entre a reprodução contínua de uma música (repetição) e a reprodução aleatória das faixas".

Interface Responsiva - O design foi otimizado para se adaptar a diferentes dispositivos e tamanhos de tela, garantindo uma experiência de usuário fluída tanto em desktop quanto em dispositivos móveis.


<h1>Tecnologias Utilizadas</h1>

HTML5: Estruturação semântica da página e organização de conteúdo.

CSS3: Estilização da página, utilizando técnicas de layout como Flexbox para a organização dos elementos e media queries para garantir a responsividade.

JavaScript: Lógica de controle de reprodução de música, manipulação de eventos e interação com o DOM para criar uma experiência dinâmica de usuário.
    

<h2>Estrutura do Projeto</h2>

O projeto é composto pelas seguintes partes:

<h3>1. Interface de Usuário (UI)</h3>

index.html: O arquivo principal que contém a estrutura HTML da página.
Contém os elementos de controle, como botões para tocar/pausar, avançar/retroceder a música, e visualizar a capa do álbum.

style.css: Contém os estilos para o layout da página.
Utiliza gradientes para o fundo e personalização do botão de controle.
Responsividade definida por media queries para diferentes tamanhos de tela, garantindo que a interface seja adaptada tanto para dispositivos móveis quanto para desktops.

script.js: Arquivo responsável pela lógica de controle da música e interação do usuário.
Controle de reprodução (play/pause).
Exibição de tempo de execução da música e progressão da barra de progresso.
Implementação de funcionalidades de "curtir" a música e alternância entre músicas da playlist.

<h3>2. Funcionalidades Específicas</h3>

Barra de Progresso:
 A barra de progresso da música se atualiza conforme a reprodução avança.
 O usuário pode clicar na barra para pular para qualquer parte da música.

Controle de Músicas:
 Ao clicar nos botões de "Próxima" e "Anterior", o projeto alterna entre as faixas da playlist.
 A funcionalidade de "repetição" permite que a música atual seja repetida após o término.

Design Responsivo:
 A interface se adapta a diferentes dispositivos, com a imagem da capa da música diminuindo de tamanho em telas menores e os botões de controle sendo ajustados para caber bem nas telas de smartphones.

<h2>Exemplo de Uso</h2>

 O usuário carrega a página e vê o nome da playlist, o nome da música atual e a capa do álbum.
 O usuário pode dar play, pausar a música, avançar para a próxima ou voltar para a anterior.
 A barra de progresso exibe o tempo atual da música e pode ser interagida para pular para diferentes pontos da música.
 O usuário pode curtir a música clicando no ícone de coração, que muda de cor para indicar que a música foi "curtida".
 As funcionalidades de repetição e aleatório também estão disponíveis, permitindo alternar a experiência de reprodução da música.


<h2>Exemplo de Código</h2>
<h3>style.css (Responsividade e Estilo)</h3>
<br>
    
            body {
                background-image: linear-gradient(rgb(34, 6, 51), rgb(29, 40, 42));
                height: 100vh;
                color: white;
                font-family: sans-serif;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            
            #cover {
                width: 450px;
                border-radius: 3px;
                margin-bottom: 2em;
            }
            
            #button-container {
                display: flex;
                justify-content: space-around;
                padding-top: 1em;
            }
            
                /* Responsividade para dispositivos móveis */
            @media (max-width: 768px) {
                #cover {
                    max-width: 250px;
                }
                #button-container {
                    flex-wrap: wrap;
                }
            }
        
            @media (max-width: 480px) {
                #cover {
                    max-width: 200px;
                }
                .button {
                    font-size: 1em;
                }
            }



<br>
<br>

<h3> 
script.js (Lógica de Controle de Música)</h3>
<br>


          const play = document.getElementById('play');
          const previous = document.getElementById('previous');
          const next = document.getElementById('next');
          const song = document.getElementById('audio');
          const cover = document.getElementById('cover');
          const songName = document.getElementById('song-name');
          
          const playlist = [
              { songName: 'I´ll Be There For You', artist: 'Bon Jovi', file: 'ill_be_there_for_you' },
              { songName: 'Bed Of Roses', artist: 'Bon Jovi', file: 'bed_of_roses' },
              { songName: 'It’s My Life', artist: 'Bon Jovi', file: 'its_my_life' }
          ];
          
          let index = 0;
          
          function playSong() {
              song.play();
              play.querySelector('.bi').classList.remove('bi-play-circle-fill');
              play.querySelector('.bi').classList.add('bi-pause-circle-fill');
          }
          
          function pauseSong() {
              song.pause();
              play.querySelector('.bi').classList.add('bi-play-circle-fill');
              play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
          }
          
          function nextSong() {
              index = (index + 1) % playlist.length;
              loadSong();
              playSong();
          }
          
          function previousSong() {
              index = (index - 1 + playlist.length) % playlist.length;
              loadSong();
              playSong();
          }
          
          function loadSong() {
              const songData = playlist[index];
              cover.src = `images/${songData.file}.jpg`;
              song.src = `songs/${songData.file}.mp3`;
              songName.innerText = songData.songName;
          }
          
          loadSong();
          
          play.addEventListener('click', () => {
              if (song.paused) {
                  playSong();
              } else {
                  pauseSong();
              }
          });
          
          next.addEventListener('click', nextSong);
          previous.addEventListener('click', previousSong);

<br>
<br>
<h1>Conclusão</h1>
<br>
Esse projeto é um excelente exemplo de como você pode criar um reprodutor de música simples e funcional usando apenas tecnologias web (HTML, CSS e JavaScript).
Ele é completamente responsivo e permite que você interaja de maneira intuitiva com a música, seja em dispositivos móveis ou desktop.

Esse código pode ser um ótimo ponto de partida para expandir funcionalidades e aprender mais sobre desenvolvimento web dinâmico.
