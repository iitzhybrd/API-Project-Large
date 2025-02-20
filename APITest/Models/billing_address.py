from sqlalchemy import Column, Integer, String, Date, Float, ForeignKey
from sqlalchemy.orm import relationship
from Config.database import Base
from sqlalchemy.sql import func

class BillingAddress(Base):
    __tablename__ = "billing_address"

    id = Column(Integer, primary_key=True)
    resellers_id = Column(Integer, ForeignKey("Resellers.id"), nullable=False)
    Name = Column(String, nullable=False)
    Phone = Column(Integer, nullable=False)
    Company = Column(String, nullable=True)
    Street_address = Column(String, nullable=False)
    Country = Column(String, nullable=False)
    City = Column(String, nullable=False)
    Postal_code = Column(Integer, nullable=False)

    reseller = relationship("Reseller", back_populates="billing_address", uselist=False)
