from sqlalchemy import Column, Integer, String, Date, Float, ForeignKey
from sqlalchemy.orm import relationship
from Config.database import Base
from sqlalchemy.sql import func

class LoginDetails(Base):
    __tablename__ = "login_details"

    id = Column(Integer, primary_key=True)
    clients_id = Column(Integer, ForeignKey("clients.id"), nullable=False)
    Username = Column(String, nullable=False)
    Email_address = Column(String, nullable=False)
    Password = Column(String, nullable=False)

    clients = relationship("Clients", back_populates="login_details", uselist=False)
