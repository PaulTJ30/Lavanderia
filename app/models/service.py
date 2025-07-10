from app.database.db import db



class Service(db.Model):
    tablename = "services"
    id = db. Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column (db.String(200))
    price = db. Column (db.Float,nullable=False)
    garment_link = db.relationship("OrderDetail", backref="service", lazy=True)