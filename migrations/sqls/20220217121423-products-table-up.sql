/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS "products" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "price" INTEGER,
    "category_id" INTEGER,
    FOREIGN KEY ("category_id") REFERENCES "categories"("id")
);