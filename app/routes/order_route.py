from flask import jsonify, request, Blueprint
from app.controllers.order_controller import create_order, add_garment_to_order, create_order_detail, add_service, get_order_detail
import datetime
order_bp = Blueprint("order_bp", __name__, url_prefix="/orders")

@order_bp.route("/create", methods=["POST"])
def create():
    data = request.json
    splited_date = data["estimated_delivery_date"].split("-")
    date = datetime.date(int(splited_date[0]), int(splited_date[1]), int(splited_date[2]))
    order = create_order(
        client_id=data["client_id"],
        user_id=data["user_id"],
        estimated_date=date,
        total_price=data["total_price"]
    )
    for garment in data["garments"]:
        new_garment = add_garment_to_order(
            order_id=order.id,
            type=garment["type"],
            discription=garment["description"],
            notes=garment["observations"]
        )
        for service in garment["services"]:
            new_service= add_service(service["name"], description="Descripcion Momentanea", price=service["unitPrice"])
            subtotal = service["unitPrice"] * service["quantity"]
            create_order_detail(garment_id=new_garment.id, service_id=new_service.id, quantity=service["quantity"])
    return jsonify({"msg":"Orden Creada con EXITO MAY"}), 200



@order_bp.route("/get-order-detail/<int:order_id>", methods=["GET"])
def get_order_detail_endpoint(order_id):
    try:
        order = get_order_detail(order_id)
        return jsonify({"msg":"detalle de order obtenido","order":order})
    except Exception as e:
        return jsonify({"msg":"Ocurrio un fallo may aguanta","error":e}), 500
    