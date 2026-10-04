# Denní menu – `Menu.json`

Soubor `Menu.json` plní podstránku **/menu**. Každý týden se v něm přepíše datum a jídla.

## Struktura

```json
{
  "zacatekTydne": { "den": 28, "mesic": 9, "rok": 2026 },
  "Pondeli": {
    "jidla": [
      { "nazev": "Polévka - gulášová s bramborem" },
      { "nazev": "Kuřecí steak", "popis": " pečené bramborové plátky", "cena": 195 }
    ]
  },
  "Utery":   { "jidla": [ ... ] },
  "Streda":  { "jidla": [ ... ] },
  "Ctvrtek": { "jidla": [ ... ] },
  "Patek":   { "jidla": [ ... ] }
}
```

- `zacatekTydne` – datum pondělí daného týdne, data dalších dnů se dopočítají sama.
- `nazev` – název jídla (povinné).
- `popis` – příloha / doplnění (nepovinné), zobrazí se před cenou.
- `cena` – cena v Kč. Když chybí nebo je `0`, zobrazí se „v ceně menu“ (typicky polévka).

## Den bez jídel

Když má den prázdný seznam jídel (`"jidla": []`), na webu se zobrazí:

> Na tento den nejsou žádná jídla, pro více informací klikněte zde INFO & AKCE

Pokud chceš místo toho vlastní text (svátek, zavřeno, vaří se jen z lístku…), přidej k danému dni pole `poznamka`:

```json
"Pondeli": {
  "jidla": [],
  "poznamka": "Tento den není polední menu, ale normálně se vaří – vybrat si můžete z našeho <a href='/nabidka'>JÍDELNÍHO LÍSTKU</a>."
},
```

- Poznámka se zobrazí **jen když je seznam jídel prázdný**.
- Můžeš v ní použít HTML, např. odkaz `<a href='/info'>INFO & AKCE</a>` (uvnitř textu používej jednoduché uvozovky `'`).
- Poznámka platí, dokud je v souboru. Při zápisu dalšího týdne ji **smaž**, jinak zůstane (u dne, který bude zase prázdný).
- Pozor na čárky: mezi `"jidla": []` a `"poznamka"` čárka být musí, za poslední položkou být nesmí – jinak se menu nenačte.

## Automatická šablona v sobotu

Každou sobotu ráno (cca 4:30–6:30) GitHub Action `.github/workflows/menu-template.yml` přepíše `Menu.json` šablonou s textem „menu se připravuje“ a doplní datum příštího pondělí.

- Pokud už je v `Menu.json` menu na příští týden (pondělí příštího týdne), automatika nic nepřepíše.
- Text šablony se upravuje přímo v tom workflow (`MENU_TEMPLATE`).
- Dá se spustit i ručně (Actions → Šablona týdenního menu → Run workflow): po–čt doplní pondělí tohoto týdne, pá–ne pondělí příštího týdne. Ruční spuštění přepíše menu **vždy**, i když už je nahrané.
