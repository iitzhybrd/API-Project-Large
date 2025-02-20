# clients_billing_address_routes.py
from quart import Blueprint, request, jsonify
from Services.clients_billing_address_service import get_clients_billing_addresses, get_clients_billing_address_by_id, create_clients_billing_address, update_clients_billing_address, delete_clients_billing_address
from mutex import crud_mutex

clients_billing_address_bp = Blueprint("clients_billing_address", __name__)

@clients_billing_address_bp.route('/clients_billing_address', methods=['GET'])
async def get_clients_billing_addresses_route():
    # Acquire the mutex lock
    with crud_mutex:
        addresses = get_clients_billing_addresses()
        address_list = [address.__dict__ for address in addresses]
        for address in address_list:
            address.pop('_sa_instance_state', None)
        return jsonify(address_list)

@clients_billing_address_bp.route('/clients_billing_address/<int:address_id>', methods=['GET'])
async def get_single_clients_billing_address_route(address_id):
    # Acquire the mutex lock
    with crud_mutex:
        address = get_clients_billing_address_by_id(address_id)
        if address:
            response_data = {
                "id": address.id,
                "clients_id": address.clients_id,
                "Name": address.Name,
                "Phone": address.Phone,
                "Company": address.Company,
                "Street_address": address.Street_address,
                "Country": address.Country,
                "City": address.City,
                "Postal_code": address.Postal_code
            }
            return jsonify(response_data)
        else:
            return "Client billing address not found", 404

@clients_billing_address_bp.route('/clients_billing_address', methods=['POST'])
async def create_clients_billing_address_route():
    data = await request.get_json()
    try:
        # Acquire the mutex lock
        with crud_mutex:
            address = create_clients_billing_address(data)
        return {"Success": True, "message": "Client billing address created"}, 201
    except Exception as e:
        return {"error": "Could not be inserted into the database"}, 500

@clients_billing_address_bp.route('/clients_billing_address/<int:address_id>', methods=['PUT'])
async def update_single_clients_billing_address_route(address_id):
    data = await request.get_json()
    # Acquire the mutex lock
    with crud_mutex:
        address = update_clients_billing_address(address_id, data)
        if address:
            return "Client billing address updated", 200
        else:
            return "Client billing address not found", 404

@clients_billing_address_bp.route('/clients_billing_address/<int:address_id>', methods=['DELETE'])
async def delete_single_clients_billing_address_route(address_id):
    # Acquire the mutex lock
    with crud_mutex:
        success = delete_clients_billing_address(address_id)
        if success:
            return "Client billing address deleted", 200
        else:
            return "Client billing address not found", 404
