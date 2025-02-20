from quart import Quart, render_template
from quart_cors import cors

from Routes.resellers_routes import resellers_bp
from Routes.stock_routes import stock_bp
from Routes.reseller_order_routes import reseller_orders_bp
from Routes.billing_address_routes import billing_address_bp
from Routes.shipping_address_routes import shipping_address_bp
from Routes.clients_routes import clients_bp
from Routes.orders_routes import orders_bp
from Routes.login_details_routes import login_details_bp
from Routes.clients_billiing_address_routes import clients_billing_address_bp
from Routes.clients_shipping_address_routes import clients_shipping_address_bp

app = Quart(__name__)

@app.after_request
async def after_request(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return response

@app.route('/')
async def index():
    return await render_template('datatables.html')

# Register all the blueprints for your tables
app.register_blueprint(resellers_bp)
app.register_blueprint(stock_bp)
app.register_blueprint(reseller_orders_bp)
app.register_blueprint(billing_address_bp)
app.register_blueprint(shipping_address_bp)
app.register_blueprint(clients_bp)
app.register_blueprint(orders_bp)
app.register_blueprint(login_details_bp)
app.register_blueprint(clients_billing_address_bp)
app.register_blueprint(clients_shipping_address_bp)

if __name__ == '__main__':
    app.run(debug=True)
