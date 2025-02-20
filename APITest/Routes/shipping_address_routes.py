from quart import Blueprint, request, jsonify
from Services.shipping_address_service import get_shipping_addresses, get_shipping_address_by_id, create_shipping_address, update_shipping_address, delete_shipping_address
from mutex import crud_mutex

shipping_address_bp = Blueprint("shipping_address", __name__)

@shipping_address_bp.route('/shipping_address', methods=['GET'])
async def get_shipping_addresses_route():
    # Acquire the mutex lock
    with crud_mutex:
        shipping_addresses = get_shipping_addresses()
        shipping_address_list = [address.__dict__ for address in shipping_addresses]
        for address in shipping_address_list:
            address.pop('_sa_instance_state', None)
        return jsonify(shipping_address_list)

@shipping_address_bp.route('/shipping_addresses/<int:address_id>', methods=['GET'])
async def get_single_shipping_address_route(address_id):
    # Acquire the mutex lock
    with crud_mutex:
        shipping_address = get_shipping_address_by_id(address_id)
        if shipping_address:
            response_data = {
                "id": shipping_address.id,
                "resellers_id": shipping_address.resellers_id,
                "Name": shipping_address.Name,
                "Phone": shipping_address.Phone,
                "Company": shipping_address.Company,
                "Street_address": shipping_address.Street_address,
                "Country": shipping_address.Country,
                "City": shipping_address.City,
                "Postal_code": shipping_address.Postal_code
            }
            return jsonify(response_data)
        else:
            return "Shipping address not found", 404

@shipping_address_bp.route('/shipping_address', methods=['POST'])
async def create_shipping_address_route():
    data = await request.get_json()
    try:
        # Acquire the mutex lock
        with crud_mutex:
            shipping_address = create_shipping_address(data)
        return {"Success": True, "message": "Shipping address created"}, 201
    except Exception as e:
        return {"error": "Could not be inserted into the database"}, 500

@shipping_address_bp.route('/shipping_addresses/<int:address_id>', methods=['PUT'])
async def update_single_shipping_address_route(address_id):
    data = await request.get_json()
    # Acquire the mutex lock
    with crud_mutex:
        shipping_address = update_shipping_address(address_id, data)
        if shipping_address:
            return "Shipping address updated", 200
        else:
            return "Shipping address not found", 404

@shipping_address_bp.route('/shipping_addresses/<int:address_id>', methods=['DELETE'])
async def delete_single_shipping_address_route(address_id):
    # Acquire the mutex lock
    with crud_mutex:
        success = delete_shipping_address(address_id)
        if success:
            return "Shipping address deleted", 200
        else:
            return "Shipping address not found", 404
