from flask import current_app as app
import os
import json
from api.models import Product


@app.cli.command("populate-products")
def populate_products():
    # load the json file
    with open(os.path.join(os.getcwd(), "src/api/initial_products.json")) as products_file:
        # read list of product dictionaries
        product_dictionaries = json.load(products_file)
    total = 0
    # for each product, check if it already exists
    for product_dictionary in product_dictionaries:
        already_exists = Product.query.filter_by(
            name=product_dictionary["name"]).one_or_none()
        if already_exists:
            continue
        print(">>> ⚡ creating product:", product_dictionary["name"])
        # if it doesn't, create instance and
        new_product = Product(
            name=product_dictionary["name"],
            brand=product_dictionary["brand"],
            type=product_dictionary["type"],
            image_URL=product_dictionary["image_URL"],
            public_id=product_dictionary["public_id"],
        )
        # save to the database
        new_product.save(new=True)
        total += 1
    if total != 0:
        print(
            f">>> 😎 populate-products added {total} product{'' if total == 1 else 's'} to the database!")
    return
