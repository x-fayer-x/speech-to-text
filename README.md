# Speech to Text – Documentation Utilisateur

## Introduction

Bienvenue sur l’application **Speech to Text**. Cette application permet d’enregistrer de l’audio, de le transcrire en texte, de gérer vos enregistrements et de naviguer facilement entre différentes fonctionnalités.

---

## Installation

### Prérequis

- Node.js (version recommandée : >= 18)
- npm ou yarn
- Expo CLI (`npm install -g expo-cli`)
- Un smartphone Android/iOS ou un émulateur

### Étapes d’installation

1. **Cloner le dépôt**
   ```bash
   git clone <url_du_repo>
   cd speech_to_text
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer l’application**
   ```bash
   npx expo start
   ```
   - Scanner le QR code avec l’application **Expo Go** sur votre téléphone.

---

## Fonctionnalités principales

- **Enregistrement audio** : Enregistrez votre voix en un clic.
- **Transcription** : Convertissez automatiquement vos enregistrements en texte.
- **Gestion des enregistrements** : Visualisez, écoutez et supprimez vos enregistrements.
- **Authentification** : Inscription et connexion sécurisées.
- **Sélection de la langue** : Choisissez la langue de transcription.

---

## Utilisation de l’application

### 1. S’inscrire

- Rendez-vous sur l’écran **Register**.
- Remplissez les champs requis (username, email, mot de passe).
- Cliquez sur **Create your new account**.

### 2. Se connecter

- Accédez à l’écran **Login**.
- Entrez vos identifiants.
- Cliquez sur **Login**.

### 3. Enregistrer et transcrire

- Depuis la page d’accueil, cliquez sur le bouton d’enregistrement.
- Arrêtez l’enregistrement pour lancer la transcription automatique.
- Retrouvez vos enregistrements dans la liste.

### 4. Gérer vos enregistrements

- Page déscription voir la transcription d'un audio.
- Utilisez la page settings pour écouter ou supprimer les enregistrements.

---

## Dépannage

- **Problème de build Android** : Vérifiez la variable d’environnement `ANDROID_HOME`.
- **Cache corrompu** :  
  ```bash
  rm -rf node_modules/.cache
  rm -rf .expo
  npm install
  npx expo start
  ```
- **Appareil non détecté** :
  ```bash
  adb kill-server
  adb start-server
  adb devices
  ```

---

## Commandes utiles

- `npx expo start` : Démarre le serveur de développement.
- `eas build --platform android` : Génère un build Android.
- `npm run android` : Lance l’application sur un appareil Android.
- `npm run ios` : Lance l’application sur un simulateur iOS.

---

## FAQ

**Q : Comment changer la langue de transcription ?**  
R : Utilisez le menu déroulant sur la page d’accueil.

**Q : Où sont stockés mes enregistrements ?**  
R : Les fichiers sont stockés localement sur votre appareil.

**Q : Comment supprimer un enregistrement ?**  
R : Cliquez sur l’icône de suppression à côté de l’enregistrement.

---

## Liens utiles

- [Documentation Expo](https://docs.expo.dev/)
- [React Native](https://reactnative.dev/)
- [Support du projet](mailto:contact@votreprojet.com)

---

## Auteurs

- Fayer (Zone01)
- Collaborateurs : Lucas, Enzo, etc.

---

> Pour toute question ou suggestion, ouvrez une issue sur le dépôt GitHub.
