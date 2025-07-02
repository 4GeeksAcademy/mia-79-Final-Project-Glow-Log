from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    purchase_details: Mapped[list["PurchaseDetails"]] = relationship("PurchaseDetails", backref="user")
    
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "purchase_details": [purchase.serialize() for purchase in self.purchase_details]
            # do not serialize the password, its a security breach
        }
    
class Product(db.Model):
    id: Mapped[int] = mapped_column(autoincrement=True, primary_key=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    model: Mapped[str] = mapped_column(String(120), nullable=False)
    listed_price: Mapped[float] = mapped_column(db.Numeric(precision=10,scale=2))
    store: Mapped[str]=mapped_column(String(120))
    purchase_details: Mapped[list["PurchaseDetails"]] = relationship("PurchaseDetails", backref="product")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "model": self.model, 
            "listed_price": self.listed_price,
            "store": self.store, 
        }

class PurchaseDetails(db.Model):
    id: Mapped[int] = mapped_column(autoincrement=True, primary_key=True)
    product_id: Mapped[int] = mapped_column(ForeignKey("product.id"))
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    purchase_date: Mapped[datetime] = mapped_column(db.DateTime(timezone=True))
    expiration_date: Mapped[datetime] = mapped_column(db.DateTime(timezone=True))
    price: Mapped[int] = mapped_column()
    store: Mapped[str] = mapped_column(String(120))

    def serialize(self): 
        return {
            "id": self.id,
            "product": self.product.serialize(),
            "purchase_date": self.purchase_date,
            "expiration_date": self.expiration_date,
            "price": self.price
        }