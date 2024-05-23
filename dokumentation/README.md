


 ### Dokumentaion

Startade med att forka ALC-login projektet på github
Installerade monsnode och fixade env så att den kan använda sig av tableplus
 + gitignore för att ta bort kritisk information
tog bort onödiga njk och kod som inte behövdes för arbetet

##
Nav baren fick ytterligare 2 nya features:
En varukorg där en ny njk länkades och detta gjordes om till en bild
Nav gjordes till sticky, den följer med skärmen ner när det skrollas

##
 skapade 2 nya tabeller i tableplus:
 endo_produkts - innehåller produkternas namn, pris och bild
 Endo_login för inloggning (id, username, password )
 + gjorde så att password blev gömd

 ##
 Utifrån databasen gjordes en for product loop så att varje produkt skapas utifrån en mall
Bild, namn, pris och en knapp
För varje knapp skapades en nya id

##
Gjorde så att button räknar så länge produkten finns i korgen.
använde en find produkt som sedan letade efter id
löstes genom att gör en if sats  där den kollade om produkt fanns
fanns den så ökar den ++
om inte lägg till den med 1
visade undifnied - löste genom att lägga till en nya rad och flytta upp den


Påbörja varukorgen genom att göra en lista för varje produkt
produkt ska kunnas ta bort och köper man så läggs den i databasen.

## 
I varukorgen ska 'cart' nås
Detta gjordes genom att skapa en ul med klassen product-list
utifrån det skapades en js skript som selectade allt i product-list
En let cart las även till för att hämta items från localstoragen ('cart') 
i if (cart) loopen så skapas en ny element som skapar en li
av det görs en appendChild av li
Problem nu är att det som finns i carten är undefined!