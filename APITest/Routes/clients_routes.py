# clients_routes.py
from quart import Blueprint, request, jsonify
from Services.clients_service import get_clients, get_client_by_id, create_client, update_client, delete_client
from mutex import crud_mutex

clients_bp = Blueprint("clients", __name__)

@clients_bp.route('/clients', methods=['GET'])
async def get_clients_route():
    # Acquire the mutex lock
    with crud_mutex:
        clients = get_clients()
        client_list = [client.__dict__ for client in clients]
        for client in client_list:
            client.pop('_sa_instance_state', None)
        return jsonify(client_list)

@clients_bp.route('/clients/<int:client_id>', methods=['GET'])
async def get_single_client_route(client_id):
    # Acquire the mutex lock
    with crud_mutex:
        client = get_client_by_id(client_id)
        if client:
            response_data = {
                "id": client.id,
                "Resellers_id": client.resellers_id,
                "Name": client.Name,
                "Date_registered": client.Date_registered.strftime('%Y-%m-%d'),
                "Total_spent": client.Total_spent
            }
            return jsonify(response_data)
        else:
            return "Client not found", 404

@clients_bp.route('/clients', methods=['POST'])
async def create_client_route():
    data = await request.get_json()
    try:
        # Acquire the mutex lock
        with crud_mutex:
            client = create_client(data)
        return {"Success": True, "message": "Client created"}, 201
    except Exception as e:
        return {"error": "Could not be inserted into the database"}, 500

@clients_bp.route('/clients/<int:client_id>', methods=['PUT'])
async def update_single_client_route(client_id):
    data = await request.get_json()
    # Acquire the mutex lock
    with crud_mutex:
        client = update_client(client_id, data)
        if client:
            return "Client updated", 200
        else:
            return "Client not found", 404

@clients_bp.route('/clients/<int:client_id>', methods=['DELETE'])
async def delete_single_client_route(client_id):
    # Acquire the mutex lock
    with crud_mutex:
        success = delete_client(client_id)
        if success:
            return "Client deleted", 200
        else:
            return "Client not found", 404
