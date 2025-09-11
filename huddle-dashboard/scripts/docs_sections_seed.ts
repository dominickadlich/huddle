import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
)


const generateDocsData = async ( sections = 5) => {
    const data = [
        {title: 'Getting Started', description: 'Everything you need to know to get started', icon: '🚀', category: 'Onboarding', slug: 'getting-started', content: '...'},
        {title: 'Benefits Package', description: 'Health, dental, 401k, and more', icon: '💼', category: 'HR', slug: 'benefits', content: '...'},
        {title: 'IT & Security', description: 'Password policies, VPN setup, security guidelines', icon: '🔒', category: 'Security', slug: 'security', content: '...'},
        {title: 'IV Room', description: 'Sterile compounding, Exactamix, TPNs', icon: '💉', category: 'IV Room', slug: 'iv-room', content: '...'},
        {title: 'Command Center', description: 'Non-sterile compounding, Narcs, Oral syringes', icon: '🪬', category: 'command-center', slug: 'command-center', content: '...'},
    ]

    const { data: result, error } = await supabase
    .from('sections')
    .insert(data)

    if (error) console.error('Error:', error)
        else console.log('Sections Seeded', result)
}

generateDocsData()