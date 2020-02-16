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

Hra bude dostupná v prohlížeči na adrese `localhost:1234`. Doporučený prohlížeč je Chrom (ve Firefoxu může text mírně překypovat přes frame).

## Použité technologie

- pouze grafická knihovna PixiJS a bundlovací nástroj ParcelBundler, bez použití dalších technologií či frameworků
- architektura aplikace ze začátku vzdáleně připomínala MVC, nicméně z důvodu časové tísně vzniklo cosi jako spaghetti-viewmodel s lasagne-controllerem
- časová náročnost: všichni zůstali vzhůru, tedy 24*5 hodin, z toho 2*5 hodin na brainstormingy

## Příběh hry

Otevřeš oči, ale stále vidíš tmu. Dozvíš se, že jsi v márnici a Tvůj život skončil, neb hrobař již chce odklidit Tvé ostatky.

Hráč si lízne jednu z karet, značící jakým archetypem bude v tomto životě načež se odvíjí jeho postup hrou. Cílem hry je staromódní honba za pokladam, ovšem nikdo Vám neřekne, co se skrývá uvnitř truhly ...

## Ovládání

- stačí použít šipky a mezerník
- k dokončení hry je potřeba získat 2 klíče, které hráč může dostat od dvou ze tří NPCček, výměnou za sesbírané předměty
- hráč si může vybrat 3 herní módy, z nichž každý se mírně liší vedením dialogů a také výběrem NPCček, které hráči nakonec klíč skutečně předají
- růžový rámeček značí řeč hlavní postavy, hovořící NPC má rámeček zelený

## Použité ingredience
- **Sen** - Ve hře existují dva módy - denní a noční, kde denní svět
  reprezentuje realitu a noční svět sen. Zatímco v realite panuje řád, sen je
  ovládán spíše chaosem.
- **Mechaniky** - Mechanikou hry je střídání noci a dne. V noci se objevují předměty, které mohou být zásadní pro postup. Tyto předěty se přes den neukážou. Další typickou vlastností pro noc je zrychlený pohyb, majíce evokovat snové létání.
- **Smrtí to nekončí** - Ingredience se objevuje poprvé na začátku hry jako slovní obrat "Smrtí to nekončí, smrtí to začíná" a podruhé v textu závěrečného pokladu ve smyslu "smrtí/koncem hry to nekončí, končí to promluvou k hráči - ikdyž děj hry samotné již skončil".
- **Čas** - Cykly noci a dne mají časový limit.
- **Karty** - Na začátku hry si hráč vybere jednu ze tří karet postav. Poté
  pokračuje ke kartářce, která mu vyloží karty s dodatečnými vlastnostmi.
- **Černá/bílá** - Noční snový svět je černobílý.