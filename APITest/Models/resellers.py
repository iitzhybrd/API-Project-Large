from sqlalchemy import Column, Integer, String, Date, Float
from sqlalchemy.orm import relationship
from Config.database import Base
from sqlalchemy.sql import func

class Reseller(Base):
    __tablename__ = "Resellers"

    id = Column(Integer, primary_key=True, index=True)
    Name = Column(String, nullable=False)
    Username = Column(String, nullable=False)
    Last_active = Column(Date, default=func.now())
    Email = Column(String, nullable=False)

    stock = relationship("Stock", back_populates="reseller")
    reseller_orders = relationship("ResellerOrders", back_populates="reseller")
    billing_address = relationship("BillingAddress", back_populates="reseller")
    shipping_address = relationship("ShippingAddress", back_populates="reseller")
    clients = relationship("Clients", back_populates="reseller")
