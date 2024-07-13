import { sql } from '@vercel/postgres';
import { Record } from './definitions';
import { run_MEC_API } from "@/app/lib/MEC-agolia-api-ops";
// insert into table 
// rows price, date, id, shoe name, size
// skwarma men and skwarma women are two different shoes 
// skwarma vegan and skwarma are two different shoes

// need a table to store shoe -> list of ids mapping
export async function record_price(record:Record) {
    try {
        await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        await sql`
            CREATE TABLE IF NOT EXISTS price_history (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            price DOUBLE NOT NULL,
            created_at TIMESTAMP DEFALT CURRENT_TIMESTAMP
            );
        `;
        // insert the record 
        const inserted = await sql`
            INSERT INTO price_history (name, price)
                VALUES (${record.name}, ${record.price}) 
                ON CONFLICT (id) DO NOTHING;
        `;

        return inserted;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to insert price record for ' + record.name + '.');
    }
}

// call the agolia API to fetch data 

export async function get_price_history(name: string) {
    try {
        const price_array = await sql<Record>`
        SELECT * FROM price_history WHERE name = ${name}
        `;
        return price_array.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the price history for ' + name + '.');
    }
}