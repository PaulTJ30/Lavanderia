from app.database.db import db

class OrderDetail(db.Model):
    __tablename__ = "order_detail"

    id = db.Column(db.Interger, primary_key=True)
    garment_id = db.Column(db.Interger, db.ForeignKey('garments.id'), nullable=False)
    service_id = db.Column(db.Interger, db.ForeignKey('services.id'), nullable=False)
    quantity = db.Column(db.Interger, nullable = False)
    
    