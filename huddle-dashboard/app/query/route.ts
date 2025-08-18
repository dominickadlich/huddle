import postgres from 'postgres'

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listCensus() {
    const data = await sql`
        SELECT census
        FROM huddle_data
        WHERE date = '2025-08-17 03:10:36.498+00'
    `;

    return data;
}

export async function GET() {
  try {
  	return Response.json(await listCensus());
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}