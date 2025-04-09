pour build son repo : 
 - Crée un dossier
 - dans le dossier run "npx create-expo-app@latest <NOM DU PROJET>" 
 - commande pour avoir un projet vierge "npm run reset-project" (supprimer app-exemple)
 - npx expo start --tunnel( voir plus bas, pas besoin en local)

Pour build mon app :
- npx expo run

Pour lancer mon projet :
 - npx expo start (npx represente la verison local de mon projet)
 - Using : Expo go (fonctionne) et voir en mod devloppement switch avec "S".
 - (NPX est )
 - eas login (rentrée ces identifiant expo)
 - eas build:configure(choisir sont syteme d'exploitation android ios )


MODIFIER LA VARIABLE D'ENVIRONEMENT DE ANDROID : 
 - nano ~/.bashrc 
 - mettre ligne "export ANDROID_HOME="<chemin du sdk>"
 - ctrl+s 
 - ctrl + x
 - source ~/.bashrc
 - (verification echo $ANDROID_HOME) (cat ~/.bashrc)
 - npx expo run

--tunnel: Une option qui permet de créer un tunnel réseau, ce qui rend le projet accessible via une URL publique.
 Cela est utile pour tester sur des appareils physiques sans être sur le même réseau local.

OPTION : 
- restart lappli si elle freeze entrée "r" dans le terminal
Si le devices n'est pas detecter :
- adb kill-server
- adb start-server
- adb devices
Verifier que je suis dans le bon mod developement build (Press s)



Pour les requetes utiliser AXIOS(plus de securiter) ou fetch (plus simple)

npx Un outil qui permet d'exécuter des packages Node.js sans les installer globalement.

expo Un framework et une plateforme pour les applications React Native.

start Une commande d'Expo qui démarre le serveur de développement.



DETAIL DU LANGAGE : 
view c'est comme une **DIV** en **HTML**
Text afficher du **texte**. Il prend en charge le **style**, la mise en forme, et la gestion des **événements tactiles**.

- cd speech_to_text
- npm start # you can open iOS, Android, or web from here, or run them directly with the commands below.
- npm run android
- npm run ios # requires an iOS device or macOS for access to an iOS simulator
- npm run web


1. VIDER LE CACHE DE TYPESCRIPT :
rm -rf node_modules/.cache
rm -rf .expo
2. reinstaller les dependance :
npm install
npx expo start

<!-- "Clef:" -->
- <!-- TODO: Ajouter une introduction détaillée ici -->
- <!-- FIXME: Corriger les liens brisés dans la section suivante -->
- <!-- REVIEW: Vérifier la mise en forme des listes -->
- <!-- IDEA: Ajouter une nouvelle section pour les FAQ -->

projet par partie : 
Collecting workspace information

Je n'ai pas modifié le code car vous n'avez pas demandé de modifications spécifiques. Voici un résumé des fichiers et de leurs responsabilités dans votre projet :

### Fichiers et leurs responsabilités

#### 

description.tsx


- **Responsabilité**: Affiche une liste d'enregistrements audio.
- **Affichage**: Utilise le composant resume.tsx pour chaque enregistrement.
- **Appelé par**: Lui-même, en tant que composant de la page Description.

#### 

resume.tsx


- **Responsabilité**: Affiche un résumé d'un enregistrement audio avec des options pour le lire et le supprimer.
- **Affichage**: Utilise le composant player.tsx pour lire l'audio.
- **Appelé par**: description.tsx

#### 

player.tsx


- **Responsabilité**: Lit un enregistrement audio.
- **Affichage**: Affiche des contrôles de lecture et un curseur pour la position de lecture.
- **Appelé par**: resume.tsx

#### 

index.tsx


- **Responsabilité**: Affiche la page d'accueil avec des options pour enregistrer de l'audio et sélectionner une langue.
- **Affichage**: Utilise les composants dropdown.tsx et recorder.tsx

- **Appelé par**: Lui-même, en tant que composant de la page d'accueil.

#### 

dropdown.tsx


- **Responsabilité**: Affiche un menu déroulant pour sélectionner une langue.
- **Affichage**: Affiche les options de langue.
- **Appelé par**: index.tsx


#### 

recorder.tsx


- **Responsabilité**: Enregistre de l'audio et affiche les enregistrements sauvegardés.
- **Affichage**: Affiche un bouton d'enregistrement et une liste des enregistrements.
- **Appelé par**: index.tsx

#### 

record.tsx


- **Responsabilité**: Affiche une liste des fichiers d'enregistrement.
- **Affichage**: Utilise le composant Checkfile.tsx pour afficher les fichiers.
- **Appelé par**: Lui-même, en tant que composant de la page Record.

#### 

Checkfile.tsx


- **Responsabilité**: Vérifie et affiche les fichiers d'enregistrement.
- **Affichage**: Affiche une liste des fichiers d'enregistrement.
- **Appelé par**: record.tsx

Si vous avez besoin de modifications spécifiques ou d'ajouter des fonctionnalités, veuillez me le faire savoir !

 <!-- -------------------------------------------------------------------------------------------------------------- -->
 <!-- -------------------------------------------------------------------------------------------------------------- -->
 <!-- -------------------------------------------------------------------------------------------------------------- -->

 Base React Native : 

 Les composants les plus utilisés sont :
    View : Un conteneur qui sert à regrouper plusieurs éléments
    Text : Pour afficher du texte
    Image : Pour afficher des images
    TextInput : Pour saisir du texte
    Button : Pour ajouter un bouton

useEffect :
    useEffect(() => {...}, [])	Exécute le code une seule fois quand le composant est affiché.
    useEffect(() => {...}, [variable])	Exécute le code chaque fois que la variable change.
    useEffect(() => {...}, []) avec return () => {...}	Nettoie les effets (ex: arrêter un setInterval).
    fetch(URL)	Appelle une API et récupère des données.

cheminement logique du record :

fichier : Record.tsx