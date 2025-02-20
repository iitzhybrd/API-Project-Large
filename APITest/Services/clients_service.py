# clients_service.py
from Config.database import SessionLocal
from Models.clients import Clients

def get_clients():
    session = SessionLocal()
    clients = session.query(Clients).all()
    session.close()
    return clients

def get_client_by_id(client_id):
    session = SessionLocal()
    client = session.query(Clients).filter(Clients.id == client_id).first()
    session.close()
    return client

def create_client(data):
    client = Clients(**data)
    session = SessionLocal()
    session.add(client)
    session.commit()
    session.close()
    return client

def update_client(client_id, data):
    session = SessionLocal()
    client = session.query(Clients).filter(Clients.id == client_id).first()
    if client:
        for key, value in data.items():
            setattr(client, key, value)
        session.commit()
        session.close()
        return client
    return None

def delete_client(client_id):
    session = SessionLocal()
    client = session.query(Clients).filter(Clients.id == client_id).first()
    if client:
        session.delete(client)
        session.commit()
        session.close()
        return True
    return False
