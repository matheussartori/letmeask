<p align="center">
  <img alt="letmeask logo" height="350" src="https://github.com/matheussartori/letmeask/raw/main/assets/logo.svg" />
</p>

<h3 align="center">
  letmeask
</h3>

<blockquote align="center">This software is a continued idea of the project created on the #6 edition of Rocketseat "NextLevelWeek".</blockquote>
<br>

<p align="center">
  <a href="https://matheussartori.com.br">
    <img alt="Made by Matheus Sartori" src="https://img.shields.io/badge/made%20by-Matheus%20Sartori-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">
</p>

<p align="center">
  <a href="#about-the-project">About the project</a><br>
  <a href="#installation">Installation</a><br>
  <a href="#connecting-to-a-server">Connecting to a server</a><br>
  <a href="#closing-the-chat">Closing the chat</a><br>
</p>

## About the project

Let me ask is a realtime Q&A app, developed for events and live broadcasts.

It allows everyone to create a room and share their code with the audience, and people can make questions on the app.

The audience can also like the questions, while the room creator can feature a question, mark as answered or delete the question.

<p align="center">
  <img alt="Letmeask questions page" src="https://github.com/matheussartori/letmeask/raw/main/assets/letmeask-1.png" />
</p>

## Installation

To run on your computer/server, you need to install node and yarn first. After the installation, you need to install the depedencies and create the environment file with:

```
yarn install
cp .env.example .env.local
```

Now, create a firebase project with realtime database and google authentication, or just copy the credentials if you already have one, and edit the .env.local file.

## Extra features

This software was developed on the NextLevelWeek Together event, but some features were developed to improve the user experience.

-  Modal alerts: Given the original layout, I decided to implement the modals.
<p align="center">
  <img alt="Modal example" src="https://github.com/matheussartori/letmeask/raw/main/assets/letmeask-modal.png" />
</p>

- Toast alerts: Minor alerts that don't need user actions, were made through toasts.
<p align="center">
  <img alt="Toast example" src="https://github.com/matheussartori/letmeask/raw/main/assets/letmeask-toast.png" />
</p>

- Responsive: The app was adapted to mobile devices.
<p align="center">
  <img alt="Responsive" src="https://github.com/matheussartori/letmeask/raw/main/assets/letmeask-responsive.png" />
</p>

- PWA: The app also includes an PWA version, optimized for desktop and mobile devices.
<p align="center">
  <img alt="PWA example" src="https://github.com/matheussartori/letmeask/raw/main/assets/letmeask-pwa.png" />
</p>

- Dark Theme: You don't have to be flashbanged by this app. I also included a dark theme for obvious reasons.
<p align="center">
  <img alt="PWA example" src="https://github.com/matheussartori/letmeask/raw/main/assets/letmeask-dark.png" />
</p>

---

Made with ❤️ by Redstone Solutions :wave: [Join our community!](https://discord.gg/SNQXH5cKEB)