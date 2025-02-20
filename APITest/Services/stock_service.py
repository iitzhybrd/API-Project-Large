from Config.database import SessionLocal
from Models.stock import Stock

def get_stock():
    session = SessionLocal()
    stock_items = session.query(Stock).all()
    session.close()
    return stock_items

def get_stock_item(item_id):
    session = SessionLocal()
    item = session.query(Stock).filter(Stock.id == item_id).first()
    session.close()
    return item

def create_stock_item(data):
    stock_item = Stock(**data)
    session = SessionLocal()
    session.add(stock_item)
    session.commit()
    session.close()
    return stock_item

def update_stock_item(item_id, data):
    session = SessionLocal()
    item = session.query(Stock).filter(Stock.id == item_id).first()
    if item:
        for key, value in data.items():
            setattr(item, key, value)
        session.commit()
        session.close()
        return item
    return None

def delete_stock_item(item_id):
    session = SessionLocal()
    item = session.query(Stock).filter(Stock.id == item_id).first()
    if item:
        session.delete(item)
        session.commit()
        session.close()
        return True
    return False
