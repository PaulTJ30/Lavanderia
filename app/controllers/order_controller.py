from app.database.db import db
from app.models.order import Order
from app.models.garment import Garment
from app.models.order_detail import OrderDetail
from app.models.service import Service




def create_order(client_id, user_id, estimated_date,total_price):
    order = Order(client_id=client_id, user_id=user_id, estimated_delivery_date=estimated_date, total=total_price)
    db.session.add(order)
    db.session.commit()
    return order





def add_service(name, description, price):
    Service= Service(name=name, description=description, price=price)
    db.session.add(Service)
    db.session.commit()
    return Service





def add_garment_to_order(order_id, type, description, notes):
    garment = Garment(order_id=order_id, type=type, description=description, observations=notes)
    db.session.add(garment)
    db.session.commit()
    return garment





def get_order_detail(order_id):
    order = Order.query.get(order_id)
    order_data ={
        "order_id": order_id,
        "client": order.clients.name,
        "status": order.state,
        "garments":[]
    }
    garments = Garment.query.filter_by(order_id=order_id)

    for garment in garments:
        garment.data = {
            "type": garment.type,
            "description": garment.description,
            "observations": garment.observations,
            "services":[]
        }
        for gs in garment.order_detail:
            Service = Service.query.get(id=gs.service_id)
            service_data = {
                "name": gs.name,
                "description": gs.discription,
                "price": gs.price
            }
            garment.data["services"].append(service_data)
        order_data["garments"].append(garment.data)
    return order_data

def create_order_detail(garment_id, service_id, quantity):
    order_detail = OrderDetail(garment_id=garment_id, service_id=service_id, quantity=quantity)
    db.session.add(order_detail)
    db.session.commit()
    return order_detail





def update_order_total(order_id, new_status):
    order = Order.query.get(order_id)
    if not order:
        return None
    order.state = new_status
    db.session.commit()
    return order

def list_orders_by_status(status):
    orders = Order.query.filter_by(state=status).all()
    data = [{
        "id": o.id,
        "client_id": o.client_id,
        "state": o.state,
        "estimated_delivery_date": o.estimated_delivery_date,
        "total": o.total,
        "pagago": o.pagado,
    } for o in orders]
    return data