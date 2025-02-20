from Config.database import SessionLocal
from Models.shipping_address import ShippingAddress

def get_shipping_addresses():
    session = SessionLocal()
    shipping_addresses = session.query(ShippingAddress).all()
    session.close()
    return shipping_addresses

def get_shipping_address_by_id(shipping_address_id):
    session = SessionLocal()
    shipping_address = session.query(ShippingAddress).filter(ShippingAddress.id == shipping_address_id).first()
    session.close()
    return shipping_address

def create_shipping_address(data):
    shipping_address = ShippingAddress(**data)
    session = SessionLocal()
    session.add(shipping_address)
    session.commit()
    session.close()
    return shipping_address

def update_shipping_address(shipping_address_id, data):
    session = SessionLocal()
    shipping_address = session.query(ShippingAddress).filter(ShippingAddress.id == shipping_address_id).first()
    if shipping_address:
        for key, value in data.items():
            setattr(shipping_address, key, value)
        session.commit()
        session.close()
        return shipping_address
    return None

def delete_shipping_address(shipping_address_id):
    session = SessionLocal()
    shipping_address = session.query(ShippingAddress).filter(ShippingAddress.id == shipping_address_id).first()
    if shipping_address:
        session.delete(shipping_address)
        session.commit()
        session.close()
        return True
    return False
