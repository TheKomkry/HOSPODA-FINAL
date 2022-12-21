import json

def parse_menu(menu_string):
    menu = {}

    # Split the menu string into lines
    lines = menu_string.strip().split("\n")

    # Keep track of the current day and the current list of dishes
    current_day = None
    current_dishes = []

    # Iterate through the lines
    for line in lines:
        # If the line starts with a day of the week, then it's the start of a new section
        if line.endswith(":"):
            # If we already have a current day, then we need to add the current dishes to the menu
            if current_day is not None:
                menu[current_day] = {
                    "datum": "19.12.2022",
                    "jidla": current_dishes
                }

            # Set the current day and reset the list of dishes
            current_day = line[:-1]
            current_dishes = []
        else:
            # Split the line into fields
            fields = line.split(" - ")
            dish_name = fields[0]

            # If there are additional fields, then the dish has a description and/or price
            if len(fields) > 1:
                dish_description = fields[1]
                dish_price = None

                # Check if the description contains a price
                price_index = dish_description.find("(")
                if price_index != -1:
                    dish_price = int(dish_description[price_index+1:-1])
                    dish_description = dish_description[:price_index].strip()

            # Create a dictionary for the dish and add it to the list of dishes
            dish = {"nazev": dish_name}
            if dish_description:
                dish["popis"] = dish_description
            if dish_price:
                dish["cena"] = dish_price
            current_dishes.append(dish)

    # Add the final day and dishes to the menu
    menu[current_day] = {
        "datum": "19.12.2022",
        "jidla": current_dishes
    }

    return menu

# Test the function with a sample menu
sample_menu = """
Pondeli:
Polévka - zeleninová s nudlem
Fazole po mexicku s klobásou (140 Kč)
Masová směs se zeleninou (140 Kč) - dušená rýže
Smažený hermelín s poličanem (145 Kč) - steakové hranolky, domácí tatarka

Úterý:
Hovězí guláš s knedlíkem (135 Kč)
Kuřecí řízek s bramborovým salátem (135 Kč)
Rizoto s kuřecím masem a brokolicí (140 Kč) - dušená rýže
Těstoviny Carbonara (135 Kč
"""
menu = parse_menu(sample_menu)
print(json.dumps(menu, indent=4))
