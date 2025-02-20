# billing_address_service.py
from Config.database import SessionLocal
from Models.billing_address import BillingAddress

def get_billing_addresses():
    session = SessionLocal()
    addresses = session.query(BillingAddress).all()
    session.close()
    return addresses

def get_billing_address_by_id(address_id):
    session = SessionLocal()
    address = session.query(BillingAddress).filter(BillingAddress.id == address_id).first()
    session.close()
    return address

def create_billing_address(data):
    address = BillingAddress(**data)
    session = SessionLocal()
    session.add(address)
    session.commit()
    session.close()
    return address

def update_billing_address(address_id, data):
    session = SessionLocal()
    address = session.query(BillingAddress).filter(BillingAddress.id == address_id).first()
    if address:
        for key, value in data.items():
            setattr(address, key, value)
        session.commit()
        session.close()
        return address
    return None

def delete_billing_address(address_id):
    session = SessionLocal()
    address = session.query(BillingAddress).filter(BillingAddress.id == address_id).first()
    if address:
        session.delete(address)
        session.commit()
        session.close()
        return True
    return False
