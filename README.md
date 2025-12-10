# LesBonsBails – Plateforme d'Échange Local  

**Cours : Génie Logiciel**

**Auteur : VELUZ Jesse (592040)**

Ce dépôt contient le code source du projet de synthèse **LesBonsBails**, une application web permettant l’échange de biens et de compétences entre particuliers.  
Le site est déployé à l’adresse suivante : **https://les-bons-bails.onrender.com**

---

## 📄 Rapport de projet  
La documentation complète (Architecture, Spécifications, Conception) est disponible ici :

👉 **Accéder au Rapport complet [(Google Doc)](https://docs.google.com/document/d/1TpZdcnEnljwWJpsebX-mQE-ZsQT-Q63c6IrIJaeP7Y0/edit?usp=sharing)**

---

## 🚀 Installation et Lancement

Le projet est divisé en deux parties (**Client** et **Serveur**) qui doivent être lancées simultanément.  
Le package interne `shared` est déjà compilé.

**Pré-requis :** Node.js doit être installé.

### 1. Lancer le Serveur (Backend)

Ouvrir un premier terminal :

```bash
cd server
npm install
npm run start
```

Le serveur démarrera sur le port configuré (ex : `3000`).

### 2. Lancer le Client (Frontend)

Ouvrir un second terminal :

```bash
cd client
npm install
npm run start
```

L'application sera accessible via l’URL indiquée dans le terminal (généralement `http://localhost:8080`).

---

## 🛠 Structure du projet

* **client/** : Frontend (Vanilla TypeScript, Web Components, Webpack).
* **server/** : Backend (Node.js, Express, MongoDB, Architecture en couches).
* **shared/** : Librairie commune (Interfaces et Types TypeScript partagés).

---

## 🧪 Tests

Pour exécuter les tests unitaires du backend :

```bash
cd server
npm test
```
