# Hra Cyklus života

## Závislosti
- nodejs
- npm

## Instalace

Před prvním spuštěním:

```
npm install
```

Poté stačí pro spuštění pokaždé už jen:

```
npm start
```

Hra bude dostupná v prohlížeči na adrese localhost:1234

## Použité technologie

- pouze grafická knihovna PixiJS a bundlovací nástroj ParcelBundler, bez použití dalších technologií
- architektura aplikace vzdáleně připomíná MVC, nicméně z důvodu časové tísně vzniklo cosi jako spaghetti-viewmodel s lasagne-controllerem
- časová náročnost: všichni zůstali vzhůru, tedy 24*5 hodin, z toho 2*5 hodin na brainstormingy

## Příběh hry

## Ovládání

- stačí použít šipky a mezerník
- k dokončení hry je potřeba získat 2 klíče, které hráč může dostat od dvou ze tří NPCček, výměnou za sesbírané předměty
- hráč si může vybrat 3 herní módy, z nichž každý se mírně liší vedením dialogů a také výběrem NPCček, které hráči nakonec klíč skutečně předají

## Použité ingredience
- **Sen** - Ve hře existují dva módy - denní a noční, kde denní svět
  reprezentuje realitu a noční svět sen. Zatímco v realite panuje řád, sen je
  ovládán spíše chaosem.
- **Smrtí to nekončí** - Hra je nekonečná smyčka reinkarnace. Začíná přímo
  smrtí, kdy se zároveň hráč rodí rovnou do nového života.
- **Čas** - Každý den má přesně dané trvání.
- **Karty** - Na začátku hry si hráč vybere jednu ze tří karet postav. Poté
  pokračuje ke kartářce, která mu vyloží karty s dodatečnými vlastnostmi.
- **Černá/bílá** - Noční snový svět je černobílý.
