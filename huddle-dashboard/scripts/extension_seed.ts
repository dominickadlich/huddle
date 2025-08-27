import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' })

import { createClient } from '@supabase/supabase-js';
import { LoremIpsum } from 'lorem-ipsum';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
)


const generateExtensionData = async (extensions = 10) =>  {
    const data = []

    for (let i = 0; i < extensions; i++) {
        data.push({
            date: new Date(Date.now()), // Date is today's date
            name: new LoremIpsum().generateWords(1), // Generate a one word name
            extension: Math.floor(Math.random() * 1000) + 800 // 800 - 1799
        });
    }

    const { data: result, error } = await supabase
    .from('central_directory')
    .insert(data)

    if (error) console.error('Error:', error)
    else console.log('Extnsions Seeded', result)
}

generateExtensionData();