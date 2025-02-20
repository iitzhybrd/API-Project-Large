from Config.database import SessionLocal
from Models.resellers import Reseller

def get_resellers():
    session = SessionLocal()
    resellers = session.query(Reseller).all()
    session.close()
    return resellers

def get_reseller_by_id(reseller_id):
    session = SessionLocal()
    reseller = session.query(Reseller).filter(Reseller.id == reseller_id).first()
    session.close()
    return reseller

def create_reseller(data):
    reseller = Reseller(**data)
    session = SessionLocal()
    session.add(reseller)
    session.commit()
    session.close()
    return reseller

def update_reseller(reseller_id, data):
    session = SessionLocal()
    reseller = session.query(Reseller).filter(Reseller.id == reseller_id).first()
    if reseller:
        for key, value in data.items():
            setattr(reseller, key, value)
        session.commit()
        session.close()
        return reseller
    return None

def delete_reseller(reseller_id):
    session = SessionLocal()
    reseller = session.query(Reseller).filter(Reseller.id == reseller_id).first()
    if reseller:
        session.delete(reseller)
        session.commit()
        session.close()
        return True
    return False
