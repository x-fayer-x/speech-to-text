# Documentation Technique – Speech to Text

## Prérequis

- Node.js (>= 18 recommandé)
- npm (ou yarn)
- Git
- Expo CLI

## Installation de l’environnement

### 1. Installer Node.js et npm

Télécharge et installe Node.js depuis [nodejs.org](https://nodejs.org/).

### 2. Installer Expo CLI

```bash
npm install -g expo-cli
```

### 3. Cloner le dépôt

```bash
git clone <url_du_repo>
cd speech_to_text
```

### 4. Installer les dépendances

```bash
npm install
```

## Lancer le projet en développement

```bash
npx expo start
```
- Ouvre l’application **Expo Go** sur ton smartphone.
- Scanne le QR code affiché dans le terminal ou sur la page web.

## Commandes de build

- **Build Android** :
  ```bash
  eas build --platform android
  ```
- **Build iOS** :
  ```bash
  eas build --platform ios
  ```

## Dépannage

- **Redémarrer le serveur Expo** :  
  Dans le terminal où Expo tourne, tape `r` pour redémarrer l’application.
- **Réinitialiser le cache** :
  ```bash
  npx expo start -c
  ```
- **Problème d’appareil non détecté** :
  ```bash
  adb kill-server
  adb start-server
  adb devices
  ```

## Variables d’environnement Android

Si tu buildes pour Android, ajoute dans `~/.bashrc` :
```bash
export ANDROID_HOME="<chemin_du_sdk_android>"
```
Puis recharge avec :
```bash
source ~/.bashrc
```

## Structure du projet

- `/app` : Contient les écrans principaux (Login, Register, Main, etc.)
- `/components` : Composants réutilisables
- `/context` : Contient les fonctions et providers pour partager des données ou de la logique entre différents composants
- `/assets` : Images, sons, etc.
- `App.tsx` : Point d’entrée de l’application

## Liens utiles

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)

---

> Pour toute question technique, ouvrez une issue ou contactez l’équipe de développement.