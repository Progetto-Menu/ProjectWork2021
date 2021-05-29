# ProjectWork2021

Francesco
Coach
Jacopo
Andrea
Diego
Simone

# Configurazione iniziale
Verificare che sia installato Node.js nel computer di test

# Dopo ogni Pull
- Se Node.js è presente, spostarsi nella cartella <b>ProgettoReact</b> con il comando "cd ProgettoReact"
- Incollare questa stringa nel terminale "npm install --save typescript @types/node @types/react @types/react-dom @types/jest"
- Eseguire la stringa "npm run start"


# Installare FontAwesome
npm install react-icons

import {quello che vuoi} from "react-icons/fa( oppure: md)";

sintassi:
<FaGithub /> e viene fuori l'immagine di github


# App

Il componente <strong>App</strong> continene tutte le route di navigazione a seconda dell'utente selezionato.
L'utente selezionato viene preso da localStorage, se non è presente viene chiesto all'avvio dell'app di selezionare la tipologia di utente


# Autenticazione

## Lato Client

I componenti utilizzati per l'autenticazione sono: LoginComponent, RegisterComponent, OtpComponent.

- <b>LoginComponent</b> visualizza un form in cui si chiede all'utente di inserire le proprie credenziali di accesso. Una volta inserite e cliccato il pulsante di "Login" si viene redirezionati verso la home per quella categoria di utente.
- <b>RegisterComponent</b> visualizza un form di registrazione per l'utente, una volta inseriti i campi richiesti e, cliccato il pulsante "Registrati", si viene ridirezionati verso la home per quella categoria di utente.
- <b>OtpComponent</b> viene visualizzato solo durante il primo accesso alla home, cliccado sul pulsante "Richiedi", l'utente riceverà un pin di 5 cifre sulla posta elettronica dell'email con cui si è registrato; se l'utente ha sbagliato ad inserire l'email la può cambiare; ricevuto il pin, l'utente lo inserisce e, se è proprio quello ricevuto nell'email, l'app ridireziona l'utente verso la home altrimenti mostra un messaggio di errore.

## Lato Server

- Il server espone delle API tramite cui eseguire l'autenticazione
- Il client per eseguire l'autenticazione chiama la route /&lt;utente&gt;/login del server e, questo, se le credenziali sono corrette, restituisce un token JWT che viene poi inviato ad ogni richiesta che l'utente autenticato farà. Il client memorizza questo token in localStorage.
- Il client per eseguire la registrazione chiama /&lt;utente&gt;/register, il server inserirà i dati ricevuti nel Database e imposta quel nuovo utente inserito come "Non validato" tramite un campo booleano nel Database.


# Traduttore
## Home
Il traduttore una volta arrivato sulla home visualizza le traduzioni prese in carico, viene chiesto di tradurre una serie di stringhe nella lingua indicata, cliccando sul pulsante "Invia" questa traduzione cambia stato da "In corso" a "Da revisionare" e sarà visibile ai revisori.

Se il traduttore è anche un revisore visualizza le traduzioni degli altri traduttori e verrà chiesto di approvare o o scartare le traduzioni. Se la traduzione viene approvata ed è la prima ad essere approvata viene inserita nella tabella che contiene le varie stringhe tradotte passando a stato di Approvata. Altrimenti rimane nella tabella delle traduzioni con un stato di "Approvata e Scartata". Se la traduzione viene scartata, rimane nella tabella delle traduzioni con lo stato di Scartata.

## Traduzioni
Il traduttore può cercare i menù da tradurre nella schermata "Traduzioni" facendo click sul relativo pulsante nella barra in fondo. Il traduttore in questa sezione può cercare menù da tradurre nella propria provincia, città, o ristorante.

## Profilo
Il traduttore può visualizzare i suoi dati nella sezione profilo e modificarli. Visualizza anche tutte le sue traduzioni, con il loro stato. Può indicare le lingue che conosce e fare logout.

# Ristoratore
## Home
Il ristoratore una volta entrato nella home visulizza i propri ristoranti, con i rispettivi dati. Il ristoratore può modificare o eliminare un ristorante.

## Menu
Il ristoratore può aggiungere un menù e cancellarlo (non è stata implementata la funzionalita di modifica) nella sezione Menù, ogni menù è composto da più sezioni e ogni sezione comprende più piatti, il ristoratore al momento della creazione indica le lingue in cui vuole tradurre il menù.

## Profilo
Il ristoratore può visualizzare i suoi dati nella sezione profilo e modificarli e può fare logout.


# Cliente
## Home
Il cliente arrivato sulla home (non richiede autenticazione) può individuare il menù selezionado provincia, città e ristorante. Il menù visualizzato nel seguente modo: se esiste una stringa tradotta nella lingua che conosce l'utente (tramite un apposita libreria viene individuata il codice della lingua del browser), viene visualizzata quella stringa altrimenti viene visualizzato il suo valore non tradotto

## Logout
Permette al cliente di fare logout


# Amministratore
## Home
L'amministratore ha come unica funzionalità quella di promuovere un traduttore a revisore.

## Logout
Permette di fare logout


# Localizzazione
L'app è disponibile in italiano e inglese tutte le stringhe dell'app sono memorizza in ProgettoReact/src/utils/Strings.tsx.
