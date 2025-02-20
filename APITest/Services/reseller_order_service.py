from Config.database import SessionLocal
from Models.reseller_order import ResellerOrders

def get_reseller_orders():
    session = SessionLocal()
    reseller_orders = session.query(ResellerOrders).all()
    session.close()
    return reseller_orders

def get_reseller_order_by_id(reseller_order_id):
    session = SessionLocal()
    reseller_order = session.query(ResellerOrders).filter(ResellerOrders.id == reseller_order_id).first()
    session.close()
    return reseller_order

def create_reseller_order(data):
    reseller_order = ResellerOrders(**data)
    session = SessionLocal()
    session.add(reseller_order)
    session.commit()
    session.close()
    return reseller_order

def update_reseller_order(reseller_order_id, data):
    session = SessionLocal()
    reseller_order = session.query(ResellerOrders).filter(ResellerOrders.id == reseller_order_id).first()
    if reseller_order:
        for key, value in data.items():
            setattr(reseller_order, key, value)
        session.commit()
        session.close()
        return reseller_order
    return None

def delete_reseller_order(reseller_order_id):
    session = SessionLocal()
    reseller_order = session.query(ResellerOrders).filter(ResellerOrders.id == reseller_order_id).first()
    if reseller_order:
        session.delete(reseller_order)
        session.commit()
        session.close()
        return True
    return False
