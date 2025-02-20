# clients_billing_address_service.py
from Config.database import SessionLocal
from Models.clients_billing_address import ClientsBillingAddress

def get_clients_billing_addresses():
    session = SessionLocal()
    addresses = session.query(ClientsBillingAddress).all()
    session.close()
    return addresses

def get_clients_billing_address_by_id(address_id):
    session = SessionLocal()
    address = session.query(ClientsBillingAddress).filter(ClientsBillingAddress.id == address_id).first()
    session.close()
    return address

def create_clients_billing_address(data):
    address = ClientsBillingAddress(**data)
    session = SessionLocal()
    session.add(address)
    session.commit()
    session.close()
    return address

def update_clients_billing_address(address_id, data):
    session = SessionLocal()
    address = session.query(ClientsBillingAddress).filter(ClientsBillingAddress.id == address_id).first()
    if address:
        for key, value in data.items():
            setattr(address, key, value)
        session.commit()
        session.close()
        return address
    return None

def delete_clients_billing_address(address_id):
    session = SessionLocal()
    address = session.query(ClientsBillingAddress).filter(ClientsBillingAddress.id == address_id).first()
    if address:
        session.delete(address)
        session.commit()
        session.close()
        return True
    return False
