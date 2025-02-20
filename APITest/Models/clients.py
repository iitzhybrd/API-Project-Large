from sqlalchemy import Column, Integer, String, Date, Float, ForeignKey
from sqlalchemy.orm import relationship
from Config.database import Base
from sqlalchemy.sql import func

class Clients(Base):
    __tablename__ = "clients"

    id = Column(Integer, primary_key=True)
    resellers_id = Column(Integer, ForeignKey("Resellers.id"), nullable=False)
    Name = Column(String, nullable=False)
    Date_registered = Column(Date, default=func.now())
    Total_spent = Column(Float, nullable=True)

    reseller = relationship("Reseller", back_populates="clients")
    orders = relationship("Orders", back_populates="clients")
    login_details = relationship("LoginDetails", back_populates="clients")
    clients_billing_address = relationship("ClientsBillingAddress", back_populates="clients")
    clients_shipping_address = relationship("ClientsShippingAddress", back_populates="clients")
