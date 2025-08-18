import dotenv from 'dotenv';
dotenv.config({ path: ".env.local" })

import { createClient } from "@supabase/supabase-js";
import { LoremIpsum } from "lorem-ipsum";

console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY)

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 4,
        min: 2
    },
    wordsPerSentence: {
        max: 10,
        min: 5
    }
});

const opportunityTypes = [
    "Workflow improvement",
    "Staff development", 
    "Technology upgrade",
    "Process optimization",
    "Safety enhancement"
];

const users = [
    {
        id: '410544b2-4001-4271-9855-fec4b6a6442a',
        name: 'User',
        email: 'user@nextmail.com',
        password: '123456',
    },
];

const generateHuddleData = async (days = 7) => {
    const data = [];
    for (let i = 0; i < days; i++) {
        data.push({
            date: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString(), // Past 7 days 
            census: Math.floor(Math.random() * 1000) + 800, // 800-999 patients
            tpn_count: Math.floor(Math.random() * 20) + 15, // 15-34 tpns
            haz_count: Math.floor(Math.random() * 15) + 8, // 8-23 haz compounds
            non_sterile_count: Math.floor(Math.random() * 5) + 3, // 3-7 non-sterile compounds
            opportunities: [{ 
                title: opportunityTypes[Math.floor(Math.random() * opportunityTypes.length)], 
                body: lorem.generateSentences(2),
                date: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString(),
                priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)]
            }]
        });
    }
    
    const { data: result, error } = await supabase
    .from('huddle_data')
    .insert(data)


    if (error) console.error('Error', error)
    else console.log('Seeded:', result)

    const { data: userResult, error: userError } = await supabase
    .from('users')
    .insert(users)

    if (userError) console.log('User Error:', userError)
    else console.log('Users seeded:', userResult)
}

generateHuddleData();