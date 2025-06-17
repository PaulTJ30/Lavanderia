from app.models.order import Order
from app.database.db import db
from app.models.garment import Garment
from app.models.order_detail import OrderDetail
from app.models.service import Service

def create_order(client_id, user_id, estimated_date, total_price):
    order = Order(client_id= client_id, user_id= user_id, estimated_delivery_date=estimated_date, total= total_price)
    db.session.add(order)
    db.session.commit()
    return order

def add_garmen ( order_id, type, description, notes):
    garment = Garment(order_id = order_id, type= type,  description= description, observations=notes)
    db.session.add(garment)
    db.session.commit()
    return garment

def create_order_detal (garment_id, service_id, quantity):
    order_detail = OrderDetail(garment_id=garment_id, service_id= service_id, quantity= quantity)
    