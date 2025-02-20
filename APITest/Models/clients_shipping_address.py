from sqlalchemy import Column, Integer, String, Date, Float, ForeignKey
from sqlalchemy.orm import relationship
from Config.database import Base
from sqlalchemy.sql import func

class ClientsShippingAddress(Base):
    __tablename__ = "clients_shipping_address"

    id = Column(Integer, primary_key=True)
    clients_id = Column(Integer, ForeignKey("clients.id"), nullable=False)
    Name = Column(String, nullable=False)
    Phone = Column(Integer, nullable=False)
    Company = Column(String, nullable=True)
    Street_address = Column(String, nullable=False)
    Country = Column(String, nullable=False)
    City = Column(String, nullable=False)
    Postal_code = Column(Integer, nullable=False)

    clients = relationship("Clients", back_populates="clients_shipping_address", uselist=False)
