
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
Gjorde detta genom att skapa en ul med klassen product-list
utifrån det skapades en js skript som selectade allt i product-list
En let cart las även till för att hämta items från localstoragen ('cart') 
i if (cart) loopen så skapas en ny element som skapar en li
av det görs en appendChild av li
Nu skapas en ny product i listan när man lägger till i varukorgen
Problem nu är att det som finns i carten är undefined

##
validering:
* På framsidan var det endast img taggarna. width och height skulle inte inehålla px, det togs bort
* Login page och signup hade en stray string och en tom attribute. Stringen togs bort och attribute saknade "password"
* elementen title var tom, en div tagg som inte var stängd, lu tag fick inte användas och main taggen är öppen . stängningstagg för div lades till, elementen title gjordes om bort helt. End main taggen flyttades upp ovenaför skripten så att den fungera. lu tagg ersattes till li.

Wave fix - Enda error var att framsidan inte hade en title, så det det lades till
Samma sak med varukorgen, lades till en title i index.js
fixade så att, när session är false i login page så kommer man tillbaka till login sidan istället för att krascha