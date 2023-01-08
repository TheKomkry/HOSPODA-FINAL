from docx import Document
from docx.document import Document as _Document
from docx.oxml.text.paragraph import CT_P
from docx.oxml.table import CT_Tbl
from docx.table import _Cell, Table
from docx.text.paragraph import Paragraph

import json
import datetime

def iter_block_items(parent):
    """
    Generate a reference to each paragraph and table child within *parent*,
    in document order. Each returned value is an instance of either Table or
    Paragraph. *parent* would most commonly be a reference to a main
    Document object, but also works for a _Cell object, which itself can
    contain paragraphs and tables.
    """
    if isinstance(parent, _Document):
        parent_elm = parent.element.body
    elif isinstance(parent, _Cell):
        parent_elm = parent._tc
    elif isinstance(parent, _Row):
        parent_elm = parent._tr
    else:
        raise ValueError("something's not right")
    for child in parent_elm.iterchildren():
        if isinstance(child, CT_P):
            yield Paragraph(child, parent)
        elif isinstance(child, CT_Tbl):
            yield Table(child, parent)

document = Document('menu.docx')

menu = {
    "zacatekTydne": {
        # "den": 1,
        # "mesic": 1,
        # "rok": 2023
    },
    "Pondeli": {
        "jidla": [
            # {
            #     "nazev": "Polévka - *nazev polevky*"
            # },
            # {
            #     "nazev": "*nazev jidla*",
            #     "popis": "*popis / příloha*",
            #     "cena": 0.00001
            # }
        ]
    },
    "Utery": {
        "jidla": [
            
        ]
    },
    "Streda": {
        "jidla": [
            
        ]
    },
    "Ctvrtek": {
        "jidla": [
            
        ]
    },
    "Patek": {
        "jidla": [
            
        ]
    }
}

textBeforeTable = []
tables = []
dnyNoSpecial = {"Pondělí": "Pondeli", "Úterý": "Utery", "Středa": "Streda", "Čtvrtek": "Ctvrtek", "Pátek": "Patek",}
for block in iter_block_items(document):
    #print(block.text if isinstance(block, Paragraph) else '<table>')
    if isinstance(block, Paragraph):
        # dny = ["Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota", "Neděle"]
        if any(x in (block.text) for x in dnyNoSpecial.keys()):
            paragraphText = block.text[block.text.index("Polévka")::].replace("–", "-")
            polevka = paragraphText[paragraphText.index("- ")+2::]
            menu[dnyNoSpecial[block.text.rsplit()[0]]]["jidla"].append({"nazev": "Polévka - " + polevka})
        elif "Jídelní" in block.text:
            datum = block.text.replace("–", "-").split("-")[0]
            datum = datum[datum.index("Jídelní lístek ")+len("Jídelní lístek ")::]
            menu["zacatekTydne"]["den"] = int(datum.split(".")[0])
            menu["zacatekTydne"]["mesic"] = int(datum.split(".")[1])
            menu["zacatekTydne"]["rok"] = datetime.datetime.now().year  #  current date
    elif isinstance(block, Table):
        table = []
        for row in block.rows:
            row_data = []
            for cell in row.cells:
                for paragraph in cell.paragraphs:
                    row_data.append(paragraph.text)
            # print("\t".join(row_data))
            table.append(row_data)
        tables.append(table)
            
denNum = 0
menuList = []
for table in tables:
    print(64*"-")
    jidla = []
    denNum += 1
    for row in table:
        try:
            nazev, popis = row[0].split(",", 1)[0], row[0][row[0].index(", ")+1::]
        except ValueError:
            nazev, popis = row[0], ""
        cena = int(row[1].split(",")[0])
        print(f"nazev: {nazev}\npopis: {popis}\ncena: {cena}")
        print(10*"*")
        jidla.append({"nazev": nazev, "popis": popis, "cena": cena})
    menuList.append(jidla)
for den, jidla in zip(list(dnyNoSpecial.values()), menuList):
    for jidlo in jidla:
        menu[den]["jidla"].append(jidlo)
print(menu)
print(json.dumps(menu, indent=4, ensure_ascii=False))
# create a new file and write the JSON data to it
with open('menu.json', 'w', encoding='utf-8') as f:
    json.dump(menu, f, indent=4, ensure_ascii=False)

    
