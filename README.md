# Simulação 3D do Sistema Solar

Este projeto apresenta uma **simulação interativa em 3D do Sistema Solar**, desenvolvida como parte da disciplina de **Computação Gráfica** do curso de Engenharia de Computação – UFC, Campus Sobral. A aplicação foi construída com a biblioteca [Three.js](https://threejs.org/), combinando conceitos de transformações geométricas, texturização e interação com o usuário.

## Visão Geral

A simulação busca representar os corpos celestes principais do Sistema Solar em uma cena 3D, com movimento de translação ao redor do Sol, rotação individual, anéis, lua da Terra e controle total de visualização via mouse e teclado.

## Funcionalidades

- Sol com textura e iluminação pontual.
- Planetas com texturas realistas e tamanhos proporcionais.
- Anéis de Saturno e Urano com textura transparente.
- Lua orbitando a Terra.
- Translação dos planetas em torno do Sol e rotação em torno de seus próprios eixos.
- Controles via mouse .
- Controles de teclado:
  - `P` — Pausar/Continuar animação
  - `R` — Resetar posição da câmera
  - `S` — Alternar velocidade entre 1x, 2x e 5x
- Interface com botões para os mesmos controles.
- Skybox com textura estelar de fundo.
- Responsividade para diferentes tamanhos de tela.
- Easter Egg.

## Como Executar


1. Clone este repositório:

```bash
git clone https://github.com/inaciolimaf/computacaografica.git
cd computacaografica
```

2. Instale as dependências :

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

4. Acesse a aplicação no navegador. Geralmente, estará disponível em:

```
http://localhost:1234
```

> ⚠️ O projeto utiliza `import` de módulos e imagens. Por isso, **não abra diretamente o `index.html` no navegador**. A porta do localhost pode variar, mas é só clicar quando aparecer no terminal.

## Estrutura Esperada

```
projeto/
├── index.html
├── js/
│   └── scripts.js
└── img/
    ├── stars.jpg
    ├── sun.jpg
    ├── mercury.jpg
    ├── venus.jpg
    ├── earth.jpg
    ├── moon.jpg
    ├── mars.jpg
    ├── jupiter.jpg
    ├── saturn.jpg
    ├── saturn_ring.png
    ├── uranus.jpg
    ├── uranus_ring.png
    ├── neptune.jpg
    └── pluto.jpg
```

## Demonstração

Link para o vídeo de demonstração no YouTube:  
[**Clique aqui para assistir**](https://youtu.be/seu-link-aqui)

## Créditos de Imagens

As texturas utilizadas neste projeto foram obtidas de fontes públicas e educativas, exclusivamente para fins acadêmicos:

- [Solar System Scope Textures](https://www.solarsystemscope.com/textures) — Texturas de planetas, Sol e luas
- [NASA Image and Video Library](https://images.nasa.gov/) — Imagens astronômicas de domínio público

## Equipe

- **FRANCISCO SILVAN FELIPE DO CARMO** — 496641  
- **FRANK WILLIAM ARAUJO SOUZA** — 473269  
- **INACIO LIMA DE SOUZA FILHO** — 509153  
- **JOAO ARTUR SALES ROCHA** — 511375  
- **MATHEUS FARES TRAJANO** — 512210  

> Projeto desenvolvido sob orientação do Prof. **Iális Cavalcante** na disciplina de Computação Gráfica – Engenharia de Computação – UFC Sobral.
