from Config.database import SessionLocal
from Models.orders import Orders

def get_orders():
    session = SessionLocal()
    orders = session.query(Orders).all()
    session.close()
    return orders

def get_order_by_id(order_id):
    session = SessionLocal()
    order = session.query(Orders).filter(Orders.id == order_id).first()
    session.close()
    return order

def create_order(data):
    order = Orders(**data)
    session = SessionLocal()
    session.add(order)
    session.commit()
    session.close()
    return order

def update_order(order_id, data):
    session = SessionLocal()
    order = session.query(Orders).filter(Orders.id == order_id).first()
    if order:
        for key, value in data.items():
            setattr(order, key, value)
        session.commit()
        session.close()
        return order
    return None

def delete_order(order_id):
    session = SessionLocal()
    order = session.query(Orders).filter(Orders.id == order_id).first()
    if order:
        session.delete(order)
        session.commit()
        session.close()
        return True
    return False
