# Projet de Génie Logiciel

VELUZ Jesse - 592040

## Sujet

1. Ingénierie des - Élicitation : Collecter et catégoriser les différentes exigences. Exigences - Spécification : Créer un Document de Spécification des Exigences Logicielles (SRS). 2. Conception et Architecture Logicielle - Architecture : Concevoir une architecture adaptée à l’application en se basant sur les patterns d’architecture. - Conception : Utiliser des patrons de conception pour concevoir les différentes fonctionnalités de l’application. - Modélisation : Créer des diagrammes UML pour représenter les composants de l’application et leurs interactions. 4. Implémentation - Mise en œuvre : - Utiliser un langage de programmation orienté objet (ex : Java, Python, . . .) pour développer le backend et le frontend de l’application. - Implémenter les fonctionnalités de base en fonction des spécifications de conception et les intégrer dans l’application. - Contrôle de Version : Utiliser Git avec un workflow de branches de fonctionnalités. Chaque nouvelle fonctionnalité est développée dans sa propre branche et fusionnée via un Pull Request. 5. Tests et Assurance Qualité - Tests Unitaires : Effectuer des tests pour les fonctions backend individuelles (ex : logique d’inscription, validation de demande). - Tests d’Intégration : Tester les composants externes intégrés qui sont intégrés dans l’application (ex : S’assurer que la messagerie chat fonctionne correctement). 6. DevOps et CI/CD - Pipeline CI/CD : Mettre en œuvre un pipeline CI/CD pour automatiser le processus de déploiement et surveiller les performances de l’application. 7. Sécurité - Authentification : Hacher les mots de passe dans la base de données (ex : avec bcrypt). - Confidentialité : Ne pas exposer les adresses exactes des utilisateurs 8. Maintenance et Évolution - Documentation : Rédiger un README.md complet avec les instructions d’installation. - Déploiement : Déployer l’application localement ou sur une URL publique.


## Exigences

### Elicitation

#### Fonctionnelles

1. Authentification des Utilisateurs
   - Inscription et Profil Utilisateur
   - Connexion Sécurisée
   - Gestion du Profil
2. Gestion des Annonces d’Objets
    - Créer une Annonce d’Objet
    - Parcourir et Rechercher des Annonces
    - Voir les Détails d’une Annonce
3. Gestion des Échanges de Compétences
    - Proposer une Compétence
    - Parcourir les Compétences
4. Flux de Transaction d’Échange
    - Envoyer une Demande d’Échange
    - Gérer les Demandes
    - Messagerie
5. Système de Réputation et de Confiance
6. Système de notification

#### Non-fonctionnelles

- Sécurité : L'application doit garantir la sécurité des données des utilisateurs, y compris le chiffrement des mots de passe et la protection contre les attaques courantes telles que les injections SQL et les attaques XSS.
- Performance : L'application doit être capable de gérer un grand nombre d'utilisateurs simultanés sans dégradation significative des performances.
- Scalabilité : L'architecture de l'application doit permettre une montée en charge facile pour accueillir une croissance future du nombre d'utilisateurs et de données.
- Accessibilité : L'application doit être conforme aux normes d'accessibilité pour garantir que tous les utilisateurs, y compris ceux ayant des handicaps, puissent l'utiliser facilement.
- Compatibilité : L'application doit être compatible avec les principaux navigateurs web (Chrome, Firefox, Safari, Edge) et être responsive pour une utilisation sur différents appareils (ordinateurs, tablettes, smartphones).

### Spécification (SRS)

## Conception

### Architecture

Pour l'architecture de l'application, j'ai opté pour une architecture en couches qui sépare les différentes préoccupations de l'application. Cette architecture comprend les couches suivantes :

1. Couche de Présentation (Frontend) : Cette couche est responsable de l'interface utilisateur. Elle est développée en utilisant...
2. Couche Métier (Backend) : Cette couche gère la logique métier de l'application. Elle est développée en utilisant.... 
Cette couche traite les demandes des utilisateurs, applique les règles métier et interagit avec la couche de données.
3. Couche de Données : Cette couche est responsable de la gestion des données de l'application. Elle utilise... pour stocker les informations des utilisateurs, les annonces, les compétences, etc.

### Patron de conception

J'ai utilisé plusieurs patrons de conception pour structurer l'application de manière efficace :

- Singleton : Pour gérer la connexion à la base de données, assurant qu'une seule instance de la connexion est utilisée à travers l'application.
- Builder : Pour la création d'objets complexes comme les annonces et les profils utilisateurs, facilitant la construction étape par étape.
- Observer : Pour implémenter le système de notifications, permettant aux utilisateurs de recevoir des mises à jour en temps réel sur les activités pertinentes.

### Modélisation

## Implémentation

### Frontend

### Backend

## Tests

## DevOps

## Sécurité

## Maintenance
