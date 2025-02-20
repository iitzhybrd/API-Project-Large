# login_details_service.py
from Config.database import SessionLocal
from Models.login_details import LoginDetails

def get_login_details():
    session = SessionLocal()
    login_details = session.query(LoginDetails).all()
    session.close()
    return login_details

def get_login_details_by_id(login_details_id):
    session = SessionLocal()
    login_details = session.query(LoginDetails).filter(LoginDetails.id == login_details_id).first()
    session.close()
    return login_details

def create_login_details(data):
    login_details = LoginDetails(**data)
    session = SessionLocal()
    session.add(login_details)
    session.commit()
    session.close()
    return login_details

def update_login_details(login_details_id, data):
    session = SessionLocal()
    login_details = session.query(LoginDetails).filter(LoginDetails.id == login_details_id).first()
    if login_details:
        for key, value in data.items():
            setattr(login_details, key, value)
        session.commit()
        session.close()
        return login_details
    return None

def delete_login_details(login_details_id):
    session = SessionLocal()
    login_details = session.query(LoginDetails).filter(LoginDetails.id == login_details_id).first()
    if login_details:
        session.delete(login_details)
        session.commit()
        session.close()
        return True
    return False
