/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS "orders"(
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER,
    "order_status" status
);